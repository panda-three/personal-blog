export function AboutSection() {
  return (
    <section className="ink-panel glow grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 md:grid-cols-[1.2fr_1fr]" id="about">
      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-white/50">关于作者</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">偏爱动手的创意开发者</h2>
        <p className="mt-3 text-white/70">
          写代码、画界面、搭产品、写文章。喜欢把音乐和产品节奏放到一起，做出既快又带质感的数字体验。
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/70">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-white/50">常用栈</p>
            <p className="mt-1 font-semibold">Next.js · Supabase · Tailwind · Prisma</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-white/50">擅长</p>
            <p className="mt-1 font-semibold">产品 MVP、设计系统、创意动效</p>
          </div>
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 text-sm text-white/70">
        <p className="text-xs uppercase tracking-[0.18em] text-white/50">社交/联系</p>
        <ul className="mt-3 space-y-2">
          <li className="flex items-center justify-between">
            <span>Newsletter</span>
            <span className="text-white/40">/coming-soon</span>
          </li>
          <li className="flex items-center justify-between">
            <span>GitHub</span>
            <a className="text-neon-blue hover:text-neon-pink" href="https://github.com" target="_blank" rel="noreferrer">
              @yourhandle
            </a>
          </li>
          <li className="flex items-center justify-between">
            <span>Twitter</span>
            <a className="text-neon-blue hover:text-neon-pink" href="https://twitter.com" target="_blank" rel="noreferrer">
              @creator
            </a>
          </li>
          <li className="flex items-center justify-between">
            <span>邮件</span>
            <a className="text-neon-blue hover:text-neon-pink" href="mailto:hello@neonjournal.dev">
              hello@neonjournal.dev
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
