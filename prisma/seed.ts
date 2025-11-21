import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const author = await prisma.user.upsert({
    where: { email: 'hello@neonjournal.dev' },
    update: {},
    create: {
      name: 'Neon Author',
      email: 'hello@neonjournal.dev',
    },
  });

  await prisma.project.upsert({
    where: { slug: 'pulseboard' },
    update: {},
    create: {
      slug: 'pulseboard',
      title: 'Pulseboard',
      summary: '独立开发者的运营仪表盘',
      url: 'https://example.com',
      tech: ['Next.js', 'Supabase', 'Tailwind'],
      status: 'live',
      published: true,
      creatorId: author.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
