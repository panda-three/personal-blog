import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/mdx';

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(
    posts.map((post) => ({
      slug: post.slug,
      ...post.frontmatter,
    })),
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=60',
      },
    },
  );
}
