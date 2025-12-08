'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const links = [
  { href: '/', label: '主页' },
  { href: '#pillars', label: '人生红点' },
  { href: '/projects', label: 'AI 作品' },
  { href: '/blog', label: '文章' },
  { href: '#about', label: '关于' },
];

export default function Navbar() {
  return (
    <header className="sticky top-4 z-20">
      <div className="ink-panel glow flex items-center justify-between rounded-3xl px-6 py-4 shadow-neon">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-pink via-amber-300 to-neon-blue text-lg font-semibold text-white shadow-neon">
            🚀
          </div>
          <div className="leading-tight">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">AI Life Log</p>
            <p className="text-lg font-semibold text-slate-900">人生航海日志</p>
          </div>
        </Link>
        <nav className="flex items-center gap-3 text-sm text-slate-700">
          {links.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ y: -2, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 350, damping: 15 }}
            >
              <Link
                href={link.href}
                className="rounded-full px-3 py-2 transition hover:bg-white"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <Link
            href="mailto:hello@neonjournal.dev"
            className="rounded-full bg-gradient-to-r from-amber-200 via-neon-pink to-neon-blue px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-neon transition hover:brightness-105"
          >
            写信
          </Link>
        </nav>
      </div>
    </header>
  );
}
