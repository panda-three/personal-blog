import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export const metadata = {
  title: '博客 - Neon Journal',
  description: '精选文章列表：Next.js、Supabase、独立开发与设计。',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-6">
      <div className="ink-panel glow rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-[0.18em] text-white/50">博客</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">写下路上的试错和灵感</h1>
        <p className="mt-2 max-w-3xl text-white/70">
          所有文章都用 MDX 写成，可以内嵌组件、动画、交互。技术、设计、运营都会写。
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="ink-panel glow flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                {new Date(post.frontmatter.date).toLocaleDateString('zh-CN')}
              </p>
              {post.frontmatter.featured ? (
                <span className="rounded-full bg-neon-pink/20 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-neon-pink">
                  精选
                </span>
              ) : null}
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">{post.frontmatter.title}</h3>
            <p className="mt-2 text-sm text-white/70">{post.frontmatter.excerpt}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(post.frontmatter.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
