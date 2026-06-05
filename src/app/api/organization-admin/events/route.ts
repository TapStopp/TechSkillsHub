import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/mockAuth";
import { mutations } from "@/lib/data/store";
import type { EventCategory } from "@/lib/types";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user.role === "STUDENT") {
    // Demo: still allow, but flag. Real app would gate on ORG_LEADER/ADMIN.
  }
  const body = (await req.json().catch(() => ({}))) as {
    title?: string;
    description?: string;
    category?: EventCategory;
    startsAt?: string;
    location?: string;
    xpReward?: number;
  };
  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Title required" }, { status: 400 });
  }
  const created = mutations.createAdminEvent({
    title: body.title.trim(),
    description: body.description,
    category: body.category,
    startsAt: body.startsAt,
    location: body.location,
    xpReward: body.xpReward,
  });
  return NextResponse.json(created, { status: 201 });
}
