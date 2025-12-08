import Hero from '@/components/Hero';
import { FeaturedPosts } from '@/components/FeaturedPosts';
import { ProjectGrid } from '@/components/ProjectGrid';
import { AboutSection } from '@/components/AboutSection';
import { LifeCountdown } from '@/components/LifeCountdown';
import { getFeaturedPosts } from '@/lib/mdx';
import { projects } from '@/data/projects';
import { Pillars } from '@/components/Pillars';

export const revalidate = 0;

export default async function HomePage() {
  const posts = await getFeaturedPosts();

  return (
    <div className="space-y-14">
      <section className="grid gap-8 md:grid-cols-[1.05fr,1fr] md:items-start md:gap-10">
        <Hero />
        <LifeCountdown />
      </section>
      <Pillars />
      <FeaturedPosts posts={posts} />
      <ProjectGrid projects={projects} />
      <AboutSection />
    </div>
  );
}
