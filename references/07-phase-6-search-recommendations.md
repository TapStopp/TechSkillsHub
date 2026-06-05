# Phase 6 — Search and recommendations

## Goal

Help students find relevant skills, paths, and assessments quickly, and suggest
logical next steps based on their goals and current progress.

## Scope

- Global search across skills, paths, courses, and assessments.
- Faceted filtering (category, level, content type).
- Rule-based recommendations for "next skill" and "next path".
- Foundation for semantic recommendations (pgvector) as a later enhancement.

## Tasks

1. Add Postgres full-text search indexes across searchable entities.
2. Build a global search UI with results grouped by type and facet filters.
3. Implement a recommendations service with transparent, rule-based logic
   (e.g., gaps between current skills and a target path's required skills).
4. Surface recommendations on the dashboard and skill/path pages.
5. (Stretch) Add pgvector embeddings for semantic "related content".

## Data model additions

```prisma
// Full-text search via generated tsvector columns + GIN indexes
// (managed in migrations rather than the Prisma schema where needed)

model Recommendation {
  id        String   @id @default(cuid())
  userId    String
  kind      String   // NEXT_SKILL | NEXT_PATH | RELATED
  refId     String
  reason    String
  score     Float
  createdAt DateTime @default(now())

  @@index([userId, kind])
}
```

## Deliverables

- Working global search with facets.
- Rule-based, explainable recommendations surfaced in key locations.

## Acceptance criteria

- Search returns relevant results across all content types with filters.
- Each recommendation includes a human-readable reason.
- Recommendations update as the student's skills and progress change.

## Dependencies

- Phases 2–5 (content and progress data to search and recommend over).
