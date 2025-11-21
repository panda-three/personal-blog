# Repository Guidelines

## Language Preference
- 所有来自助手的回复一律使用简体中文。

## Project Structure & Module Organization
- `app/`: Next.js App Router entry points (home, blog pages, API routes, auth) plus global layout and styles in `app/globals.css`.
- `components/`: Shared UI (Navbar, Hero, Footer, grids) and MDX helpers under `components/mdx/`; prefer reusing these before creating new primitives.
- `content/posts/`: MDX articles; keep frontmatter minimal and co-locate interactive snippets with components imported from `components/mdx`.
- `data/` and `lib/`: Typed config/data sources (`data/projects.ts`) and utilities (`auth`, `prisma`, `supabase`, MDX parsing, general `utils`).
- `prisma/`: Database schema, migrations, and `seed.ts`; align schema changes with Supabase Postgres and regenerate the client when models change.

## Build, Test, and Development Commands
- Install: `npm install`
- Develop: `npm run dev` (loads `.env`, hot reloads App Router)
- Production: `npm run build` → `npm start`
- Quality: `npm run lint` (Next + ESLint) and `npm run format` (Prettier over repo)
- Tests: `npm run test` (Vitest)
- Database: `npm run prisma:generate`, `npm run prisma:migrate -- --name <tag>`, `npm run db:seed`, `npm run prisma:studio`

## Coding Style & Naming Conventions
- TypeScript is `strict`; avoid `any`, favor explicit types and return shapes from `lib/`.
- React components use PascalCase filenames; hooks start with `use*`; route segment folders stay kebab-case for URL clarity.
- Prefer server components for data fetching; keep client components focused on interaction and mark with `"use client"`.
- Tailwind lives inline; use `clsx` for conditional classes and keep className order logical (layout → color → state).
- Run `npm run format` and `npm run lint` before submitting; do not hand-tune formatting that Prettier will rewrite.

## Testing Guidelines
- Use Vitest for unit/integration; place specs as `*.test.ts(x)` beside the code or under `__tests__/`.
- Aim to cover `lib/` utilities, MDX helpers, and any client hooks; stub network/DB with lightweight mocks rather than hitting Supabase.
- Run `npm run test` locally; add `--coverage` when validating larger changes.

## Commit & Pull Request Guidelines
- No repository history is present; default to Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `ci:`) with optional scopes (`auth`, `mdx`, `prisma`, `ui`).
- PRs should explain intent and impact, link issues, and include: before/after UI screenshots when visible, notes on migrations/seed updates, and the commands run (lint/tests/build).

## Security & Configuration Tips
- Required env vars: `DATABASE_URL`, `NEXTAUTH_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`; keep them in `.env`/deployment secrets—never commit.
- Prisma migrations live in `prisma/migrations`; regenerate and commit them with schema changes, and sync seed data to match new models.
- MDX content renders through whitelisted components; avoid arbitrary script injection and prefer fetching data via `lib/supabase` to keep credentials centralized.
