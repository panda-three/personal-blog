'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';

type Props = {
  project: Project;
  className?: string;
};

export function ProjectAction({ project, className }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener('keydown', handler);
    }

    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  if (project.cta?.type === 'qr') {
    return (
      <>
        <button
          type="button"
          className={cn('text-sm font-semibold text-neon-blue transition hover:text-neon-pink', className)}
          onClick={() => setOpen(true)}
        >
          {project.cta.label}
        </button>

        {open ? (
          <div
            aria-label="二维码弹窗"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-[1px]"
            onClick={() => setOpen(false)}
          >
            <div
              className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                aria-label="关闭二维码"
                className="absolute right-3 top-3 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
              <h4 className="text-lg font-semibold text-slate-900">{project.title}</h4>
              {project.cta.description ? (
                <p className="mt-1 text-sm text-slate-600">{project.cta.description}</p>
              ) : null}
              <div className="mt-4 flex justify-center">
                <Image
                  alt={`${project.title} 二维码`}
                  className="h-auto w-full max-w-[240px] rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-inner"
                  height={320}
                  src={project.cta.image}
                  width={320}
                  priority
                />
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }

  if (project.link) {
    return (
      <Link
        href={project.link}
        className={cn('text-sm font-semibold text-neon-blue transition hover:text-neon-pink', className)}
      >
        查看项目 →
      </Link>
    );
  }

  return (
    <p className={cn('text-xs uppercase tracking-[0.18em] text-slate-400', className)}>
      正在打磨
    </p>
  );
}
