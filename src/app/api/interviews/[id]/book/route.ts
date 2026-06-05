import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/mockAuth";
import { mutations } from "@/lib/data/store";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const result = mutations.bookSlot(id);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Slot not found" }, { status: 404 });
  }
}
