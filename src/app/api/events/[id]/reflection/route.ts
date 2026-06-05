import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/mockAuth";
import { mutations } from "@/lib/data/store";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { content?: string };
  if (!body.content?.trim()) {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }
  const reflection = mutations.addReflection(id, body.content.trim());
  return NextResponse.json(reflection);
}
