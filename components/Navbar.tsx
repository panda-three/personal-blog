'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const links = [
  { href: '/', label: '主页' },
  { href: '/blog', label: '精选文章' },
  { href: '/projects', label: '个人项目' },
  { href: '#about', label: '关于作者' },
];

export default function Navbar() {
  return (
    <header className="sticky top-4 z-20">
      <div className="ink-panel glow flex items-center justify-between rounded-3xl px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-neon-pink/60 via-neon-blue/50 to-neon-green/70 shadow-neon" />
          <div className="leading-tight">
            <p className="text-sm uppercase tracking-[0.18em] text-white/60">Neon Journal</p>
            <p className="text-lg font-semibold">自我驱动的创作力</p>
          </div>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-white/70">
          {links.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ y: -2, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 350, damping: 15 }}
            >
              <Link
                href={link.href}
                className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <Link
            href="mailto:hello@neonjournal.dev"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-white/40 hover:bg-white/10 hover:text-white"
          >
            联系我
          </Link>
        </nav>
      </div>
    </header>
  );
}
