// Prisma seed — populates a real PostgreSQL database for the "live DB" path.
//
// The clickable demo runs off the in-memory store (src/lib/data/store.ts) and does
// NOT require this. Use this when you wire a real database:
//   1. Set DATABASE_URL in .env
//   2. npx prisma migrate dev --name init
//   3. npx prisma db seed   (configured via package.json -> prisma.seed)
//
// This file is excluded from `next build` type-checking (see tsconfig "exclude")
// and is executed with tsx.
import { PrismaClient } from "@prisma/client";
import {
  badges,
  competencies,
  credentials,
  events,
  mentorshipOpportunities,
  organizations,
  pathways,
  portfolioItems,
  studentProfiles,
  transcriptEntries,
  userBadges,
  userCompetencyProgress,
  userCredentials,
  userPathwayProgress,
  users,
  xpTransactions,
} from "../src/lib/data/seed-data";
import { levelFromXp } from "../src/lib/utils";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding TechSkillsHub database…");

  // Wipe (dev only) in dependency-safe order.
  await prisma.xpTransaction.deleteMany();
  await prisma.transcriptEntry.deleteMany();
  await prisma.interviewBooking.deleteMany();
  await prisma.interviewSlot.deleteMany();
  await prisma.mentorshipApplication.deleteMany();
  await prisma.mentorshipOpportunity.deleteMany();
  await prisma.portfolioItem.deleteMany();
  await prisma.userCredential.deleteMany();
  await prisma.credential.deleteMany();
  await prisma.userCompetencyProgress.deleteMany();
  await prisma.competency.deleteMany();
  await prisma.userPathwayProgress.deleteMany();
  await prisma.pathwayStep.deleteMany();
  await prisma.pathway.deleteMany();
  await prisma.userBadge.deleteMany();
  await prisma.reflection.deleteMany();
  await prisma.checkIn.deleteMany();
  await prisma.rsvp.deleteMany();
  await prisma.event.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.user.deleteMany();

  // Users
  for (const u of users) {
    await prisma.user.create({
      data: {
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        avatarColor: u.avatarColor,
        title: u.title,
        company: u.company,
      },
    });
  }

  // Student profiles
  for (const p of studentProfiles) {
    await prisma.studentProfile.create({
      data: {
        userId: p.userId,
        major: p.major,
        gradYear: p.gradYear,
        careerTrack: p.careerTrack,
        interests: p.interests,
        summary: p.summary,
        totalXp: p.totalXp,
        level: levelFromXp(p.totalXp).level,
        serviceHours: p.serviceHours,
      },
    });
  }

  // Organizations
  for (const o of organizations) {
    await prisma.organization.create({
      data: {
        id: o.id,
        name: o.name,
        slug: o.slug,
        description: o.description,
        category: o.category,
        logoColor: o.logoColor,
        memberCount: o.memberCount,
      },
    });
  }

  // Badges
  for (const b of badges) {
    await prisma.badge.create({
      data: {
        id: b.id,
        name: b.name,
        description: b.description,
        category: b.category,
        icon: b.icon,
        tier: b.tier,
        xpValue: b.xpValue,
      },
    });
  }

  // Events (+ badge relations)
  for (const e of events) {
    await prisma.event.create({
      data: {
        id: e.id,
        title: e.title,
        description: e.description,
        category: e.category,
        startsAt: new Date(e.startsAt),
        endsAt: new Date(e.endsAt),
        location: e.location,
        isRemote: e.isRemote,
        capacity: e.capacity,
        xpReward: e.xpReward,
        isCsmSpecific: e.isCsmSpecific,
        orgId: e.orgId,
        competencyTag: e.competencyTag,
        badges: e.badgeIds.length
          ? { connect: e.badgeIds.map((id) => ({ id })) }
          : undefined,
      },
    });
  }

  // User badges
  for (const ub of userBadges) {
    await prisma.userBadge.create({
      data: {
        userId: users[0].id,
        badgeId: ub.badgeId,
        progress: ub.progress,
        earnedAt: new Date(ub.earnedAt),
      },
    });
  }

  // Pathways + steps + progress
  for (const pw of pathways) {
    await prisma.pathway.create({
      data: {
        id: pw.id,
        title: pw.title,
        slug: pw.slug,
        description: pw.description,
        category: pw.category,
        estimatedHours: pw.estimatedHours,
        steps: {
          create: pw.steps.map((s) => ({
            id: s.id,
            title: s.title,
            detail: s.detail,
            order: s.order,
          })),
        },
      },
    });
  }
  for (const pp of userPathwayProgress) {
    await prisma.userPathwayProgress.create({
      data: {
        userId: users[0].id,
        pathwayId: pp.pathwayId,
        status: pp.status,
        completedSteps: pp.completedSteps,
      },
    });
  }

  // Competencies + progress
  for (const c of competencies) {
    await prisma.competency.create({
      data: {
        id: c.id,
        name: c.name,
        framework: c.framework,
        description: c.description,
        category: c.category,
      },
    });
  }
  for (const cp of userCompetencyProgress) {
    await prisma.userCompetencyProgress.create({
      data: {
        userId: users[0].id,
        competencyId: cp.competencyId,
        level: cp.level,
        percent: cp.percent,
      },
    });
  }

  // Credentials + user status
  for (const cr of credentials) {
    await prisma.credential.create({
      data: {
        id: cr.id,
        name: cr.name,
        provider: cr.provider,
        careerTrack: cr.careerTrack,
        major: cr.major,
        cost: cr.cost,
        difficulty: cr.difficulty,
        duration: cr.duration,
        modality: cr.modality,
        description: cr.description,
        url: cr.url,
      },
    });
  }
  for (const uc of userCredentials) {
    await prisma.userCredential.create({
      data: {
        userId: users[0].id,
        credentialId: uc.credentialId,
        status: uc.status,
      },
    });
  }

  // Portfolio
  for (const pf of portfolioItems) {
    await prisma.portfolioItem.create({
      data: {
        id: pf.id,
        userId: users[0].id,
        title: pf.title,
        type: pf.type,
        url: pf.url,
        description: pf.description,
        isPublic: pf.isPublic,
      },
    });
  }

  // Mentorship opportunities
  for (const m of mentorshipOpportunities) {
    await prisma.mentorshipOpportunity.create({
      data: {
        id: m.id,
        mentorId: m.mentorId,
        kind: m.kind,
        title: m.title,
        description: m.description,
        careerTrack: m.careerTrack,
        expertise: m.expertise,
        availability: m.availability,
        isOpen: m.isOpen,
      },
    });
  }

  // Transcript
  for (const t of transcriptEntries) {
    await prisma.transcriptEntry.create({
      data: {
        id: t.id,
        userId: users[0].id,
        category: t.category,
        title: t.title,
        detail: t.detail,
        hours: t.hours,
        occurredAt: new Date(t.occurredAt),
      },
    });
  }

  // XP
  for (const x of xpTransactions) {
    await prisma.xpTransaction.create({
      data: {
        id: x.id,
        userId: users[0].id,
        amount: x.amount,
        reason: x.reason,
        createdAt: new Date(x.createdAt),
      },
    });
  }

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
