import type { Prisma } from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';
import { prisma } from './prisma';

const postSelect = {
  id: true,
  slug: true,
  title: true,
  excerpt: true,
  body: true,
  tags: true,
  featured: true,
  published: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
} as const;

export type PostRecord = Prisma.PostGetPayload<{ select: typeof postSelect }>;

export async function fetchPublishedPosts() {
  noStore();
  return prisma.post.findMany({
    where: { published: true },
    select: postSelect,
    orderBy: [
      { publishedAt: 'desc' },
      { createdAt: 'desc' },
    ],
  });
}

export async function fetchPublishedPostBySlug(slug: string) {
  noStore();
  return prisma.post.findFirst({
    where: { slug, published: true },
    select: postSelect,
  });
}

export async function fetchFeaturedPosts(limit = 3) {
  noStore();
  return prisma.post.findMany({
    where: { published: true, featured: true },
    select: postSelect,
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    take: limit,
  });
}

export async function fetchPublishedPostsByTag(tag: string) {
  noStore();
  return prisma.post.findMany({
    where: { published: true, tags: { has: tag } },
    select: postSelect,
    orderBy: [
      { publishedAt: 'desc' },
      { createdAt: 'desc' },
    ],
  });
}

export async function fetchAllPosts() {
  noStore();
  return prisma.post.findMany({
    select: postSelect,
    orderBy: [
      { published: 'desc' },
      { publishedAt: 'desc' },
      { createdAt: 'desc' },
    ],
  });
}

export async function fetchPostById(id: string) {
  noStore();
  return prisma.post.findUnique({
    where: { id },
    select: postSelect,
  });
}
