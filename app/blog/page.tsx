import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export const metadata = {
  title: '博客 - Neon Journal',
  description: '精选文章列表：Next.js、Supabase、独立开发与设计。',
};

export const revalidate = 0;

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-6">
      <div className="ink-panel glow rounded-3xl border border-slate-100 bg-white p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">博客</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">写下路上的试错和灵感</h1>
        <p className="mt-2 max-w-3xl text-slate-700">
          所有文章都用 MDX 写成，可以内嵌组件、动画、交互。技术、设计、运营都会写。
        </p>
      </div>
      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-8 text-center text-slate-500">
          暂无文章，登录后台发布一篇试试吧。
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="ink-panel glow flex flex-col rounded-2xl border border-slate-100 bg-white p-5 transition hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  {new Date(post.frontmatter.date).toLocaleDateString('zh-CN')}
                </p>
                {post.frontmatter.featured ? (
                  <span className="rounded-full bg-neon-pink/20 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-rose-700">
                    精选
                  </span>
                ) : null}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">
                {post.frontmatter.title}
              </h3>
              <p className="mt-2 text-sm text-slate-700">{post.frontmatter.excerpt}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(post.frontmatter.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
