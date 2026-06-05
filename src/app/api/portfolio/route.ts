import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/mockAuth";
import { mutations } from "@/lib/data/store";
import type { PortfolioItem } from "@/lib/types";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as Partial<PortfolioItem>;
  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Title required" }, { status: 400 });
  }
  const created = mutations.addPortfolioItem({
    title: body.title.trim(),
    type: body.type ?? "PROJECT",
    url: body.url,
    description: body.description ?? "",
    isPublic: body.isPublic ?? true,
  });
  return NextResponse.json(created, { status: 201 });
}
