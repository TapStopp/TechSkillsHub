import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { CreateEventForm } from "@/components/CreateEventForm";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Pill } from "@/components/ui/Pill";
import { categoryLabels } from "@/components/EventCard";
import { store } from "@/lib/data/store";
import { formatDate } from "@/lib/utils";
import type { EventItem } from "@/lib/types";

export default function OrgAdminPage() {
  const events = store
    .getEvents()
    .slice()
    .sort((a, b) => +new Date(b.startsAt) - +new Date(a.startsAt));

  const totalRsvps = events.reduce((s, e) => s + e.rsvpCount, 0);
  const avgFill = Math.round(
    (events.reduce((s, e) => s + e.rsvpCount / e.capacity, 0) / Math.max(1, events.length)) *
      100,
  );

  const columns: Column<EventItem>[] = [
    {
      header: "Event",
      cell: (e) => (
        <div>
          <p className="font-medium text-slate-900">{e.title}</p>
          <p className="text-xs text-slate-400">{e.location}</p>
        </div>
      ),
    },
    {
      header: "Category",
      cell: (e) => <Pill tone="slate">{categoryLabels[e.category]}</Pill>,
    },
    { header: "Date", cell: (e) => formatDate(e.startsAt) },
    {
      header: "RSVPs",
      cell: (e) => (
        <span className="font-medium text-slate-700">
          {e.rsvpCount}/{e.capacity}
        </span>
      ),
    },
    {
      header: "Fill",
      cell: (e) => {
        const pct = Math.round((e.rsvpCount / e.capacity) * 100);
        return (
          <Pill tone={pct > 80 ? "green" : pct > 50 ? "gold" : "slate"}>{pct}%</Pill>
        );
      },
    },
  ];

  return (
    <>
      <PageHeader
        title="Organization Admin"
        description="Create events, manage engagement, and review participation analytics."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total events" value={events.length} icon="calendar" tone="brand" />
        <StatCard label="Total RSVPs" value={totalRsvps} icon="users" tone="blue" />
        <StatCard label="Avg. fill rate" value={`${avgFill}%`} icon="target" tone="green" />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2 h-fit">
          <CardHeader title="Create event" subtitle="Publish to the CSM events feed" />
          <CardBody>
            <CreateEventForm />
          </CardBody>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader title="Your events" subtitle={`${events.length} total`} />
          <CardBody className="pt-0">
            <DataTable columns={columns} rows={events} getKey={(e) => e.id} />
          </CardBody>
        </Card>
      </div>
    </>
  );
}
