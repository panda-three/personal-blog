import Link from 'next/link';
import { getPostsByTag } from '@/lib/mdx';

const SELF_GROWTH_TAG = 'self-growth';

export const metadata = {
  title: '自我成长 - 时间管理 · 科学复盘 · 刻意练习',
  description: '把时间、复盘和刻意练习的记录搬到这里，随时新增、持续迭代。',
};

export const revalidate = 0;

export default async function SelfGrowthPage() {
  const entries = await getPostsByTag(SELF_GROWTH_TAG);
  const latestDate =
    entries[0]?.frontmatter.date && new Date(entries[0].frontmatter.date).toLocaleDateString('zh-CN');

  const metrics = [
    { label: '累计记录', value: `${entries.length} 篇` },
    { label: '最近更新', value: latestDate || '—' },
    { label: '标签', value: SELF_GROWTH_TAG },
  ];

  return (
    <div className="space-y-10">
      <div className="ink-panel glow rounded-3xl border border-slate-100 bg-gradient-to-br from-amber-50 via-white to-emerald-50 p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Focus · 成长记录</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">自我成长：时间、复盘、刻意练习</h1>
        <p className="mt-2 max-w-3xl text-slate-700">
          页面内容不再写死。我会把每次复盘、时间管理实验、刻意练习的结果记录成文章，只要在后台给文章加上标签
          「{SELF_GROWTH_TAG}」，这里就会自动更新。
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm shadow-white/50"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{metric.label}</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">成长记录</p>
            <h2 className="text-2xl font-semibold text-slate-900">随时可以追加的日志</h2>
            <p className="text-sm text-slate-600">
              在后台「新建文章」并在标签里填写 {SELF_GROWTH_TAG}，保存后这里即刻出现；点击卡片可以查看全文或继续编辑。
            </p>
          </div>
          <Link
            href="/admin/posts/new"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            去后台记录
          </Link>
        </div>

        {entries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-6 text-sm text-slate-600">
            还没有任何记录。试着在后台发布第一篇，并给标签填写「{SELF_GROWTH_TAG}」。
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <Link
                key={entry.slug}
                href={`/blog/${entry.slug}`}
                className="ink-panel glow block rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/70 p-5 transition hover:-translate-y-1"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    {new Date(entry.frontmatter.date).toLocaleDateString('zh-CN')}
                  </p>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neon-blue">
                    查看全文 →
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{entry.frontmatter.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{entry.frontmatter.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(entry.frontmatter.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
