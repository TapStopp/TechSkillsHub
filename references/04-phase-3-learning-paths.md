# Phase 3 — Learning paths and courses

## Goal

Connect skills to curated learning content so students have a clear, sequenced route
from "interested" to "job-ready" for each computing career track.

## Scope

- Learning paths grouping ordered courses/modules toward a set of target skills.
- Course/module entities linking to internal or external content (videos, articles, labs).
- Enrollment and completion tracking at the module level.
- Path detail pages showing prerequisites, target skills, and progress.

## Tasks

1. Model `LearningPath`, `Course`, `Module`, and `Enrollment`.
2. Relate paths to target `Skill`s and order their courses/modules.
3. Build the path catalog and path detail pages with target-skill badges.
4. Implement enroll / unenroll and per-module "mark complete".
5. Show inline progress (modules completed / total) on path and profile.
6. Support external resource links and basic internal content (markdown lessons).

## Data model additions

```prisma
model LearningPath {
  id           String   @id @default(cuid())
  title        String
  slug         String   @unique
  summary      String?
  targetSkills Skill[]
  courses      Course[]
  createdAt    DateTime @default(now())
}

model Course {
  id      String   @id @default(cuid())
  pathId  String
  path    LearningPath @relation(fields: [pathId], references: [id])
  title   String
  order   Int
  modules Module[]
}

model Module {
  id          String  @id @default(cuid())
  courseId    String
  course      Course  @relation(fields: [courseId], references: [id])
  title       String
  order       Int
  contentType String  // VIDEO | ARTICLE | LAB | MARKDOWN
  contentUrl  String?
  body        String?
}

model Enrollment {
  id        String   @id @default(cuid())
  userId    String
  pathId    String
  status    String   @default("ACTIVE") // ACTIVE | COMPLETED | DROPPED
  createdAt DateTime @default(now())

  @@unique([userId, pathId])
}

model ModuleCompletion {
  id          String   @id @default(cuid())
  userId      String
  moduleId    String
  completedAt DateTime @default(now())

  @@unique([userId, moduleId])
}
```

## Deliverables

- Browsable learning paths with ordered courses and modules.
- Enrollment and module-level completion tracking.

## Acceptance criteria

- A student can enroll in a path and mark modules complete.
- Path detail shows target skills and accurate completion progress.
- Completing all modules marks the enrollment `COMPLETED`.

## Dependencies

- Phase 2 (skills taxonomy for target-skill links).
