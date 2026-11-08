# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal budgeting app. Monorepo with two independent npm packages (no root `package.json` or workspace tooling), run each one from its own directory:

- `backend/`: Express 5 API on Supabase (Postgres), TypeScript, ESM
- `frontend/`: Next.js 16 App Router with React 19 and Tailwind v4

Deployment uses Vercel services (`vercel.json`): `/api/*` goes to the backend, everything else goes to the frontend.

## Commands

No test suite exists in either package yet.

### Backend (`cd backend`)

```bash
npm run dev        # tsc --watch (type errors only) + node --watch running src/index.ts directly, loads .env.local
npm run typecheck  # tsc --noEmit
npm run build      # tsc -> dist/
npm start          # node dist/index.js
```

Local Supabase (the CLI is a devDependency, so use `npx`):

```bash
npx supabase start                 # API on :54321, Postgres on :54322, Studio on :54323
npx supabase db reset              # re-apply supabase/migrations/* and supabase/seed.sql
npx supabase migration new <name>  # new migration file in supabase/migrations/
npx supabase gen types typescript --local > src/types/database.types.ts
```

Required env vars: `SUPABASE_URL`, `SUPABASE_SECRET_KEY` (in `.env.local` for dev). `PORT` defaults to 8080. The secret key is server-only and bypasses RLS, so never expose it to the frontend.

### Frontend (`cd frontend`)

```bash
npm run dev     # next dev on :3000
npm run build
npm run lint    # eslint (eslint-config-next)
npx prettier --write .   # Prettier with the Tailwind class-sorting plugin
```

## Backend architecture

Requests flow through layers, one file per resource in each layer:

`routes/` → `controllers/` → `services/` → `repositories/` → Supabase client (`config/supabase.ts`)

- Route path constants live in `utils/apiPaths.ts` (`BASE_PATH = "/api"`, plus per-resource paths). `routes/index.ts` mounts each resource router under its path.
- Repositories are the only layer that talks to Supabase. They build queries on the typed client and throw the Supabase `error` when there is one.
- `types/database.types.ts` is **generated** by the Supabase CLI, so don't hand-edit it. Regenerate it after any migration. Domain types (`types/<resource>.types.ts`) are derived from it, e.g. `Database["public"]["Tables"]["transactions"]["Row"]`.
- `middleware/errorHandler.middleware.ts` is the final Express error handler.

TypeScript/ESM conventions (required by the Node "run .ts directly" setup):
- Relative imports **must include the `.ts` extension** (`./routes/index.ts`). `rewriteRelativeImportExtensions` rewrites them to `.js` on build.
- Type-only imports must use `import type` / `{ type X }`.
- `noUnusedLocals` / `noUnusedParameters` are on, so prefix intentionally unused params with `_`.

Data model: money is stored as integer cents (`amount_in_cents bigint`, must be > 0) and dates as `date` (`transaction_date`).

## Frontend architecture

- Source lives under `frontend/src/` (`src/app` for routes, `src/components`, `src/lib`, `src/types`). The `@/*` alias maps to `frontend/*`, so imports look like `@/src/components/sidenav`.
- Pages are async Server Components that `fetch` the backend API directly. Frontend route constants are in `src/lib/paths.ts`.
- `next.config.ts` enables `cacheComponents` and `partialPrefetching`, and Tailwind runs through a Turbopack CSS loader (`@tailwindcss/turbopack`).
- Frontend types in `src/types/` are hand-written copies of the backend row shapes, not shared.

**Next.js 16 has breaking changes from older versions** (see `frontend/AGENTS.md`). Before writing Next.js code, read the relevant guide in `frontend/node_modules/next/dist/docs/` and follow its deprecation notices. `next dev` regenerates `frontend/AGENTS.md`, so leave that file alone.
