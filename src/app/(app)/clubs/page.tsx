import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Icon } from "@/components/Icon";
import { Pill } from "@/components/ui/Pill";
import { store } from "@/lib/data/store";

export default function ClubsPage() {
  const orgs = store.getOrganizations();
  const events = store.getEvents();

  return (
    <>
      <PageHeader
        title="Clubs & Organizations"
        description="Explore CSM student organizations and the events they host."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {orgs.map((org) => {
          const eventCount = events.filter((e) => e.orgId === org.id).length;
          return (
            <Link
              key={org.id}
              href={`/clubs/${org.slug}`}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl font-serif text-lg font-bold text-white"
                  style={{ backgroundColor: org.logoColor }}
                >
                  {org.name.charAt(0)}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-brand-700">
                    {org.name}
                  </h3>
                  <Pill tone="slate">{org.category}</Pill>
                </div>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-slate-500">{org.description}</p>
              <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-3 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <Icon name="users" className="h-4 w-4 text-slate-400" />
                  {org.memberCount} members
                </span>
                <span className="inline-flex items-center gap-1">
                  <Icon name="calendar" className="h-4 w-4 text-slate-400" />
                  {eventCount} events
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
