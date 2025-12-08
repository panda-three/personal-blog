import Hero from '@/components/Hero';
import { FeaturedPosts } from '@/components/FeaturedPosts';
import { ProjectGrid } from '@/components/ProjectGrid';
import { AboutSection } from '@/components/AboutSection';
import { getFeaturedPosts } from '@/lib/mdx';
import { projects } from '@/data/projects';
import { Pillars } from '@/components/Pillars';

export const revalidate = 0;

export default async function HomePage() {
  const posts = await getFeaturedPosts();

  return (
    <div className="space-y-14">
      <Hero />
      <Pillars />
      <FeaturedPosts posts={posts} />
      <ProjectGrid projects={projects} />
      <AboutSection />
    </div>
  );
}
