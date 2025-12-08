import type { ReactElement } from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from '@/components/mdx/mdx-components';
import type { PostRecord } from './posts';
import {
  fetchFeaturedPosts,
  fetchPublishedPostBySlug,
  fetchPublishedPosts,
} from './posts';

export type PostFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  featured?: boolean;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: ReactElement;
};

function mapFrontmatter(post: PostRecord): PostFrontmatter {
  return {
    title: post.title,
    excerpt: post.excerpt,
    date: (post.publishedAt ?? post.createdAt).toISOString(),
    tags: post.tags || [],
    featured: post.featured,
  };
}

async function compileContent(source: string) {
  return compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: { className: ['anchor'] },
            },
          ],
        ],
      },
    },
  });
}

export async function getPostSlugs() {
  const posts = await fetchPublishedPosts();
  return posts.map((post) => post.slug);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await fetchPublishedPostBySlug(slug);
  if (!post) return null;

  const { content } = await compileContent(post.body);

  return {
    slug: post.slug,
    frontmatter: mapFrontmatter(post),
    content,
  };
}

export async function getAllPosts() {
  const posts = await fetchPublishedPosts();
  return Promise.all(
    posts.map(async (post) => {
      const { content } = await compileContent(post.body);
      return {
        slug: post.slug,
        frontmatter: mapFrontmatter(post),
        content,
      };
    }),
  );
}

export async function getFeaturedPosts(limit = 3) {
  const posts = await fetchFeaturedPosts(limit);
  return Promise.all(
    posts.map(async (post) => {
      const { content } = await compileContent(post.body);
      return {
        slug: post.slug,
        frontmatter: mapFrontmatter(post),
        content,
      };
    }),
  );
}
