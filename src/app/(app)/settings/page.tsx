import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Pill } from "@/components/ui/Pill";
import { Icon } from "@/components/Icon";
import { getSession } from "@/lib/auth/mockAuth";
import { store } from "@/lib/data/store";
import { isMockSsoMode } from "@/lib/auth/mockAuth";
import { isSuitableMockMode } from "@/lib/integrations/suitable/client";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const profile = store.getProfile(session.user.id)!;

  const toggles = [
    { label: "Event reminders", desc: "Get notified before events you RSVP'd to", on: true },
    { label: "Badge alerts", desc: "Celebrate when you earn a new badge", on: true },
    { label: "Leaderboard updates", desc: "Weekly digest of your rank", on: false },
    { label: "Mentorship matches", desc: "New opportunities in your track", on: true },
  ];

  return (
    <>
      <PageHeader title="Settings" description="Manage your profile, notifications, and integrations." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader title="Profile" />
            <CardBody className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar name={session.user.name} color={session.user.avatarColor} size={56} />
                <div>
                  <p className="font-semibold text-slate-900">{session.user.name}</p>
                  <p className="text-sm text-slate-500">{session.user.email}</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <ReadField label="Major" value={profile.major} />
                <ReadField label="Graduation year" value={String(profile.gradYear)} />
                <ReadField label="Career track" value={profile.careerTrack} />
                <ReadField label="Role" value={session.user.role} />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Notifications" />
            <CardBody className="space-y-1">
              {toggles.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center justify-between rounded-lg px-2 py-3 hover:bg-slate-50"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">{t.label}</p>
                    <p className="text-xs text-slate-500">{t.desc}</p>
                  </div>
                  <span
                    className={`flex h-6 w-11 items-center rounded-full p-0.5 transition ${
                      t.on ? "bg-brand-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`h-5 w-5 rounded-full bg-white shadow transition ${
                        t.on ? "translate-x-5" : ""
                      }`}
                    />
                  </span>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Integrations" />
            <CardBody className="space-y-3">
              <IntegrationRow
                name="Marist SSO"
                status={isMockSsoMode() ? "Mock" : "Live"}
                icon="shield"
              />
              <IntegrationRow
                name="Suitable API"
                status={isSuitableMockMode() ? "Mock" : "Live"}
                icon="sparkles"
              />
              <p className="text-xs text-slate-400">
                Mock integrations are isolated and can be swapped for production
                services without UI changes.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Account" />
            <CardBody>
              <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                <Icon name="shield" className="h-4 w-4 text-emerald-500" />
                Your data is securely managed by Marist CSM.
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

function ReadField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-medium text-slate-700">{value}</p>
    </div>
  );
}

function IntegrationRow({
  name,
  status,
  icon,
}: {
  name: string;
  status: string;
  icon: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <Icon name={icon} className="h-4 w-4" />
        </span>
        {name}
      </span>
      <Pill tone={status === "Live" ? "green" : "amber"}>{status}</Pill>
    </div>
  );
}
