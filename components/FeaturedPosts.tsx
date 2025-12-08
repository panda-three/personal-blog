'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Post } from '@/lib/mdx';

export function FeaturedPosts({ posts }: { posts: Post[] }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">精选文章</p>
          <h2 className="text-2xl font-semibold text-slate-900">最近在思考的事</h2>
        </div>
        <Link
          href="/blog"
          className="text-sm text-neon-blue underline decoration-dotted underline-offset-4 hover:text-neon-pink"
        >
          查看全部
        </Link>
      </div>
      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-6 text-sm text-slate-500">
          暂无精选文章，去后台把第一篇标记为精选吧。
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              className="ink-panel glow group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 transition hover:-translate-y-1"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                {new Date(post.frontmatter.date).toLocaleDateString('zh-CN')}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">
                {post.frontmatter.title}
              </h3>
              <p className="mt-2 text-sm text-slate-700 line-clamp-3">{post.frontmatter.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(post.frontmatter.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-semibold text-neon-blue transition group-hover:text-neon-pink"
                >
                  阅读更多 →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
