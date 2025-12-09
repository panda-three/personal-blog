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
    body: string;
  };
};

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
  const [state, formAction] = useFormState<PostFormState, FormData>(
    mode === 'create' ? createPostAction : updatePostAction,
    initialFormState,
  );
  const [deleteState, deleteAction] = useFormState<PostFormState, FormData>(
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

  return (
    <div className="space-y-4">
      <form action={formAction} className="space-y-5">
        {mode === 'edit' && post?.id ? <input type="hidden" name="id" value={post.id} /> : null}
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
          <span className="text-sm font-semibold text-slate-700">正文（MDX）</span>
          <textarea
            name="body"
            defaultValue={post?.body || ''}
            className="min-h-[360px] rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-900 shadow-inner focus:border-neon-pink focus:outline-none"
            placeholder="支持 MDX，可直接写 JSX 组件"
            required
          />
        </label>
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
