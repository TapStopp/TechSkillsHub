# Phase 4 — Assessments and quizzes

## Goal

Let students validate skills through assessments that produce evidence-backed
proficiency, replacing pure self-assessment with measured results.

## Scope

- Quiz/assessment entity tied to one or more skills.
- Question bank with multiple question types (multiple choice, true/false, multi-select).
- Attempt flow with scoring, pass thresholds, and result history.
- Verified proficiency updates on `UserSkill` when an assessment is passed.

## Tasks

1. Model `Assessment`, `Question`, `Choice`, and `AssessmentAttempt`.
2. Build the quiz-taking UI with timer (optional), navigation, and submit.
3. Implement server-side scoring and pass/fail evaluation.
4. On pass, set a `verified` flag and proficiency on the related `UserSkill`.
5. Show attempt history and best score on the assessment and profile.
6. Prevent answer leakage (grade on the server; never expose correct answers client-side).

## Data model additions

```prisma
model Assessment {
  id            String     @id @default(cuid())
  title         String
  slug          String     @unique
  skillId       String
  passThreshold Int        @default(70) // percent
  questions     Question[]
}

model Question {
  id           String   @id @default(cuid())
  assessmentId String
  assessment   Assessment @relation(fields: [assessmentId], references: [id])
  prompt       String
  type         String   // SINGLE | MULTI | TRUEFALSE
  choices      Choice[]
}

model Choice {
  id         String   @id @default(cuid())
  questionId String
  question   Question @relation(fields: [questionId], references: [id])
  text       String
  isCorrect  Boolean  @default(false)
}

model AssessmentAttempt {
  id           String   @id @default(cuid())
  userId       String
  assessmentId String
  score        Int
  passed       Boolean
  answers      Json
  createdAt    DateTime @default(now())
}
```

## Deliverables

- Skill-linked assessments with server-side scoring.
- Verified proficiency on `UserSkill` after a passing attempt.
- Attempt history surfaced to the student.

## Acceptance criteria

- A student can take an assessment and receive an accurate score.
- Correct answers are never sent to the client before submission.
- Passing an assessment marks the related skill verified on the profile.
- Attempt history and best score display correctly.

## Dependencies

- Phase 2 (skills) and ideally Phase 3 (paths can require assessments).
