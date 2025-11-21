export type Project = {
  title: string;
  description: string;
  stack: string[];
  link?: string;
  status?: 'live' | 'building' | 'beta';
};

export const projects: Project[] = [
  {
    title: 'Pulseboard',
    description: '一块给独立开发者的仪表盘，整合 Vercel、Supabase 与支付数据，自动生成周报。',
    stack: ['Next.js', 'Supabase', 'Edge Functions', 'Tailwind'],
    status: 'live',
    link: 'https://vercel.com',
  },
  {
    title: 'Studio Notes',
    description: 'MDX 驱动的知识库，支持交互组件和代码片段，写完直接推送到生产。',
    stack: ['Next.js', 'MDX', 'Prisma', 'Vercel KV'],
    status: 'beta',
  },
  {
    title: 'Neon UI Kit',
    description: '一套面向夜间场景的 UI 组件，强调 Grotesk 字体和霓虹高光，适配设计师与前端协作。',
    stack: ['Storybook', 'Framer Motion', 'Tailwind'],
    status: 'building',
  },
];
