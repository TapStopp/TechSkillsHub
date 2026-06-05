import { NextResponse } from "next/server";
import { signIn } from "@/lib/auth/mockAuth";

export async function POST() {
  await signIn();
  return NextResponse.json({ ok: true });
}
