export type Project = {
  title: string;
  description: string;
  stack: string[];
  link?: string;
  status?: 'live' | 'building' | 'beta';
  cta?: {
    type: 'qr';
    label: string;
    image: string;
    description?: string;
  };
};

export const projects: Project[] = [
  {
    title: '抽奖微信小程序',
    description: '用于品牌活动与社群增长的抽奖小程序，AI 生成文案与素材，实时抽奖、留资与数据看板。',
    stack: ['微信小程序', 'Node.js/TS', 'AI 生成', 'Analytics'],
    status: 'live',
    cta: {
      type: 'qr',
      label: '扫码体验',
      image: '/lottery-miniapp-qr.png',
      description: '微信扫码体验抽奖小程序 Demo',
    },
  },
  {
    title: '分销系统',
    description: '支持多级分销、订单追踪、实时佣金结算和后台看板，适配出海业务的渠道裂变场景。',
    stack: ['Next.js', 'Prisma', 'Supabase', '队列/定时任务'],
    status: 'beta',
  },
  {
    title: 'CRM 系统',
    description: '线索管理与自动跟进，内置线索评分、任务分配，AI 生成跟进话术/邮件，提升响应速度与转化率。',
    stack: ['Next.js', 'Prisma', 'NextAuth', 'AI 文案生成'],
    status: 'building',
  },
];
