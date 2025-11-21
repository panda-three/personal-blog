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

## Deployment Notes

- Designed for Vercel deployment
- Set all environment variables in Vercel project settings
- Prisma migrations run automatically on Vercel builds via `prisma generate` in `postinstall`
- Configure Supabase Row Level Security policies as needed for production
- Can integrate Vercel Analytics and Log Drains for monitoring
