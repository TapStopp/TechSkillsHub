import { PageHeader } from "@/components/PageHeader";
import { EventsBrowser, type BrowserEvent } from "@/components/EventsBrowser";
import { store } from "@/lib/data/store";

export default function EventsPage() {
  const orgs = store.getOrganizations();
  const items: BrowserEvent[] = store
    .getEvents()
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt))
    .map((event) => ({
      event,
      rsvped: store.hasRsvp(event.id),
      orgName: event.orgId ? orgs.find((o) => o.id === event.orgId)?.name : undefined,
    }));

  return (
    <>
      <PageHeader
        title="Events"
        description="Discover and RSVP to workshops, tech talks, hackathons, and more."
      />
      <EventsBrowser items={items} />
    </>
  );
}
