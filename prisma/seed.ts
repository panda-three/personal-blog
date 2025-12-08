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

  await prisma.post.upsert({
    where: { slug: 'welcome' },
    update: {},
    create: {
      slug: 'welcome',
      title: '欢迎来到 Neon Journal',
      excerpt: '用后台可视化管理文章，支持 MDX 与精选展示。',
      body: `# 你好，编辑器！

现在可以在 /admin/posts 登录并编辑文章。正文支持 **MDX**，可以直接引用组件或写 JSX。

- 通过「发布」切换草稿
- 勾选「精选」会展示在首页精选区域
- 标签用逗号分隔，方便前台展示
`,
      tags: ['demo', 'mdx'],
      featured: true,
      published: true,
      publishedAt: new Date('2024-10-01'),
      authorId: author.id,
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
