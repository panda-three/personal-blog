import Link from 'next/link';
import { projects } from '@/data/projects';

export const metadata = {
  title: '项目 - Neon Journal',
  description: '个人项目长清单，包含上线进度与技术栈。',
};

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="ink-panel glow rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-[0.18em] text-white/50">项目</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">心血作品与实验</h1>
        <p className="mt-2 max-w-3xl text-white/70">
          这些项目多数用 Next.js + Supabase 打造，尽量保持上线次数高、反馈周期短。
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.title}
            className="ink-panel glow flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              {project.status ? (
                <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70">
                  {project.status}
                </span>
              ) : null}
            </div>
            <p className="mt-3 text-sm text-white/70">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
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
              <p className="mt-auto pt-4 text-xs uppercase tracking-[0.18em] text-white/40">
                正在打磨
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
