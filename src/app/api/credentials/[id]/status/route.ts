import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/mockAuth";
import { mutations } from "@/lib/data/store";
import type { CredentialStatus } from "@/lib/types";

const VALID: CredentialStatus[] = ["SAVED", "PLANNED", "IN_PROGRESS", "COMPLETED"];

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { status?: CredentialStatus };
  if (!body.status || !VALID.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const result = mutations.setCredentialStatus(id, body.status);
  return NextResponse.json(result);
}
