'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';

const statusCopy: Record<NonNullable<Project['status']>, string> = {
  live: '已上线',
  beta: 'Beta',
  building: '构建中',
};

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <section className="space-y-4" id="projects">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">个人项目</p>
          <h2 className="text-2xl font-semibold text-slate-900">代表项目与解决方案</h2>
        </div>
        <Link
          href="/projects"
          className="text-sm text-neon-blue underline decoration-dotted underline-offset-4 hover:text-neon-pink"
        >
          详细列表
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="ink-panel glow flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
              {project.status ? (
                <span
                  className={cn(
                    'rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em]',
                    project.status === 'live'
                      ? 'bg-neon-green/20 text-emerald-700'
                      : project.status === 'beta'
                        ? 'bg-neon-blue/20 text-sky-700'
                        : 'bg-neon-pink/20 text-rose-700',
                  )}
                >
                  {statusCopy[project.status]}
                </span>
              ) : null}
            </div>
            <p className="mt-3 text-sm text-slate-700">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                  {item}
                </span>
              ))}
            </div>
            {project.link ? (
              <Link
                href={project.link}
                className="mt-auto pt-4 text-sm font-semibold text-neon-blue transition hover:text-neon-pink"
              >
                查看项目 →
              </Link>
            ) : (
              <p className="mt-auto pt-4 text-xs uppercase tracking-[0.18em] text-slate-400">
                正在打磨
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
