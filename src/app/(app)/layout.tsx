import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { getSession } from "@/lib/auth/mockAuth";
import { store } from "@/lib/data/store";
import { levelFromXp } from "@/lib/utils";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const profile = store.getProfile(session.userId);
  const totalXp = profile?.totalXp ?? 0;
  const { level } = levelFromXp(totalXp);

  return (
    <AppShell user={session.user} level={level} totalXp={totalXp}>
      {children}
    </AppShell>
  );
}
