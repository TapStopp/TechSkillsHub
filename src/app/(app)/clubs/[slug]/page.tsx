import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Icon } from "@/components/Icon";
import { EventCard } from "@/components/EventCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { store } from "@/lib/data/store";

export default async function ClubDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const org = store.getOrganization(slug);
  if (!org) notFound();

  const orgEvents = store
    .getEvents()
    .filter((e) => e.orgId === org.id)
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt));

  return (
    <>
      <Link
        href="/clubs"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-600"
      >
        <Icon name="arrow-right" className="h-4 w-4 rotate-180" /> Back to clubs
      </Link>

      <Card className="mb-6 overflow-hidden">
        <div className="h-24" style={{ backgroundColor: org.logoColor }} />
        <CardBody className="relative">
          <span
            className="absolute -top-10 flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white font-serif text-2xl font-bold text-white shadow-card"
            style={{ backgroundColor: org.logoColor }}
          >
            {org.name.charAt(0)}
          </span>
          <div className="ml-24">
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-slate-900">{org.name}</h1>
              <Pill tone="slate">{org.category}</Pill>
            </div>
            <p className="mt-1 text-slate-500">{org.description}</p>
            <div className="mt-3 flex items-center gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1">
                <Icon name="users" className="h-4 w-4 text-slate-400" /> {org.memberCount}{" "}
                members
              </span>
              <span className="inline-flex items-center gap-1">
                <Icon name="calendar" className="h-4 w-4 text-slate-400" />{" "}
                {orgEvents.length} events
              </span>
            </div>
          </div>
        </CardBody>
      </Card>

      <PageHeader title="Upcoming events" />
      {orgEvents.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orgEvents.map((e) => (
            <EventCard key={e.id} event={e} rsvped={store.hasRsvp(e.id)} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="calendar"
          title="No events scheduled"
          description="This organization hasn't posted any upcoming events yet."
        />
      )}
    </>
  );
}
