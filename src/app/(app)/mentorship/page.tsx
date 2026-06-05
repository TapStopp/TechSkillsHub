import { PageHeader } from "@/components/PageHeader";
import { MentorCard } from "@/components/MentorCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { store } from "@/lib/data/store";

export default function MentorshipPage() {
  const opportunities = store.getMentorshipOpportunities().filter((o) => o.isOpen);

  return (
    <>
      <PageHeader
        title="Mentorship"
        description="Connect with faculty, alumni, and industry partners for research, internships, and guidance."
      />
      {opportunities.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opp) => {
            const mentor = store.getUser(opp.mentorId);
            if (!mentor) return null;
            return (
              <MentorCard
                key={opp.id}
                opportunity={opp}
                mentor={mentor}
                applied={store.isAppliedTo(opp.id)}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="handshake"
          title="No open opportunities"
          description="Check back soon — mentors post new opportunities regularly."
        />
      )}
    </>
  );
}
