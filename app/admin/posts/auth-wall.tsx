export function AuthWall() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
      <p className="text-lg font-semibold text-slate-900">请先登录</p>
      <p className="mt-2 text-sm text-slate-600">使用 GitHub 登录后即可管理文章。</p>
      <a
        href="/api/auth/signin?callbackUrl=/admin/posts"
        className="mt-4 inline-flex rounded-full bg-gradient-to-r from-amber-300 via-neon-pink to-neon-blue px-5 py-2 text-sm font-semibold text-white shadow-neon transition hover:brightness-105"
      >
        登录后台
      </a>
    </div>
  );
}
