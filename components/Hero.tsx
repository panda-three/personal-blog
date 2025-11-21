'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
      <div className="space-y-6">
        <motion.p
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          独立开发者 · 设计与代码并重
        </motion.p>
        <motion.h1
          className="text-4xl font-semibold leading-tight md:text-5xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          <span className="text-white/70">让作品与想法</span>{' '}
          <span className="bg-gradient-to-r from-neon-pink via-neon-blue to-neon-green bg-clip-text text-transparent">
            同步发光
          </span>
        </motion.h1>
        <motion.p
          className="text-lg text-white/60 md:text-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          写下独立开发的野路子，展示亲手打造的产品。Next.js + Supabase + MDX，既写得顺手，也跑得漂亮。
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
        >
          <Link
            href="/blog"
            className="rounded-full bg-gradient-to-r from-neon-pink via-neon-blue to-neon-green px-5 py-3 text-sm font-semibold text-ink shadow-neon transition hover:scale-[1.02]"
          >
            查看精选文章
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
          >
            浏览项目
          </Link>
        </motion.div>
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-white/50">
          <span className="rounded-full border border-white/10 px-3 py-1">Next.js</span>
          <span className="rounded-full border border-white/10 px-3 py-1">Supabase</span>
          <span className="rounded-full border border-white/10 px-3 py-1">Prisma</span>
          <span className="rounded-full border border-white/10 px-3 py-1">Tailwind</span>
          <span className="rounded-full border border-white/10 px-3 py-1">MDX</span>
        </div>
      </div>
      <motion.div
        className="relative hidden h-full md:block"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="glow absolute inset-4 rounded-[32px] bg-gradient-to-br from-neon-pink/40 via-neon-blue/30 to-neon-green/20 opacity-90" />
        <div className="relative h-full rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
          <p className="text-sm font-semibold text-white/70">实时心跳</p>
          <div className="mt-6 space-y-4 text-white">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>创作节奏</span>
              <span>92%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-neon-pink to-neon-blue" />
            </div>
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>实验次数</span>
              <span>34</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-neon-blue to-neon-green" />
            </div>
            <div className="text-xs text-white/60">
              <p className="font-semibold text-white/80">Studio Vibes</p>
              <p>代码、设计、声音混合的创作空间。保持上线，保持更新。</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
