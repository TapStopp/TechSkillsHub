import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Avatar } from "@/components/ui/Avatar";
import { Pill } from "@/components/ui/Pill";
import { Icon } from "@/components/Icon";
import { EventCard } from "@/components/EventCard";
import { BadgeCard } from "@/components/BadgeCard";
import { IntegrationStatusCard } from "@/components/IntegrationStatusCard";
import { ButtonLink } from "@/components/ui/Button";
import { getSession } from "@/lib/auth/mockAuth";
import { store } from "@/lib/data/store";
import { levelFromXp, timeAgo } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = session.user;
  const profile = store.getProfile(user.id)!;
  const xpInfo = levelFromXp(profile.totalXp);

  const events = store.getEvents();
  const upcoming = [...events]
    .filter((e) => new Date(e.startsAt) >= new Date(Date.now() - 86400000))
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt))
    .slice(0, 2);

  const userBadges = store.getUserBadges().filter((ub) => ub.progress >= 100);
  const recentBadges = userBadges
    .slice(0, 3)
    .map((ub) => ({ badge: store.getBadge(ub.badgeId)!, ub }));

  const pathways = store.getPathways();
  const pathwayProgress = store.getPathwayProgress();
  const activePathways = pathwayProgress
    .filter((p) => p.status === "IN_PROGRESS")
    .map((p) => ({ pathway: pathways.find((x) => x.id === p.pathwayId)!, progress: p }))
    .slice(0, 2);

  const leaderboard = store
    .getLeaderboardUserIds()
    .map((id, i) => ({ user: store.getUser(id)!, profile: store.getProfile(id)!, rank: i + 1 }))
    .slice(0, 5);
  const myRank = store.getLeaderboardUserIds().indexOf(user.id) + 1;

  const xp = store.getXp().slice(0, 5);

  return (
    <>
      <PageHeader
        title={`Welcome back, ${user.name.split(" ")[0]} 👋`}
        description={`${profile.major} · Class of ${profile.gradYear} · ${profile.careerTrack} track`}
        action={
          <ButtonLink href="/events" size="sm">
            <Icon name="calendar" className="h-4 w-4" /> Browse events
          </ButtonLink>
        }
      />

      {/* Stat row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total XP"
          value={profile.totalXp.toLocaleString()}
          icon="zap"
          tone="gold"
          hint={`Level ${xpInfo.level}`}
        />
        <StatCard
          label="Badges earned"
          value={userBadges.length}
          icon="award"
          tone="brand"
          hint={`${store.getBadges().length} available`}
        />
        <StatCard
          label="Leaderboard rank"
          value={myRank > 0 ? `#${myRank}` : "—"}
          icon="trophy"
          tone="blue"
          hint="CSM this month"
        />
        <StatCard
          label="Service hours"
          value={profile.serviceHours}
          icon="heart"
          tone="green"
          hint="This semester"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Upcoming events */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-slate-900">
                Upcoming events
              </h2>
              <Link href="/events" className="text-sm font-medium text-brand-600 hover:underline">
                View all
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {upcoming.map((e) => (
                <EventCard
                  key={e.id}
                  event={e}
                  rsvped={store.hasRsvp(e.id)}
                  orgName={e.orgId ? store.getOrganizations().find((o) => o.id === e.orgId)?.name : undefined}
                />
              ))}
            </div>
          </section>

          {/* Active pathways */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-slate-900">
                Your pathways
              </h2>
              <Link href="/pathways" className="text-sm font-medium text-brand-600 hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {activePathways.map(({ pathway, progress }) => {
                const pct = Math.round(
                  (progress.completedSteps / pathway.steps.length) * 100,
                );
                return (
                  <Card key={pathway.id}>
                    <CardBody>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                            <Icon name="route" className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="font-semibold text-slate-900">{pathway.title}</p>
                            <p className="text-xs text-slate-500">
                              {progress.completedSteps} of {pathway.steps.length} steps ·{" "}
                              {pathway.estimatedHours}h
                            </p>
                          </div>
                        </div>
                        <Pill tone="gold">{pct}%</Pill>
                      </div>
                      <div className="mt-3">
                        <ProgressBar value={pct} tone="brand" />
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Recent badges */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-slate-900">
                Recently earned badges
              </h2>
              <Link href="/badges" className="text-sm font-medium text-brand-600 hover:underline">
                View all
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {recentBadges.map(({ badge, ub }) => (
                <BadgeCard key={badge.id} badge={badge} earned progress={ub.progress} />
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Level ring */}
          <Card>
            <CardBody className="flex flex-col items-center text-center">
              <ProgressRing
                value={xpInfo.percent}
                size={132}
                label={`Lv ${xpInfo.level}`}
                sublabel={`${xpInfo.current}/${xpInfo.needed} XP`}
                color="#a4123f"
              />
              <p className="mt-3 text-sm text-slate-500">
                {xpInfo.needed - xpInfo.current} XP to level {xpInfo.level + 1}
              </p>
              <ButtonLink href="/events" variant="outline" size="sm" className="mt-3">
                Earn more XP
              </ButtonLink>
            </CardBody>
          </Card>

          {/* Leaderboard */}
          <Card>
            <CardHeader
              title="CSM Leaderboard"
              action={
                <Link href="/leaderboard" className="text-xs font-medium text-brand-600 hover:underline">
                  Full board
                </Link>
              }
            />
            <CardBody className="space-y-2 pt-0">
              {leaderboard.map(({ user: u, profile: p, rank }) => (
                <div
                  key={u.id}
                  className={`flex items-center gap-3 rounded-lg px-2 py-1.5 ${
                    u.id === user.id ? "bg-brand-50" : ""
                  }`}
                >
                  <span
                    className={`w-6 text-center text-sm font-bold ${
                      rank <= 3 ? "text-brand-600" : "text-slate-400"
                    }`}
                  >
                    {rank}
                  </span>
                  <Avatar name={u.name} color={u.avatarColor} size={30} />
                  <span className="flex-1 truncate text-sm font-medium text-slate-700">
                    {u.name}
                    {u.id === user.id && " (you)"}
                  </span>
                  <span className="text-sm font-semibold text-amber-600">
                    {p.totalXp.toLocaleString()}
                  </span>
                </div>
              ))}
            </CardBody>
          </Card>

          {/* Integration status */}
          <IntegrationStatusCard />

          {/* Recent activity */}
          <Card>
            <CardHeader title="Recent activity" />
            <CardBody className="space-y-3 pt-0">
              {xp.map((tx) => (
                <div key={tx.id} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                    <Icon name="zap" className="h-3.5 w-3.5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-slate-700">{tx.reason}</p>
                    <p className="text-xs text-slate-400">{timeAgo(tx.createdAt)}</p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600">
                    +{tx.amount}
                  </span>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
