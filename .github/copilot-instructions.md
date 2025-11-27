<!-- Copilot instructions for contributors and AI coding agents -->
# CareerBridge — Copilot Instructions

Purpose: provide concise, actionable guidance so an AI coding agent can be immediately productive in this repository.

- **Big picture**: This is a Next.js 14 App Router application with server components and client components. Data is persisted in PostgreSQL using Drizzle ORM (`db/schema.ts`, `db/index.ts`). Authentication uses NextAuth v5 (beta) with the `@auth/drizzle-adapter` (`lib/auth.ts` + `app/api/auth/[...nextauth]/route.ts`). Server Actions live in `app/actions/*` and are used by client components for mutations.

- **Key files to read first**:
  - `app/layout.tsx` — root layout and global CSS import
  - `app/(marketing)/page.tsx` and `app/*/dashboard/*` — examples of Server Components that call `auth()` and `db`
  - `lib/auth.ts` — NextAuth v5 configuration and `handlers` export
  - `app/actions/*` — server actions (jobs, auth) showing mutation patterns and `revalidatePath` usage
  - `db/schema.ts` — canonical Drizzle schema and enums
  - `db/index.ts` and `drizzle.config.ts` — DB connection and Drizzle CLI config (.env.local is loaded)
  - `components/` and `components/ui/` — UI primitives (shadcn-style) and client components

- **Architecture & flow (short)**:
  - Pages are Server Components by default. When a page needs interactivity it renders a client component (`"use client"`) in `components/`.
  - Server Components fetch data via `db` (Drizzle) and `auth()` to authorize requests. Server Actions in `app/actions` perform writes and call `revalidatePath()` to update cache.
  - Authentication: NextAuth handlers are exported from `lib/auth.ts` and mounted at `app/api/auth/[...nextauth]/route.ts`.

- **Repository conventions** (be explicit)
  - Add `"use client"` to any component that uses React state, effects, transitions or browser-only APIs.
  - Keep data-fetching and session checks in Server Components (pages). Use `auth()` in server code to get the session.
  - Mutations: use Server Actions in `app/actions/*`. Actions should validate inputs (zod when present) and call `revalidatePath()` for pages that should update.
  - Drizzle queries commonly use `db.query.*` and `db.insert(...).values(...).returning()` patterns. See `app/*/dashboard/*` pages for examples.

- **Environment & secrets**:
  - DB: set `DATABASE_URL` in `.env.local`. `drizzle.config.ts` and `db/index.ts` both load `.env.local`.
  - NextAuth: set `NEXTAUTH_URL` and `NEXTAUTH_SECRET` for authentication to work locally and in production.

- **Drizzle / DB workflows**:
  - Config: `drizzle.config.ts` points at `db/schema.ts` and defines the output folder for generated migrations (`out` setting).
  - CLI: use `npx drizzle-kit ...` for generating/pushing migrations. Example commands you may run manually:
    - `npx drizzle-kit generate` (generate migration from schema)
    - `npx drizzle-kit push` (push schema/migrations to the DB)
    - Note: this repo's README/IMPLEMENTATION_GUIDE includes example commands; check `drizzle.config.ts` before running to confirm the `out` path.

- **Important gotchas discovered in repo**:
  - `drizzle.config.ts` loads `.env.local` and sets `out: './drizzle'`. If other docs say `./db/migrations`, prefer the actual `drizzle.config.ts` value when running CLI commands.
  - `package.json` contains basic Next scripts (`dev`, `build`, `start`, `lint`) but may not include Drizzle scripts. Run `npx drizzle-kit` directly or update `package.json` if you add scripted flows.

- **Common code examples to copy/paste**
  - Server Component checking auth and redirecting:
    - See `app/student/dashboard/page.tsx` for pattern: call `const session = await auth(); if (!session) redirect('/auth/signin')` then fetch via `db`.
  - Server Action mutation snippet:
    - Validate input with `zod`, perform `db.insert(...).values(...)`, then `revalidatePath('/student/dashboard')`.

- **When editing schema**:
  - Update `db/schema.ts` first.
  - Run `npx drizzle-kit generate` (or `npx drizzle-kit generate:pg`) to create migrations, then `npx drizzle-kit push` to apply.
  - Confirm `drizzle.config.ts` `out` and `schema` fields before running commands.

- **Testing / local dev**:
  - Start dev server: `npm run dev` (Next dev on port 3000).
  - Lint: `npm run lint`.
  - DB connection is logged by `db/index.ts` on start — check console for `DB Connection String:` output.

- **Where to look for changes to routes & API**:
  - API auth route: `app/api/auth/[...nextauth]/route.ts`
  - Server Actions: `app/actions/` (jobs, auth)
  - Page routes: `app/` subfolders. Note the `(marketing)` grouping for landing pages.

- **If you make runtime changes**:
  - For server-side changes touching DB, re-run migrations and/or `npx drizzle-kit push`.
  - For auth changes, ensure `NEXTAUTH_SECRET` is set locally or sessions will break.

If anything in these instructions is unclear or you want more detail (examples of Drizzle queries, common mutations, or a suggested `package.json` script set), tell me which section to expand and I'll iterate.
