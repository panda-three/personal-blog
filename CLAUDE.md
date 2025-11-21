# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Neon Journal is a Next.js-based personal blog and portfolio template with neon-themed UI. Built with Next.js App Router, MDX for content, Tailwind CSS for styling, Prisma ORM with Supabase Postgres, and next-auth for GitHub OAuth authentication.

## Development Commands

```bash
# Install dependencies
npm install

# Development server (with hot reload)
npm run dev

# Production build and start
npm run build
npm start

# Code quality
npm run lint          # ESLint via Next.js
npm run format        # Prettier formatting

# Testing
npm run test          # Run Vitest tests

# Database operations
npm run prisma:generate              # Generate Prisma client after schema changes
npm run prisma:migrate -- --name <migration-name>  # Create and apply migration
npm run prisma:studio                # Open Prisma Studio GUI
npm run db:seed                      # Seed database with initial data
```

## Architecture

### Data Flow: MDX Content vs Database Models

The project has **two separate content systems** that operate independently:

1. **File-based MDX posts** (`content/posts/*.mdx`)
   - Read via `lib/mdx.ts` functions (`getPostBySlug`, `getAllPosts`, `getFeaturedPosts`)
   - Rendered through `next-mdx-remote/rsc` with custom components from `components/mdx/mdx-components`
   - Frontmatter parsed from MDX files, NOT stored in database
   - Primary system for displaying blog posts

2. **Database-backed models** (Prisma schema)
   - `Post` model exists in schema but is separate from MDX posts
   - Used for dynamic, user-generated content or admin-managed posts
   - Accessed via `lib/prisma.ts` singleton client

These systems do NOT automatically sync. If you need to connect them, you must explicitly handle the relationship (e.g., creating database records for MDX files or vice versa).

### Authentication Flow

- NextAuth.js configuration in `lib/auth.ts` with GitHub OAuth provider
- Uses JWT session strategy with Prisma adapter
- API route at `app/api/auth/[...nextauth]/route.ts`
- Session callback extends session with user ID from JWT token
- Required environment variables: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `NEXTAUTH_SECRET`

### MDX Processing Pipeline

```
content/posts/*.mdx
  → lib/mdx.ts (compileMDX)
  → remark-gfm (GitHub Flavored Markdown)
  → rehype-slug (heading IDs)
  → rehype-autolink-headings (anchor links)
  → components/mdx/mdx-components (custom React components)
  → Rendered in app/blog/[slug]/page.tsx
```

Interactive components imported directly in MDX files must be registered in `components/mdx/mdx-components.tsx`.

### Database Schema Key Points

- PostgreSQL via Supabase with two connection strings: `DATABASE_URL` (pooled) and `DIRECT_URL` (direct)
- NextAuth models: `User`, `Account`, `Session`, `VerificationToken`
- Content models: `Post` (dynamic posts), `Project` (portfolio items)
- All IDs use UUID, relations have cascade delete
- `Project.tech` uses string array for technology tags
- Both `Post` and `Project` have `published` boolean for draft/live control

## Environment Setup

Required `.env` variables:
```
DATABASE_URL=          # Supabase Postgres connection (pooled)
DIRECT_URL=           # Supabase Postgres direct connection
NEXTAUTH_SECRET=      # Generate with: openssl rand -base64 32
GITHUB_CLIENT_ID=     # GitHub OAuth app client ID
GITHUB_CLIENT_SECRET= # GitHub OAuth app client secret
```

After setting up `.env`:
1. Run `npm run prisma:generate` to create Prisma client
2. Run `npm run prisma:migrate -- --name init` to initialize database
3. Optionally run `npm run db:seed` to populate with seed data

## Code Style Conventions

- TypeScript strict mode enabled - avoid `any`, use explicit types
- React components: PascalCase filenames, prefer server components unless interaction needed
- Client components must have `"use client"` directive at top
- Route folders: kebab-case for clean URLs
- Hooks: prefix with `use*`
- Tailwind: inline classes via `clsx` for conditional styling
- Run `npm run format` and `npm run lint` before committing

## Testing Approach

- Vitest for unit and integration tests
- Place tests as `*.test.ts(x)` alongside code or in `__tests__/` directories
- Focus testing on `lib/` utilities, MDX processing, and client hooks
- Mock external services (Supabase, Prisma) rather than hitting real databases
- Run `npm run test` with optional `--coverage` flag

## Vercel 部署指南

### 环境变量配置

在 Vercel 项目设置中添加以下环境变量:

```bash
DATABASE_URL=          # Supabase Postgres 连接串 (pooled)
DIRECT_URL=           # Supabase Postgres 直连串 (用于 migrations)
NEXTAUTH_URL=         # 部署后的完整 URL，如 https://your-app.vercel.app
NEXTAUTH_SECRET=      # 使用 openssl rand -base64 32 生成
GITHUB_CLIENT_ID=     # GitHub OAuth App Client ID
GITHUB_CLIENT_SECRET= # GitHub OAuth App Client Secret
```

### GitHub OAuth 配置

1. 访问 https://github.com/settings/developers 创建新的 OAuth App
2. **Homepage URL**: 填写 Vercel 部署后的域名，如 `https://your-app.vercel.app`
3. **Authorization callback URL**: 填写 `https://your-app.vercel.app/api/auth/callback/github`
4. 将生成的 Client ID 和 Client Secret 添加到 Vercel 环境变量

### 构建配置

项目已配置 `postinstall` 脚本自动运行 `prisma generate`，确保 Prisma Client 在 Vercel 构建时正确生成。

### 常见部署问题

1. **Prisma Client 未生成错误**
   - 已通过 `package.json` 中的 `postinstall: "prisma generate"` 解决
   - Vercel 会在 `npm install` 后自动执行此命令

2. **NextAuth 类型错误**
   - 使用 `import NextAuth from 'next-auth/next'` (App Router 正确导入方式)
   - Session strategy 使用 `'jwt' as const` 确保类型安全

3. **网络访问限制 (中国大陆)**
   - 本地开发时需要配置代理访问 GitHub OAuth
   - 启动开发服务器: `HTTP_PROXY=http://127.0.0.1:7890 HTTPS_PROXY=http://127.0.0.1:7890 npm run dev`
   - Vercel 部署后无此问题

### Supabase 数据库配置

1. 在 Supabase 项目中启用 Row Level Security (RLS)
2. 根据需要配置表的访问策略 (Policy)
3. 使用 Connection Pooling 的连接串作为 `DATABASE_URL`
4. 使用 Direct Connection 的连接串作为 `DIRECT_URL`

### 监控与分析

- 可集成 Vercel Analytics 进行访问分析
- 可配置 Log Drains 进行日志监控
- Prisma Studio 可用于生产数据库的可视化管理 (谨慎使用)
