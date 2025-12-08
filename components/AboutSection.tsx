import Image from 'next/image';

export function AboutSection() {
  return (
    <section className="ink-panel glow grid gap-6 rounded-3xl border border-slate-100 bg-white p-6 md:grid-cols-[1.2fr_1fr]" id="about">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">关于作者</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">用 AI 推动出海产品与教育创新</h2>
        <p className="mt-3 text-slate-700">
          独立开发者 + 老师，专注用 AI 解决特定行业问题。输出可验证的出海产品、可落地的 AI 教学内容，并用科学复盘保持迭代。
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-700">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">方向</p>
            <p className="mt-1 font-semibold text-slate-900">AI 出海产品 · AI 教育 · 自我成长方法论</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">常用栈</p>
            <p className="mt-1 font-semibold text-slate-900">Next.js · Supabase · Prisma · Tailwind</p>
          </div>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-amber-50 to-white p-4 text-sm text-slate-700" id="contact">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">联系</p>
        <ul className="mt-3 space-y-2">
          <li className="flex items-center justify-between">
            <span>邮件</span>
            <a className="text-neon-blue hover:text-neon-pink" href="mailto:zhoulei577@gmail.com">
              zhoulei577@gmail.com
            </a>
          </li>
          <li className="flex items-center justify-between gap-3">
            <span>微信</span>
            <div className="flex items-center gap-3">
              <span className="text-neon-blue">扫码添加</span>
              <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
                <Image alt="微信二维码" className="object-cover" fill sizes="48px" src="/wechat-qr.png" />
              </div>
            </div>
          </li>
          <li className="flex items-center justify-between">
            <span>GitHub</span>
            <a className="text-neon-blue hover:text-neon-pink" href="https://github.com/panda-three" target="_blank" rel="noreferrer">
              @panda-three
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
