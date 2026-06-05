# Phase 1 — Authentication and student profiles

## Goal

Let CSM users sign in with university SSO and manage a student profile that becomes
the anchor for skills, progress, and the shareable showcase.

## Scope

- SSO authentication via NextAuth using an OIDC provider (Marist / Microsoft Entra ID).
- Session handling, protected routes, and RBAC (`STUDENT`, `FACULTY`, `ADMIN`).
- Student profile: name, program/major, expected graduation, bio, links, avatar.
- Profile editing and a public/shareable read-only profile view.

## Tasks

1. Install and configure NextAuth with the OIDC provider and Prisma adapter.
2. Add sign-in / sign-out UI and a session provider in the app shell.
3. Implement middleware to protect authenticated routes and enforce roles.
4. Extend the data model with `Profile` and supporting fields.
5. Build the profile edit form (server actions) with validation (zod).
6. Build the public profile page (`/u/[handle]`) with privacy controls.
7. Map SSO claims (email domain, name) to first-login user provisioning.

## Data model additions

```prisma
model Profile {
  id          String   @id @default(cuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id])
  handle      String   @unique
  major       String?
  gradYear    Int?
  bio         String?
  avatarUrl   String?
  links       Json?
  isPublic    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Deliverables

- Working SSO login restricted to allowed Marist domains.
- Editable student profile and a shareable public profile page.
- Role-aware navigation and route protection.

## Acceptance criteria

- A new user signing in via SSO is provisioned with a `STUDENT` role and empty profile.
- Unauthenticated users are redirected from protected routes.
- A student can edit their profile and toggle public visibility.
- A public profile is viewable without login when set to public.

## Dependencies

- Phase 0 (foundations, DB, deployment).
