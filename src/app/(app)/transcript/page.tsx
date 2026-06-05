import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { TranscriptPreview } from "@/components/TranscriptPreview";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { getSession } from "@/lib/auth/mockAuth";
import { store } from "@/lib/data/store";
import { redirect } from "next/navigation";

export default async function TranscriptPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const profile = store.getProfile(session.user.id)!;
  const entries = store
    .getTranscript()
    .slice()
    .sort((a, b) => +new Date(b.occurredAt) - +new Date(a.occurredAt));

  const totalHours = entries.reduce((s, e) => s + e.hours, 0);
  const leadership = entries.filter((e) => e.category === "LEADERSHIP").length;
  const credentials = entries.filter((e) => e.category === "CREDENTIAL").length;

  return (
    <>
      <PageHeader
        title="Co-Curricular Transcript"
        description="A verified record of your engagement, leadership, and achievements."
        action={
          <Button variant="outline" size="sm">
            <Icon name="file-text" className="h-4 w-4" /> Export PDF
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total activities" value={entries.length} icon="calendar" tone="brand" />
        <StatCard label="Service hours" value={totalHours} icon="heart" tone="green" />
        <StatCard label="Leadership roles" value={leadership} icon="megaphone" tone="gold" />
        <StatCard label="Credentials" value={credentials} icon="badge-check" tone="purple" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Activity timeline" subtitle="Most recent first" />
          <CardBody>
            <TranscriptPreview entries={entries} />
          </CardBody>
        </Card>

        <Card className="h-fit">
          <CardHeader title="Student summary" />
          <CardBody className="space-y-3 text-sm">
            <Row label="Name" value={session.user.name} />
            <Row label="Major" value={profile.major} />
            <Row label="Class of" value={String(profile.gradYear)} />
            <Row label="Career track" value={profile.careerTrack} />
            <Row label="Total XP" value={profile.totalXp.toLocaleString()} />
            <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
              {profile.summary}
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-slate-700">{value}</span>
    </div>
  );
}
