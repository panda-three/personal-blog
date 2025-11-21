'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Post } from '@/lib/mdx';

export function FeaturedPosts({ posts }: { posts: Post[] }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-white/50">精选文章</p>
          <h2 className="text-2xl font-semibold text-white">最近在思考的事</h2>
        </div>
        <Link
          href="/blog"
          className="text-sm text-neon-blue underline decoration-dotted underline-offset-4 hover:text-neon-pink"
        >
          查看全部
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            className="ink-panel glow group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              {new Date(post.frontmatter.date).toLocaleDateString('zh-CN')}
            </p>
            <h3 className="mt-3 text-lg font-semibold text-white">{post.frontmatter.title}</h3>
            <p className="mt-2 text-sm text-white/60 line-clamp-3">{post.frontmatter.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(post.frontmatter.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto pt-4">
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-semibold text-neon-green transition group-hover:text-neon-pink"
              >
                阅读更多 →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
