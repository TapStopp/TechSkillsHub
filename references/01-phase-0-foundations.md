# Phase 0 — Foundations and project setup

## Goal

Stand up a deployable Next.js application connected to PostgreSQL via Prisma, with
CI/CD to Vercel, so every later phase ships on a working pipeline.

## Scope

- Next.js (App Router, TypeScript) project scaffold.
- Tailwind CSS + shadcn/ui base components and theme.
- Prisma + PostgreSQL connection (Vercel Postgres or Neon).
- Environment variable management for local and Vercel.
- Linting, formatting, and CI checks.
- First deploy to Vercel (preview + production).

## Tasks

1. Initialize the app: `npx create-next-app@latest` (TypeScript, App Router, ESLint, Tailwind).
2. Add shadcn/ui and configure a base theme, layout shell, and navigation.
3. Install and initialize Prisma; configure `DATABASE_URL` and a `prisma/schema.prisma`.
4. Provision PostgreSQL (Vercel Postgres or Neon) and run an initial migration.
5. Add a health-check route (`/api/health`) that verifies DB connectivity.
6. Configure `.env.example`, Prettier, ESLint rules, and a `lint`/`typecheck` npm script.
7. Set up Vercel project, link the repo, and configure environment variables.
8. Add a minimal GitHub Actions (or Vercel) CI gate: install, lint, typecheck, build.

## Data model (initial)

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(STUDENT)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  STUDENT
  FACULTY
  ADMIN
}
```

## Deliverables

- Repository with a buildable Next.js app.
- Live Vercel deployment (preview and production URLs).
- Working DB connection verified by the health-check route.
- CI that blocks merges on lint/typecheck/build failures.

## Acceptance criteria

- `npm run build` succeeds locally and on Vercel.
- `/api/health` returns `200` with a successful DB round-trip.
- A pull request runs CI checks automatically.
- Base layout, theme, and navigation render on desktop and mobile.

## Dependencies

- None (this is the foundation).
