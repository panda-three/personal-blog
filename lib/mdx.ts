import fs from 'fs/promises';
import path from 'path';
import type { ReactElement } from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { mdxComponents } from '@/components/mdx/mdx-components';

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

const POSTS_PATH = path.join(process.cwd(), 'content', 'posts');

export async function getPostSlugs() {
  const entries = await fs.readdir(POSTS_PATH);
  return entries.filter((file) => file.endsWith('.mdx')).map((file) => file.replace(/\.mdx$/, ''));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(POSTS_PATH, `${slug}.mdx`);
  const raw = await fs.readFile(fullPath, 'utf-8');

  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source: raw,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
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

  return {
    slug,
    frontmatter,
    content,
  };
}

export async function getAllPosts() {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
  return posts.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  );
}

export async function getFeaturedPosts(limit = 3) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.frontmatter.featured).slice(0, limit);
}
