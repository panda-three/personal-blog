# Repository Guidelines

## Language Preference
- 所有来自助手的回复一律使用简体中文。
## Project Structure & Module Organization
- `app/`: App Router pages, API routes, NextAuth, and layout/global styles; default to server components.
- `components/`: Reusable UI and MDX helpers (`components/mdx/*`); compose existing pieces before adding new primitives.
- `content/posts/`: MDX posts; keep frontmatter small and colocate interactive blocks with imported components.
- `data/`, `lib/`, `prisma/`: Config plus auth/Prisma/Supabase/MDX utilities and schema/migrations/`seed.ts`; regenerate the Prisma client after schema edits. `public/` holds static assets.

## Build, Test, and Development Commands
- Install deps: `npm install`
- Develop locally: `npm run dev` (loads `.env`, hot reloads App Router)
- Production build: `npm run build` then `npm start`
- Quality gates: `npm run lint` (ESLint + Next) and `npm run format` (Prettier across repo)
- Tests: `npm run test` (Vitest); add `--coverage` for larger changes
- Database: `npm run prisma:generate`, `npm run prisma:migrate -- --name <tag>`, `npm run db:seed`, `npm run prisma:studio`

## Coding Style & Naming Conventions
- TypeScript is strict; avoid `any`; keep shared types in `lib/`.
- Components use PascalCase; hooks start with `use*`; route folders stay kebab-case.
- Prefer server components; mark `"use client"` only for interaction; keep data fetching in `lib/`.
- Tailwind stays inline with `clsx`/`tailwind-merge`; order classes layout → spacing → color → state.
- Run `npm run format` and `npm run lint` before committing.

## Testing Guidelines
- Vitest is the test runner; place specs as `*.test.ts(x)` beside code or under `__tests__/`.
- Cover `lib/` utilities, MDX rendering helpers, and client hooks; stub Supabase/Prisma with lightweight mocks rather than hitting live services.
- Run `npm run test` locally; include coverage output when altering auth flows, schema, or content rendering.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `ci:`) with optional scopes (`auth`, `mdx`, `prisma`, `ui`), matching existing history.
- Keep PRs focused; describe intent, impact, and linked issues. Include before/after UI screenshots, note migrations/seed updates, and list commands executed (lint/test/build).

## Security & Configuration Tips
- Secrets required: `DATABASE_URL`, `NEXTAUTH_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`. Copy `.env.example` to `.env` locally and never commit secrets.
- Prisma migrations live in `prisma/migrations`; regenerate the client after schema edits and commit migration folders plus seed updates.
- NextAuth + Supabase rely on RLS; keep database access inside `lib/prisma`/`lib/supabase` to avoid leaking credentials in client code.
