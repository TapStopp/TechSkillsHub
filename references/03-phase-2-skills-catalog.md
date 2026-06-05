# Phase 2 — Skills catalog and taxonomy

## Goal

Establish the skills taxonomy that the entire platform revolves around — a browsable,
categorized catalog of computing skills students can discover and add to their profile.

## Scope

- Skill entity with categories, levels, and descriptions.
- Hierarchical taxonomy (category → subcategory → skill).
- Browse, filter, and skill detail pages.
- Students can add skills to their profile with a self-assessed level.

## Tasks

1. Model `Skill`, `SkillCategory`, and the `UserSkill` join with proficiency levels.
2. Seed an initial CSM-relevant taxonomy (e.g., Programming, Data, Cloud, Security, AI/ML).
3. Build the catalog browse page with category filters and search-by-name.
4. Build a skill detail page (description, related skills, linked paths/assessments).
5. Add "add to my skills" with a self-assessed proficiency selector.
6. Surface a student's selected skills on their profile.

## Data model additions

```prisma
model SkillCategory {
  id       String  @id @default(cuid())
  name     String  @unique
  parentId String?
  parent   SkillCategory?  @relation("CategoryTree", fields: [parentId], references: [id])
  children SkillCategory[] @relation("CategoryTree")
  skills   Skill[]
}

model Skill {
  id          String        @id @default(cuid())
  name        String        @unique
  slug        String        @unique
  description String?
  categoryId  String
  category    SkillCategory @relation(fields: [categoryId], references: [id])
  userSkills  UserSkill[]
}

model UserSkill {
  id          String   @id @default(cuid())
  userId      String
  skillId     String
  proficiency Int      @default(1) // 1-5 self-assessed
  createdAt   DateTime @default(now())

  @@unique([userId, skillId])
}
```

## Deliverables

- Seeded, browsable skills catalog with categories and detail pages.
- Ability for students to add skills and a proficiency level to their profile.

## Acceptance criteria

- Catalog lists skills grouped by category with working filters.
- A skill detail page renders description and relationships.
- A student can add/remove skills and set proficiency; changes persist.
- Selected skills appear on the student's profile.

## Dependencies

- Phase 1 (profiles, auth).
