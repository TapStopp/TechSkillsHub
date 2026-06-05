import { NextResponse } from "next/server";
import { getSuitableLeaderboard } from "@/lib/integrations/suitable/client";

export async function GET() {
  const leaderboard = await getSuitableLeaderboard();
  return NextResponse.json({ leaderboard });
}
