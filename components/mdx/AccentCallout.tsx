'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'pink' | 'blue' | 'green';

const toneMap: Record<Tone, string> = {
  pink: 'from-neon-pink/30 to-white/5 border-neon-pink/40',
  blue: 'from-neon-blue/25 to-white/5 border-neon-blue/40',
  green: 'from-neon-green/25 to-white/5 border-neon-green/40',
};

export function AccentCallout({
  title,
  children,
  tone = 'pink',
}: {
  title: string;
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl border px-4 py-3 text-sm shadow-neon',
        'bg-gradient-to-br',
        toneMap[tone],
      )}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/80">{title}</p>
      <div className="text-white/70">{children}</div>
    </motion.div>
  );
}
