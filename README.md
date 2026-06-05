# TechSkillsHub

A student career-readiness and campus-engagement platform for Marist University — events, clubs, skill pathways, badges, micro-credentials, mentorship, mock interviews, a competency tracker, and a co-curricular transcript, all wrapped in a gamified XP/level experience.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma + PostgreSQL**.

---

## Two ways to run

This project ships with **two data paths** so you can demo instantly and wire a real database later.

| Path | Data source | Database needed? | Use for |
| --- | --- | --- | --- |
| **Demo (default)** | In-memory mock store (`src/lib/data/store.ts`) | No | Clickable demo, Vercel preview, local exploration |
| **Live DB** | Prisma + PostgreSQL | Yes | Real persistence, production |

The demo path seeds a logged-in student (**Ava Thompson, CS '27**) and works with **no environment variables**. Mutations (RSVP, check-in, reflections, bookings, etc.) persist in memory and reset on a cold start / server restart.

---

## Quick start (demo path)

```powershell
npm install
npm run dev
```

Open <http://localhost:3000>. Click **Continue with Marist SSO** on the login page (mock SSO — no real credentials) to enter the app.

---

## Live DB path (optional)

1. Provision a PostgreSQL database (local, Docker, Neon, Supabase, Vercel Postgres, etc.).
2. Copy the env template and set your connection string:

   ```powershell
   Copy-Item .env.example .env
   # then edit .env and set DATABASE_URL=postgresql://...
   ```

3. Create the schema and seed it:

   ```powershell
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

4. Start the app:

   ```powershell
   npm run dev
   ```

> The seed script (`prisma/seed.ts`) maps the same fixtures used by the demo store into the real database.

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | `prisma generate` + production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint (`next/core-web-vitals`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier write |
| `npm run prisma:generate` | Regenerate the Prisma client |
| `npm run prisma:migrate` | Run a dev migration |
| `npm run prisma:seed` | Seed the database |

---

## Deploy to Vercel

The demo path runs on Vercel **without any environment variables**.

```powershell
npm i -g vercel    # if you don't have the CLI
vercel             # link + deploy a preview
vercel --prod      # promote to production
```

To switch to the live DB path on Vercel, add these in **Project → Settings → Environment Variables**, then redeploy:

- `DATABASE_URL` — your PostgreSQL connection string
- (later) any Suitable / SSO credentials when you replace the mocks

---

## Project structure

```text
prisma/
  schema.prisma        # ~24 models + enums (the "real DB")
  seed.ts              # maps fixtures -> PostgreSQL (run via tsx)
src/
  app/                 # App Router: landing, login, (app) shell + 16 pages, /api routes
  components/          # UI library + feature components (cards, browsers, forms, shells)
  lib/
    data/              # seed-data fixtures + in-memory store + mutations
    auth/              # mock SSO (cookie-based)
    integrations/      # mock Suitable client
    utils.ts, types.ts, nav.ts, prisma.ts
references/            # phased build plan (00-overview … 10-phase-9)
```

### Swapping the mocks for real integrations

- **SSO** — `src/lib/auth/mockAuth.ts`. Replace `signIn()` / `getSession()` with your real provider (e.g. SAML/OIDC against Marist SSO). The cookie name is `tsh_session`.
- **Suitable** — `src/lib/integrations/suitable/client.ts`. `isSuitableMockMode()` gates the mock; implement the real HTTP calls and surface live `lastSyncAt`.
- **Database** — UI reads from `store`. Point the store accessors (or the pages/API routes) at Prisma to go fully live.

---

## Security note

This project pins **Next.js 15.5.4**. Track advisory **CVE-2025-66478** and upgrade when a patched release on the 15.x line (or a vetted 16.x migration) is available. Upgrading to Next 16 currently requires moving to ESLint 9.

---

## License

Internal demo / educational use.
