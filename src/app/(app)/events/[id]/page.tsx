import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Icon } from "@/components/Icon";
import { categoryLabels } from "@/components/EventCard";
import { RsvpButton, CheckInButton, ReflectionForm } from "@/components/EventActions";
import { store } from "@/lib/data/store";
import { formatDate, formatTimeRange } from "@/lib/utils";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = store.getEvent(id);
  if (!event) notFound();

  const org = event.orgId
    ? store.getOrganizations().find((o) => o.id === event.orgId)
    : undefined;
  const rsvped = store.hasRsvp(event.id);
  const checkedIn = store.hasCheckedIn(event.id);
  const badges = event.badgeIds.map((b) => store.getBadge(b)).filter(Boolean);
  const pctFull = Math.round((event.rsvpCount / event.capacity) * 100);
  const isPast = new Date(event.endsAt) < new Date();

  return (
    <>
      <Link
        href="/events"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-600"
      >
        <Icon name="arrow-right" className="h-4 w-4 rotate-180" /> Back to events
      </Link>

      <PageHeader
        title={event.title}
        action={
          <div className="flex items-center gap-2">
            <RsvpButton eventId={event.id} initialRsvped={rsvped} />
            {(rsvped || isPast) && (
              <CheckInButton eventId={event.id} initialCheckedIn={checkedIn} />
            )}
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardBody>
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="brand">{categoryLabels[event.category]}</Pill>
                {event.isRemote && <Pill tone="slate">Remote</Pill>}
                {event.isCsmSpecific && <Pill tone="purple">CSM</Pill>}
                {event.competencyTag && <Pill tone="teal">{event.competencyTag}</Pill>}
              </div>
              <p className="mt-4 leading-relaxed text-slate-600">{event.description}</p>

              <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2">
                <Info icon="calendar" label="Date">
                  {formatDate(event.startsAt, { weekday: "long" })}
                </Info>
                <Info icon="clock" label="Time">
                  {formatTimeRange(event.startsAt, event.endsAt)}
                </Info>
                <Info icon="map-pin" label="Location">
                  {event.location}
                </Info>
                <Info icon="users" label="Hosted by">
                  {org ? (
                    <Link href={`/clubs/${org.slug}`} className="text-brand-600 hover:underline">
                      {org.name}
                    </Link>
                  ) : (
                    "Marist CSM"
                  )}
                </Info>
              </dl>
            </CardBody>
          </Card>

          {/* Reflection */}
          {(checkedIn || isPast) && (
            <Card>
              <CardHeader title="Post-event reflection" subtitle="Earn +20 XP for reflecting" />
              <CardBody>
                <ReflectionForm eventId={event.id} />
              </CardBody>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-amber-50 p-4">
                <div className="flex items-center gap-2 text-amber-700">
                  <Icon name="zap" className="h-5 w-5" />
                  <span className="font-semibold">Reward</span>
                </div>
                <span className="text-lg font-bold text-amber-700">+{event.xpReward} XP</span>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">Capacity</span>
                  <span className="text-slate-400">
                    {event.rsvpCount}/{event.capacity}
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700"
                    style={{ width: `${pctFull}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-400">{pctFull}% full</p>
              </div>
            </CardBody>
          </Card>

          {badges.length > 0 && (
            <Card>
              <CardHeader title="Badges available" />
              <CardBody className="space-y-3 pt-0">
                {badges.map((b) => (
                  <div key={b!.id} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <Icon name={b!.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{b!.name}</p>
                      <p className="text-xs text-slate-400 capitalize">{b!.tier} tier</p>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

function Info({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <div>
        <dt className="text-xs text-slate-400">{label}</dt>
        <dd className="text-sm font-medium text-slate-700">{children}</dd>
      </div>
    </div>
  );
}
