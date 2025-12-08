'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { createPostAction, deletePostAction, PostFormState, updatePostAction } from './actions';

type PostFormProps = {
  mode: 'create' | 'edit';
  post?: {
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    tags: string[];
    featured: boolean;
    published: boolean;
    publishedAt?: string;
  };
};

function formatDateInput(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={clsx(
        'rounded-full px-4 py-2 text-sm font-semibold text-white shadow-neon transition',
        pending ? 'bg-slate-400' : 'bg-gradient-to-r from-amber-300 via-neon-pink to-neon-blue',
      )}
      disabled={pending}
    >
      {pending ? '保存中...' : label}
    </button>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      onClick={(event) => {
        if (!confirm('确认删除这篇文章？此操作无法撤销。')) {
          event.preventDefault();
        }
      }}
      className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
    >
      {pending ? '删除中...' : '删除'}
    </button>
  );
}

export function PostForm({ mode, post }: PostFormProps) {
  const router = useRouter();
  const initialFormState: PostFormState = { status: 'idle' };
  const [state, formAction] = useFormState<PostFormState>(
    mode === 'create' ? createPostAction : updatePostAction,
    initialFormState,
  );
  const [deleteState, deleteAction] = useFormState<PostFormState>(
    deletePostAction,
    initialFormState,
  );

  useEffect(() => {
    if (state.status === 'success' && state.postId && mode === 'create') {
      router.replace(`/admin/posts/${state.postId}`);
    }
  }, [mode, router, state]);

  useEffect(() => {
    if (deleteState.status === 'success') {
      router.push('/admin/posts');
    }
  }, [deleteState, router]);

  const tagsValue = (post?.tags || []).join(', ');

  return (
    <div className="space-y-4">
      <form action={formAction} className="space-y-5">
        {mode === 'edit' && post?.id ? <input type="hidden" name="id" value={post.id} /> : null}
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-slate-700">标题</span>
            <input
              name="title"
              defaultValue={post?.title || ''}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-neon-pink focus:outline-none"
              placeholder="文章标题"
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-slate-700">Slug</span>
            <input
              name="slug"
              defaultValue={post?.slug || ''}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-neon-pink focus:outline-none"
              placeholder="my-first-post"
              required
            />
          </label>
        </div>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-700">摘要</span>
          <textarea
            name="excerpt"
            defaultValue={post?.excerpt || ''}
            className="min-h-[80px] rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-neon-pink focus:outline-none"
            placeholder="一句话说明文章想讲什么"
            required
          />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-slate-700">标签</span>
            <input
              name="tags"
              defaultValue={tagsValue}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-neon-pink focus:outline-none"
              placeholder="ai, nextjs, design"
            />
            <span className="text-xs text-slate-500">逗号分隔，前端展示为圆角标签</span>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-slate-700">发布时间</span>
            <input
              type="date"
              name="publishedAt"
              defaultValue={formatDateInput(post?.publishedAt)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-neon-pink focus:outline-none"
            />
          </label>
        </div>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-700">正文（MDX）</span>
          <textarea
            name="body"
            defaultValue={post?.body || ''}
            className="min-h-[360px] rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-900 shadow-inner focus:border-neon-pink focus:outline-none"
            placeholder="支持 MDX，可直接写 JSX 组件"
            required
          />
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              name="published"
              defaultChecked={post?.published}
              className="h-4 w-4 rounded border-slate-300 text-neon-pink focus:ring-neon-pink"
            />
            发布
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={post?.featured}
              className="h-4 w-4 rounded border-slate-300 text-neon-pink focus:ring-neon-pink"
            />
            精选
          </label>
          {post?.published ? (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              已发布
            </span>
          ) : (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              草稿
            </span>
          )}
        </div>
        {state.message ? (
          <div
            className={clsx(
              'rounded-xl border px-4 py-3 text-sm',
              state.status === 'error'
                ? 'border-rose-200 bg-rose-50 text-rose-700'
                : 'border-emerald-200 bg-emerald-50 text-emerald-700',
            )}
          >
            {state.message}
          </div>
        ) : null}
        <div className="flex items-center gap-3">
          <SubmitButton label={mode === 'create' ? '保存并继续' : '保存修改'} />
        </div>
      </form>
      {mode === 'edit' && post?.id ? (
        <form
          action={deleteAction}
          className="flex items-center justify-between gap-3 rounded-2xl border border-rose-100 bg-rose-50/80 px-4 py-3"
        >
          <div className="space-y-1 text-sm">
            <p className="font-semibold text-rose-700">删除文章</p>
            <p className="text-rose-600">删除后无法恢复，请谨慎操作。</p>
            {deleteState.message ? (
              <p
                className={clsx(
                  'text-xs',
                  deleteState.status === 'error' ? 'text-rose-700' : 'text-emerald-700',
                )}
              >
                {deleteState.message}
              </p>
            ) : null}
          </div>
          <input type="hidden" name="id" value={post.id} />
          <DeleteButton />
        </form>
      ) : null}
    </div>
  );
}
