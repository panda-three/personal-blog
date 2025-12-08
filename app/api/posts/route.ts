import { NextResponse } from 'next/server';
import { fetchPublishedPosts } from '@/lib/posts';

export const revalidate = 0;

export async function GET() {
  const posts = await fetchPublishedPosts();
  return NextResponse.json(
    posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.publishedAt,
      tags: post.tags,
      featured: post.featured,
    })),
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=60',
      },
    },
  );
}
