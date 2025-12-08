'use client';

import { motion } from 'framer-motion';

export function PulseCard({
  title,
  metric,
  hint,
}: {
  title: string;
  metric: string;
  hint?: string;
}) {
  return (
    <motion.div
      className="glow relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 backdrop-blur"
      initial={{ opacity: 0.7, scale: 0.97 }}
      whileHover={{ scale: 1.01, rotate: -0.4 }}
      transition={{ type: 'spring', stiffness: 320, damping: 20 }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-600">
          Pulse
        </span>
      </div>
      <p className="mt-4 text-3xl font-semibold text-slate-900">{metric}</p>
      {hint ? <p className="mt-2 text-xs text-slate-600">{hint}</p> : null}
    </motion.div>
  );
}
