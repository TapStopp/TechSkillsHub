// Prisma client singleton. Used for the "real database" path.
// The demo UI reads from src/lib/data/store.ts so it runs without a live DB, but
// this client is wired up for migrations, seeding, and future real queries.
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
