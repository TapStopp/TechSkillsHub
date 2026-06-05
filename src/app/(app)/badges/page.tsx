import { PageHeader } from "@/components/PageHeader";
import { BadgeCard } from "@/components/BadgeCard";
import { StatCard } from "@/components/StatCard";
import { store } from "@/lib/data/store";

export default function BadgesPage() {
  const badges = store.getBadges();
  const userBadges = store.getUserBadges();

  const merged = badges.map((badge) => {
    const ub = userBadges.find((u) => u.badgeId === badge.id);
    return { badge, earned: (ub?.progress ?? 0) >= 100, progress: ub?.progress ?? 0 };
  });

  const earned = merged.filter((m) => m.earned);
  const inProgress = merged.filter((m) => !m.earned);
  const totalXp = earned.reduce((sum, m) => sum + m.badge.xpValue, 0);

  return (
    <>
      <PageHeader
        title="Badges"
        description="Earn badges for participation, leadership, and skill milestones."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Badges earned" value={earned.length} icon="award" tone="brand" />
        <StatCard label="In progress" value={inProgress.length} icon="target" tone="gold" />
        <StatCard label="Badge XP" value={totalXp.toLocaleString()} icon="zap" tone="green" />
      </div>

      <h2 className="mb-3 font-serif text-lg font-bold text-slate-900">Earned</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {earned.map((m) => (
          <BadgeCard key={m.badge.id} badge={m.badge} earned progress={100} />
        ))}
      </div>

      <h2 className="mb-3 mt-8 font-serif text-lg font-bold text-slate-900">
        In progress
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {inProgress.map((m) => (
          <BadgeCard key={m.badge.id} badge={m.badge} earned={false} progress={m.progress} />
        ))}
      </div>
    </>
  );
}
