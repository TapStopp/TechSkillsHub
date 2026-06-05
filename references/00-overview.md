# TechSkillsHub — Build Plan Overview

## Product summary

TechSkillsHub is a SPARK Grant-funded web platform for Marist University's School of
Computer Science and Mathematics (CSM). It is a centralized computing career-readiness
hub that helps CSM students discover, track, and showcase the skills and experiences
needed to succeed in the technology workforce.

## Primary users

- **Students** — discover skills, follow learning paths, take assessments, track
  progress, and build a shareable skills profile.
- **Faculty / advisors** — view team and cohort skill gaps, recommend paths.
- **Admins** — manage the skills taxonomy, learning content, and assessments.

## Target stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router, TypeScript) |
| ORM | Prisma |
| Database | PostgreSQL (Vercel Postgres / Neon) |
| Auth | SSO via NextAuth (OIDC; Marist / Microsoft Entra ID) |
| Styling | Tailwind CSS + shadcn/ui |
| Hosting | Vercel |
| Search | Postgres full-text search (v1), pgvector for recommendations (later) |

## V1 feature set

- User authentication (SSO) and student profiles
- Skills catalog / taxonomy
- Learning paths and courses
- Assessments and quizzes
- Progress tracking and dashboards
- Admin panel for content management
- Faculty / advisor skill-gap views
- Search and recommendations

## Phase index

| Phase | Title | Outcome |
| --- | --- | --- |
| 0 | [Foundations and project setup](01-phase-0-foundations.md) | Running Next.js app deployed to Vercel with DB |
| 1 | [Authentication and profiles](02-phase-1-auth-profiles.md) | SSO login and editable student profiles |
| 2 | [Skills catalog and taxonomy](03-phase-2-skills-catalog.md) | Browsable, categorized skills catalog |
| 3 | [Learning paths and courses](04-phase-3-learning-paths.md) | Curated paths linking skills to content |
| 4 | [Assessments and quizzes](05-phase-4-assessments.md) | Skill-validating quizzes with scoring |
| 5 | [Progress tracking and dashboards](06-phase-5-progress-dashboards.md) | Personal progress and analytics |
| 6 | [Search and recommendations](07-phase-6-search-recommendations.md) | Find content and get suggested next steps |
| 7 | [Admin panel](08-phase-7-admin-panel.md) | Manage taxonomy, content, and assessments |
| 8 | [Faculty / advisor skill-gap views](09-phase-8-advisor-views.md) | Cohort and team skill-gap analysis |
| 9 | [Hardening, accessibility, and launch](10-phase-9-hardening-launch.md) | Production-ready, accessible, monitored |

## Sequencing notes

- Phases 0–2 are foundational and should ship in order.
- Phases 3–6 build on the skills taxonomy and can partly overlap.
- Phase 7 (admin) can begin in parallel once the data model stabilizes (after Phase 2).
- Phase 8 depends on progress data from Phase 5.
- Phase 9 runs continuously but is gated before public launch.

## Cross-cutting conventions

- TypeScript strict mode; ESLint + Prettier enforced in CI.
- All data access through Prisma; no raw SQL except documented exceptions.
- Server Components by default; Client Components only when interactivity is required.
- Role-based access control (RBAC): `STUDENT`, `FACULTY`, `ADMIN`.
- Accessibility (WCAG 2.1 AA) and responsive design are requirements, not phases.
- Each phase defines its own acceptance criteria and is demoable on Vercel preview.
