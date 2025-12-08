'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const pillars = [
  {
    title: '自我成长',
    icon: '🌱',
    color: 'from-amber-100 to-amber-50',
    chips: ['时间管理', '科学复盘', '知识库'],
    summary: '用实践论和数据化习惯保持迭代，写周报/年报，沉淀模板。',
    metric: '本周 3 次复盘',
  },
  {
    title: 'AI 编程（出海）',
    icon: '🚀',
    color: 'from-cyan-100 to-blue-50',
    chips: ['出海产品', 'AI 赋能', '快速实验'],
    summary: '围绕用户价值做产品，保持上线节奏，记录实验与结果。',
    metric: '2 个迭代进行中',
  },
  {
    title: 'AI 教育',
    icon: '📚',
    color: 'from-rose-100 to-pink-50',
    chips: ['备课', '授课', '工具包'],
    summary: '打磨 AI 备课/讲稿流程，给教师/学员提供可用的工具与案例。',
    metric: '备课 1 套新课件',
  },
];

export function Pillars() {
  return (
    <section className="space-y-4" id="pillars">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">人生红点</p>
          <h2 className="text-2xl font-semibold text-slate-900">AI 驱动的三大主轴</h2>
          <p className="mt-2 text-slate-600">
            用 AI 解决特定问题，推动行业创新。这里是我持续投入的三条航线。
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            className={cn(
              'ink-panel glow relative flex h-full flex-col overflow-hidden rounded-2xl p-5',
              'border border-slate-100 bg-gradient-to-br',
              pillar.color,
            )}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                {pillar.icon}
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Focus</p>
                <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              {pillar.chips.map((chip) => (
                <span key={chip} className="rounded-full bg-white/70 px-3 py-1 shadow-sm">
                  {chip}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm text-slate-700">{pillar.summary}</p>
            <div className="mt-auto pt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              {pillar.metric}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
