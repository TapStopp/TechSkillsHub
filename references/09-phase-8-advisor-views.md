# Phase 8 — Faculty / advisor skill-gap views

## Goal

Give faculty and advisors visibility into cohort and advisee skill gaps so they can
guide students toward the right paths and close workforce-readiness gaps.

## Scope

- Faculty-only views gated by the `FACULTY` role.
- Cohort / group definitions (by major, graduation year, or advisor assignment).
- Skill-gap analysis: required vs. attained skills across a group.
- Per-student drill-down and path recommendations for advisees.

## Tasks

1. Add advisor-to-student relationships and/or cohort grouping.
2. Build a faculty dashboard summarizing skill coverage across a selected group.
3. Implement gap analysis comparing a target skill profile to group attainment.
4. Build per-student drill-down with progress and recommended paths.
5. Add export (CSV) of cohort skill-gap summaries for reporting.
6. Respect privacy: faculty see only their advisees / authorized cohorts.

## Data model additions

```prisma
model Cohort {
  id       String   @id @default(cuid())
  name     String
  major    String?
  gradYear Int?
  members  CohortMember[]
}

model CohortMember {
  id       String  @id @default(cuid())
  cohortId String
  userId   String

  @@unique([cohortId, userId])
}

model AdvisorAssignment {
  id        String  @id @default(cuid())
  advisorId String
  studentId String

  @@unique([advisorId, studentId])
}
```

## Deliverables

- Faculty dashboard with cohort skill-gap analysis and student drill-down.
- CSV export for grant reporting and advising.

## Acceptance criteria

- Faculty can view aggregate skill coverage for their authorized groups.
- Gap analysis highlights missing/under-attained skills clearly.
- Drill-down shows an individual student's progress and suggested paths.
- A faculty member cannot view students outside their authorization.

## Dependencies

- Phase 5 (progress data) and Phase 1 (RBAC, profiles).
