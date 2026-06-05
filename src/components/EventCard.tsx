import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Pill } from "@/components/ui/Pill";
import { formatDate, formatTimeRange } from "@/lib/utils";
import type { EventCategory, EventItem } from "@/lib/types";

export const categoryLabels: Record<EventCategory, string> = {
  WORKSHOP: "Workshop",
  CAREER_FAIR: "Career Fair",
  TECH_TALK: "Tech Talk",
  HACKATHON: "Hackathon",
  CLUB_MEETING: "Club Meeting",
  INTERVIEW_PREP: "Interview Prep",
  NETWORKING: "Networking",
  SERVICE: "Service",
  SOCIAL: "Social",
};

const categoryTone: Record<EventCategory, Parameters<typeof Pill>[0]["tone"]> = {
  WORKSHOP: "blue",
  CAREER_FAIR: "brand",
  TECH_TALK: "purple",
  HACKATHON: "gold",
  CLUB_MEETING: "slate",
  INTERVIEW_PREP: "teal",
  NETWORKING: "green",
  SERVICE: "amber",
  SOCIAL: "slate",
};

export function EventCard({
  event,
  rsvped,
  orgName,
}: {
  event: EventItem;
  rsvped?: boolean;
  orgName?: string;
}) {
  const pctFull = Math.round((event.rsvpCount / event.capacity) * 100);
  return (
    <Link
      href={`/events/${event.id}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between gap-3">
        <Pill tone={categoryTone[event.category]}>{categoryLabels[event.category]}</Pill>
        <div className="flex items-center gap-2">
          {event.isRemote && <Pill tone="slate">Remote</Pill>}
          {rsvped && (
            <Pill tone="green">
              <Icon name="check" className="h-3 w-3" /> RSVP&apos;d
            </Pill>
          )}
        </div>
      </div>

      <h3 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-brand-700">
        {event.title}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-slate-500">{event.description}</p>

      <div className="mt-4 space-y-1.5 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Icon name="calendar" className="h-4 w-4 text-slate-400" />
          {formatDate(event.startsAt, { weekday: "short" })} ·{" "}
          {formatTimeRange(event.startsAt, event.endsAt)}
        </div>
        <div className="flex items-center gap-2">
          <Icon name="map-pin" className="h-4 w-4 text-slate-400" />
          {event.location}
        </div>
        {orgName && (
          <div className="flex items-center gap-2">
            <Icon name="users" className="h-4 w-4 text-slate-400" />
            {orgName}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600">
          <Icon name="zap" className="h-4 w-4" /> +{event.xpReward} XP
        </span>
        <span className="text-xs text-slate-400">
          {event.rsvpCount}/{event.capacity} going · {pctFull}% full
        </span>
      </div>
    </Link>
  );
}
