import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/mockAuth";
import { mutations } from "@/lib/data/store";
import type { CheckInMethod } from "@/lib/types";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { method?: CheckInMethod };
  const method = body.method ?? "MANUAL";
  try {
    const result = mutations.checkIn(id, method);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
}
