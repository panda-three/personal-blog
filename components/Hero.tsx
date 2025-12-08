'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="grid gap-10 md:grid-cols-[1.35fr_1fr] md:items-center">
      <div className="space-y-6">
        <motion.p
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-slate-600 shadow-sm"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          独立开发者 · AI 出海 · AI 教育
        </motion.p>
        <motion.h1
          className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          用 AI 做
          <span className="mx-2 rounded-2xl bg-gradient-to-r from-amber-200 via-neon-pink/70 to-neon-blue/70 px-2 py-1">
            人生红点
          </span>
          ：让产品、课程与自我成长都能落地
        </motion.h1>
        <motion.p
          className="text-lg text-slate-700 md:text-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          聚焦三个板块：自我成长（时间管理/复盘/知识库）、AI 编程（出海产品与实验室）、AI 教育（备课、授课、工具包）。
          明亮、可操作，随时更新。
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
        >
          <Link
            href="#pillars"
            className="rounded-full bg-gradient-to-r from-amber-200 via-neon-pink to-neon-blue px-5 py-3 text-sm font-semibold text-slate-900 shadow-neon transition hover:scale-[1.02]"
          >
            浏览人生红点
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-white"
          >
            查看代表项目
          </Link>
        </motion.div>
        <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.18em] text-slate-500">
          <span className="rounded-full bg-white/80 px-3 py-1 shadow-sm">Next.js</span>
          <span className="rounded-full bg-white/80 px-3 py-1 shadow-sm">Supabase</span>
          <span className="rounded-full bg-white/80 px-3 py-1 shadow-sm">Prisma</span>
          <span className="rounded-full bg-white/80 px-3 py-1 shadow-sm">Tailwind</span>
          <span className="rounded-full bg-white/80 px-3 py-1 shadow-sm">MDX</span>
        </div>
      </div>
      <motion.div
        className="relative hidden h-full md:block"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="glow absolute inset-4 rounded-[32px] bg-gradient-to-br from-amber-200/60 via-neon-pink/40 to-neon-blue/30 opacity-80" />
        <div className="relative h-full rounded-[32px] border border-slate-100 bg-white p-6 shadow-neon">
          <p className="text-sm font-semibold text-slate-700">最近节奏</p>
          <div className="mt-6 space-y-4 text-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>每周输出</span>
              <span className="font-semibold text-slate-900">3-4 篇</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-amber-300 to-neon-pink" />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>出海实验</span>
              <span className="font-semibold text-slate-900">进行中</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-neon-blue to-amber-200" />
            </div>
            <div className="text-xs text-slate-600">
              <p className="font-semibold text-slate-800">Focus</p>
              <p>AI 出海产品 · AI 教育 · 自我成长的模板与复盘正在更新。</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
