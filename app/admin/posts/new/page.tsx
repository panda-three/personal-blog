import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AuthWall } from '../auth-wall';
import { PostForm } from '../PostForm';

export const revalidate = 0;

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);
  if (!session) return <AuthWall />;

  const today = new Date().toISOString();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">内容后台</p>
        <h1 className="text-3xl font-semibold text-slate-900">新建文章</h1>
        <p className="mt-1 text-sm text-slate-600">填写标题、摘要、正文（MDX），保存后即可在前台查看。</p>
      </div>
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <PostForm
          mode="create"
          post={{
            title: '',
            slug: '',
            excerpt: '',
            body: '',
            tags: [],
            featured: false,
            published: false,
            publishedAt: today,
          }}
        />
      </div>
    </div>
  );
}
