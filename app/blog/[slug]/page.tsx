import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/mdx';

type Params = { slug: string };

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: '文章未找到 | AI 航海日志',
    };
  }
  return {
    title: `${post.frontmatter.title} | AI 航海日志`,
    description: post.frontmatter.excerpt,
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="space-y-6">
      <div className="ink-panel glow rounded-3xl border border-slate-100 bg-white p-6">
        <Link
          href="/blog"
          className="text-sm text-neon-blue underline decoration-dotted underline-offset-4 hover:text-neon-pink"
        >
          ← 返回列表
        </Link>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">{post.frontmatter.title}</h1>
        <p className="mt-2 text-slate-700">{post.frontmatter.excerpt}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-slate-500">
          <span>{new Date(post.frontmatter.date).toLocaleDateString('zh-CN')}</span>
          {(post.frontmatter.tags || []).map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="prose prose-pre:bg-transparent prose-pre:p-0 prose-img:rounded-2xl prose-headings:text-slate-900">
        {post.content}
      </div>
    </article>
  );
}
