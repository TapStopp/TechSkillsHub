# Phase 7 — Admin panel

## Goal

Give CSM admins a secure interface to manage the taxonomy, learning content, and
assessments without touching the database directly.

## Scope

- Admin-only area gated by the `ADMIN` role.
- CRUD for skills, categories, learning paths, courses, modules, and assessments.
- Content authoring for modules (markdown) and assessment questions.
- Basic publish/unpublish (draft vs. live) workflow.

## Tasks

1. Add an `/admin` route group protected by RBAC middleware.
2. Build CRUD interfaces for skills and categories.
3. Build CRUD for learning paths, courses, and modules with ordering controls.
4. Build the assessment authoring UI (questions, choices, correct answers, threshold).
5. Add a `status` (DRAFT | PUBLISHED) field across content entities and filter
   public views to published content only.
6. Add audit logging for create/update/delete actions.

## Data model additions

```prisma
// Add to content models: status String @default("DRAFT")

model AuditLog {
  id        String   @id @default(cuid())
  actorId   String
  action    String   // CREATE | UPDATE | DELETE
  entity    String
  entityId  String
  diff      Json?
  createdAt DateTime @default(now())

  @@index([entity, entityId])
}
```

## Deliverables

- Role-gated admin panel with full content CRUD.
- Draft/publish workflow and audit logging.

## Acceptance criteria

- Only `ADMIN` users can access `/admin`.
- Admins can create and edit all content types and see changes reflected publicly
  only after publishing.
- Every mutating action writes an audit log entry.

## Dependencies

- Phase 1 (RBAC) and Phase 2 (data model must be stable); can run in parallel
  with Phases 3–6 once the schema settles.
