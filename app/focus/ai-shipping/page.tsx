import Link from 'next/link';
import { getPostsByTag } from '@/lib/mdx';

const AI_SHIPPING_TAG = 'ai-shipping';

export const metadata = {
  title: 'AI 编程（出海） - 出海产品 · AI 赋能 · 快速实验',
  description: '把出海产品与 AI 赋能的想法集中记录；文章加上标签「ai-shipping」即可自动汇总到这里。',
};

export const revalidate = 0;

export default async function AiShippingPage() {
  const entries = await getPostsByTag(AI_SHIPPING_TAG);
  const latestDate =
    entries[0]?.frontmatter.date && new Date(entries[0].frontmatter.date).toLocaleDateString('zh-CN');

  const metrics = [
    { label: '累计记录', value: `${entries.length} 篇` },
    { label: '最近更新', value: latestDate || '—' },
    { label: '标签', value: AI_SHIPPING_TAG },
  ];

  return (
    <div className="space-y-10">
      <div className="ink-panel glow rounded-3xl border border-slate-100 bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Focus · 产品实验</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">AI 编程（出海）：出海产品 / AI 赋能 / 快速实验</h1>
        <p className="mt-2 max-w-3xl text-slate-700">
          把出海产品、AI 赋能和快速实验的想法集中在这里。只要在后台给文章加上标签
          「{AI_SHIPPING_TAG}」，就会自动出现在列表里，方便随时回看和继续推进。
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
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">实验与想法</p>
            <h2 className="text-2xl font-semibold text-slate-900">出海与 AI 相关的日志</h2>
            <p className="text-sm text-slate-600">
              在后台「新建文章」并在标签里填写 {AI_SHIPPING_TAG}，保存后这里会立刻出现；点击卡片可以查看全文或继续编辑。
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
            还没有任何记录。尝试发布第一篇实验笔记，并设置标签「{AI_SHIPPING_TAG}」。
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
