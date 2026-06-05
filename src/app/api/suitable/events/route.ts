import { NextResponse } from "next/server";
import { getSuitableEvents } from "@/lib/integrations/suitable/client";

export async function GET() {
  const events = await getSuitableEvents();
  return NextResponse.json({ events });
}
