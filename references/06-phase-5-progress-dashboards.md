# Phase 5 — Progress tracking and dashboards

## Goal

Give students a single view of where they stand — skills gained, paths in progress,
assessments passed — and motivate continued engagement.

## Scope

- Personal student dashboard aggregating skills, enrollments, and assessment results.
- Visualizations: skill radar/coverage, path completion, activity over time.
- Milestones and achievement badges for key accomplishments.
- Activity feed of recent completions and verifications.

## Tasks

1. Build dashboard data aggregation (server-side queries/materialized views as needed).
2. Implement charts (e.g., skill coverage by category, completion percentages).
3. Add a milestones/achievements model and award logic on key events.
4. Build an activity feed of recent module completions and assessment passes.
5. Add a lightweight events table to power activity and time-series charts.

## Data model additions

```prisma
model Achievement {
  id          String   @id @default(cuid())
  userId      String
  type        String   // FIRST_SKILL | PATH_COMPLETE | ASSESSMENT_ACE | STREAK
  metadata    Json?
  awardedAt   DateTime @default(now())

  @@index([userId])
}

model ActivityEvent {
  id        String   @id @default(cuid())
  userId    String
  kind      String   // MODULE_COMPLETE | ASSESSMENT_PASS | SKILL_ADDED | ENROLL
  refId     String?
  createdAt DateTime @default(now())

  @@index([userId, createdAt])
}
```

## Deliverables

- A personal dashboard with skill, path, and assessment summaries.
- Achievement awards and an activity feed.

## Acceptance criteria

- Dashboard reflects accurate, real-time counts and percentages.
- Charts render and are responsive and accessible.
- Achievements are awarded once per qualifying event (idempotent).
- Activity feed lists recent events in reverse-chronological order.

## Dependencies

- Phases 2–4 (skills, paths, assessments produce the tracked data).
