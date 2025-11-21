# Neon Journal

霓虹感的个人博客与作品集模板。Next.js App Router + MDX + Tailwind + Prisma（Supabase Postgres）+ next-auth，支持 Vercel 一键部署。

## 快速开始

```bash
# 安装依赖
npm install

# 同步数据库（Supabase 连接串填在 .env）
npm run prisma:generate
npm run prisma:migrate -- --name init

# 开发
npm run dev
```

## 结构

- `app/`：页面、API route、NextAuth
- `content/posts/`：MDX 文章示例，含交互组件
- `components/`：UI 与 MDX 组件
- `prisma/`：Schema 定义

## 部署

- Vercel 上添加环境变量：`DATABASE_URL`、`NEXTAUTH_SECRET`、`GITHUB_CLIENT_ID/SECRET`
- Supabase 启动 Row Level Security 后，根据需要配置 Policy
- 可接入 Vercel Analytics / Log Drains 监控
# personal-blog
