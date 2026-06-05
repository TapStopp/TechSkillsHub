import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Pill } from "@/components/ui/Pill";
import { Icon } from "@/components/Icon";
import { getSession } from "@/lib/auth/mockAuth";
import { store } from "@/lib/data/store";
import { levelFromXp } from "@/lib/utils";
import { redirect } from "next/navigation";

const medal = ["text-yellow-500", "text-slate-400", "text-amber-600"];

export default async function LeaderboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const rows = store
    .getLeaderboardUserIds()
    .map((id, i) => {
      const u = store.getUser(id)!;
      const p = store.getProfile(id)!;
      return { user: u, profile: p, rank: i + 1, level: levelFromXp(p.totalXp).level };
    })
    .sort((a, b) => b.profile.totalXp - a.profile.totalXp);

  const top3 = rows.slice(0, 3);
  const rest = rows.slice(3);

  return (
    <>
      <PageHeader
        title="CSM Leaderboard"
        description="See how you stack up against fellow Computer Science & Math students this month."
      />

      {/* Podium */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        {[top3[1], top3[0], top3[2]].filter(Boolean).map((r, idx) => {
          const place = r.rank;
          const heights = ["pt-8", "pt-2", "pt-10"];
          return (
            <Card key={r.user.id} className={idx === 1 ? "ring-2 ring-brand-200" : ""}>
              <CardBody className={`flex flex-col items-center text-center ${heights[idx]}`}>
                <div className="relative">
                  <Avatar name={r.user.name} color={r.user.avatarColor} size={idx === 1 ? 72 : 56} />
                  <span
                    className={`absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-card ${medal[place - 1]}`}
                  >
                    <Icon name="trophy" className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-3 font-semibold text-slate-900">{r.user.name}</p>
                <p className="text-xs text-slate-400">Level {r.level}</p>
                <p className="mt-1 text-lg font-bold text-amber-600">
                  {r.profile.totalXp.toLocaleString()}
                </p>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Rest of board */}
      <Card>
        <CardBody className="p-0">
          <ul className="divide-y divide-slate-100">
            {rest.map((r) => {
              const isMe = r.user.id === session.user.id;
              return (
                <li
                  key={r.user.id}
                  className={`flex items-center gap-4 px-5 py-3 ${isMe ? "bg-brand-50" : ""}`}
                >
                  <span className="w-6 text-center font-bold text-slate-400">{r.rank}</span>
                  <Avatar name={r.user.name} color={r.user.avatarColor} size={38} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      {r.user.name}
                      {isMe && <Pill tone="brand">You</Pill>}
                    </p>
                    <p className="text-xs text-slate-400">
                      {store.getProfile(r.user.id)?.major} · Level {r.level}
                    </p>
                  </div>
                  <span className="font-semibold text-amber-600">
                    {r.profile.totalXp.toLocaleString()} XP
                  </span>
                </li>
              );
            })}
          </ul>
        </CardBody>
      </Card>
    </>
  );
}
