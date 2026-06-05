import { PageHeader } from "@/components/PageHeader";
import { PortfolioManager } from "@/components/PortfolioManager";
import { Card, CardBody } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Pill } from "@/components/ui/Pill";
import { getSession } from "@/lib/auth/mockAuth";
import { store } from "@/lib/data/store";
import { redirect } from "next/navigation";

export default async function PortfolioPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const profile = store.getProfile(session.user.id)!;
  const items = store.getPortfolio();

  return (
    <>
      <PageHeader
        title="My Portfolio"
        description="Showcase your projects, links, and achievements to employers."
      />

      <Card className="mb-6">
        <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Avatar name={session.user.name} color={session.user.avatarColor} size={64} />
          <div className="flex-1">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              {session.user.name}
            </h2>
            <p className="text-sm text-slate-500">
              {profile.major} · Class of {profile.gradYear} · {profile.careerTrack}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {profile.interests.map((i) => (
                <Pill key={i} tone="slate">
                  {i}
                </Pill>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      <PortfolioManager initialItems={items} />
    </>
  );
}
