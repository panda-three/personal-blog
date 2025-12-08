'use server';

import { getServerSession } from 'next-auth/next';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export type PostFormState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  postId?: string;
  slug?: string;
};

const postSchema = z.object({
  title: z.string().trim().min(1, '标题必填'),
  slug: z
    .string()
    .trim()
    .min(1, 'Slug 必填')
    .regex(/^[a-z0-9-]+$/i, '仅支持字母、数字和短横线')
    .transform((value) => value.toLowerCase()),
  excerpt: z.string().trim().min(1, '摘要必填'),
  body: z.string().trim().min(1, '正文必填'),
  tags: z.preprocess((value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value.filter(Boolean);
    return value
      .toString()
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }, z.array(z.string()).default([])),
  featured: z.preprocess((value) => value === 'on' || value === true, z.boolean()),
  published: z.preprocess((value) => value === 'on' || value === true, z.boolean()),
  publishedAt: z.preprocess((value) => {
    const fallback = new Date();
    if (!value) return fallback;
    const parsed = new Date(value.toString());
    return Number.isNaN(parsed.getTime()) ? fallback : parsed;
  }, z.date()),
});

async function requireSession() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  return session;
}

function revalidatePosts(slug?: string) {
  revalidatePath('/');
  revalidatePath('/blog');
  revalidatePath('/api/posts');
  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
}

export async function createPostAction(
  _prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const session = await requireSession();
  if (!session) {
    return { status: 'error', message: '请先登录' };
  }

  const parsed = postSchema.safeParse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    excerpt: formData.get('excerpt'),
    body: formData.get('body'),
    tags: formData.get('tags'),
    featured: formData.get('featured'),
    published: formData.get('published'),
    publishedAt: formData.get('publishedAt'),
  });

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { status: 'error', message: issue?.message || '表单校验失败' };
  }

  try {
    const post = await prisma.post.create({
      data: {
        ...parsed.data,
        authorId: session.user?.id,
      },
    });
    revalidatePosts(post.slug);
    return {
      status: 'success',
      message: '已保存',
      postId: post.id,
      slug: post.slug,
    };
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return { status: 'error', message: 'Slug 已存在' };
    }
    return { status: 'error', message: '保存失败，请稍后重试' };
  }
}

export async function updatePostAction(
  _prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const session = await requireSession();
  if (!session) {
    return { status: 'error', message: '请先登录' };
  }

  const id = formData.get('id')?.toString();
  if (!id) {
    return { status: 'error', message: '缺少 ID' };
  }

  const parsed = postSchema.safeParse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    excerpt: formData.get('excerpt'),
    body: formData.get('body'),
    tags: formData.get('tags'),
    featured: formData.get('featured'),
    published: formData.get('published'),
    publishedAt: formData.get('publishedAt'),
  });

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { status: 'error', message: issue?.message || '表单校验失败' };
  }

  try {
    const existing = await prisma.post.findUnique({ where: { id }, select: { slug: true } });
    const post = await prisma.post.update({
      where: { id },
      data: parsed.data,
    });
    if (existing?.slug && existing.slug !== post.slug) {
      revalidatePosts(existing.slug);
    }
    revalidatePosts(post.slug);
    return {
      status: 'success',
      message: '已保存',
      postId: post.id,
      slug: post.slug,
    };
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return { status: 'error', message: 'Slug 已存在' };
    }
    return { status: 'error', message: '更新失败，请稍后重试' };
  }
}

export async function deletePostAction(
  _prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const session = await requireSession();
  if (!session) {
    return { status: 'error', message: '请先登录' };
  }

  const id = formData.get('id')?.toString();
  if (!id) {
    return { status: 'error', message: '缺少 ID' };
  }

  const existing = await prisma.post.findUnique({ where: { id }, select: { slug: true } });
  if (!existing) {
    return { status: 'error', message: '文章不存在' };
  }

  await prisma.post.delete({ where: { id } });
  revalidatePosts(existing.slug);

  return { status: 'success', message: '已删除' };
}
