import { projects } from '@/data/projects';
import { ProjectAction } from '@/components/ProjectAction';

export const metadata = {
  title: '项目 - AI 出海与教育案例',
  description: '代表性项目与实验，涵盖抽奖小程序、分销系统、CRM。',
};

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="ink-panel glow rounded-3xl border border-slate-100 bg-white p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">项目</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">代表项目与实验</h1>
        <p className="mt-2 max-w-3xl text-slate-700">
          聚焦客户价值的可落地方案：抽奖小程序、分销系统、CRM。保持上线频率，高速获取反馈。
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.title}
            className="ink-panel glow flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
              {project.status ? (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-600">
                  {project.status}
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
            <div className="mt-auto pt-4">
              <ProjectAction project={project} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
