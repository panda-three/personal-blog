import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { fetchAllPosts } from '@/lib/posts';
import { AuthWall } from './auth-wall';

export const revalidate = 0;

export default async function AdminPostsPage() {
  const session = await getServerSession(authOptions);
  if (!session) return <AuthWall />;

  const posts = await fetchAllPosts();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">内容后台</p>
          <h1 className="text-3xl font-semibold text-slate-900">文章管理</h1>
          <p className="mt-1 text-sm text-slate-600">
            可在这里创建、编辑、发布或删除文章，内容实时渲染到前台。
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="rounded-full bg-gradient-to-r from-amber-300 via-neon-pink to-neon-blue px-5 py-2 text-sm font-semibold text-white shadow-neon transition hover:brightness-105"
        >
          新建文章
        </Link>
      </div>
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-6 text-center text-slate-500">
            还没有文章，点击右上角「新建文章」开始写。
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-3 md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold text-slate-900">{post.title}</p>
                    {post.featured ? (
                      <span className="rounded-full bg-neon-pink/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-700">
                        精选
                      </span>
                    ) : null}
                    {post.published ? (
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                        已发布
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                        草稿
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                    <span>Slug: {post.slug}</span>
                    <span>更新: {new Date(post.updatedAt).toLocaleDateString('zh-CN')}</span>
                    <span>发布时间: {new Date(post.publishedAt).toLocaleDateString('zh-CN')}</span>
                    {post.tags.length ? (
                      <span>标签: {post.tags.join(', ')}</span>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.published ? (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:border-neon-pink"
                    >
                      前台查看
                    </Link>
                  ) : (
                    <span className="rounded-full border border-dashed border-slate-200 px-4 py-2 text-sm text-slate-400">
                      未发布
                    </span>
                  )}
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    编辑
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
