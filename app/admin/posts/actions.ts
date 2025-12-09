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
  body: z.string().trim().min(1, '正文必填'),
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

function buildExcerpt(body: string, limit = 120) {
  const plain = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/[#>*_~`]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.slice(0, limit) || '暂无摘要';
}

function slugifyTitle(title: string) {
  const base = title
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\p{Letter}\p{Number}-]+/gu, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  return base || 'post';
}

async function ensureUniqueSlug(title: string, excludeId?: string) {
  const base = slugifyTitle(title);
  let candidate = base;
  let suffix = 1;

  // 防止 slug 冲突：如果存在同名 slug，则自动追加序号
  // 最终移除表单中的 slug 字段与限制，使用标题自动生成
  for (;;) {
    const existing = await prisma.post.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });
    if (!existing) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
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
    body: formData.get('body'),
  });

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { status: 'error', message: issue?.message || '表单校验失败' };
  }

  const title = parsed.data.title.trim();
  const body = parsed.data.body.trim();
  const slug = await ensureUniqueSlug(title);
  const excerpt = buildExcerpt(body);
  const now = new Date();

  try {
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        body,
        excerpt,
        tags: [],
        featured: false,
        published: true,
        publishedAt: now,
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
    body: formData.get('body'),
  });

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { status: 'error', message: issue?.message || '表单校验失败' };
  }

  try {
    const existing = await prisma.post.findUnique({ where: { id }, select: { slug: true } });
    if (!existing) {
      return { status: 'error', message: '文章不存在' };
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title: parsed.data.title.trim(),
        body: parsed.data.body.trim(),
        excerpt: buildExcerpt(parsed.data.body),
      },
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
