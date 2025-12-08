'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { heroCopy } from '@/data/hero';

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-white/95 via-white/90 to-slate-50/85 p-7 shadow-xl shadow-slate-200/70 md:p-10">
      <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-amber-200/45 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-12 bottom-0 h-64 w-64 rounded-full bg-sky-200/45 blur-3xl" aria-hidden />

      <div className="relative space-y-7">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm shadow-white/50"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-amber-300 via-neon-pink to-neon-blue" />
          AI 航海日志
        </motion.div>

        <motion.h1
          className="max-w-3xl text-4xl font-semibold leading-[1.05] text-slate-900 md:text-5xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
        >
          <span className="inline-block rounded-2xl bg-gradient-to-r from-amber-200 via-neon-pink/80 to-neon-blue/80 px-3 py-1 shadow-[0_10px_40px_rgba(255,186,99,0.35)]">
            {heroCopy.title.badge}
          </span>
          <span className="mt-4 block">{heroCopy.title.main}</span>
        </motion.h1>

        <motion.p
          className="max-w-2xl text-base leading-relaxed text-slate-600"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          {heroCopy.description}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="#pillars"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-200 via-neon-pink to-neon-blue px-6 py-3 text-sm font-semibold text-slate-900 shadow-neon ring-1 ring-white/60 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            浏览人生红点
          </Link>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm shadow-slate-200 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
          >
            查看代表项目
            <span className="text-slate-400 transition group-hover:text-slate-600">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
