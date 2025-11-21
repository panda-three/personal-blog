import Link from 'next/link';
import { getPostBySlug, getPostSlugs } from '@/lib/mdx';

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const post = await getPostBySlug(params.slug);
  return {
    title: `${post.frontmatter.title} | Neon Journal`,
    description: post.frontmatter.excerpt,
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const post = await getPostBySlug(params.slug);

  return (
    <article className="space-y-6">
      <div className="ink-panel glow rounded-3xl border border-white/10 bg-white/5 p-6">
        <Link
          href="/blog"
          className="text-sm text-neon-blue underline decoration-dotted underline-offset-4 hover:text-neon-pink"
        >
          ← 返回列表
        </Link>
        <h1 className="mt-3 text-3xl font-semibold text-white">{post.frontmatter.title}</h1>
        <p className="mt-2 text-white/60">{post.frontmatter.excerpt}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-white/50">
          <span>{new Date(post.frontmatter.date).toLocaleDateString('zh-CN')}</span>
          {(post.frontmatter.tags || []).map((tag) => (
            <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-white/60">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="prose prose-invert prose-pre:bg-transparent prose-pre:p-0 prose-img:rounded-2xl prose-headings:text-white">
        {post.content}
      </div>
    </article>
  );
}
