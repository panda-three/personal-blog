import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { fetchPostById } from '@/lib/posts';
import { AuthWall } from '../auth-wall';
import { PostForm } from '../PostForm';

export const revalidate = 0;

type Params = { id: string };

export default async function EditPostPage({ params }: { params: Params }) {
  const session = await getServerSession(authOptions);
  if (!session) return <AuthWall />;

  const post = await fetchPostById(params.id);
  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">内容后台</p>
          <h1 className="text-3xl font-semibold text-slate-900">编辑文章</h1>
          <p className="mt-1 text-sm text-slate-600">修改后点击保存，前台会自动更新。</p>
        </div>
        <div className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
          ID: {post.id.slice(0, 8)}
        </div>
      </div>
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <PostForm
          mode="edit"
          post={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            body: post.body,
            tags: post.tags,
            featured: post.featured,
            published: post.published,
            publishedAt: post.publishedAt.toISOString(),
          }}
        />
      </div>
    </div>
  );
}
