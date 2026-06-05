import Link from "next/link";
import { redirect } from "next/navigation";
import { PublicHeader, BrandMark } from "@/components/PublicHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { getSession } from "@/lib/auth/mockAuth";

const features = [
  {
    icon: "calendar",
    title: "Unified Event Hub",
    body: "Discover workshops, tech talks, hackathons, and career fairs. RSVP and check in via QR, mobile, or remote — synced from Suitable.",
  },
  {
    icon: "trophy",
    title: "Gamified Engagement",
    body: "Earn XP and badges for participation. Climb the CSM leaderboard and turn co-curricular involvement into momentum.",
  },
  {
    icon: "route",
    title: "Guided Pathways",
    body: "Follow curated tracks for software, data, cyber, and more — each step mapped to skills employers actually want.",
  },
  {
    icon: "badge-check",
    title: "Industry Credentials",
    body: "Browse certifications filtered by major and career track. Track your progress from Saved to Completed.",
  },
  {
    icon: "handshake",
    title: "Mentorship & Interviews",
    body: "Connect with faculty, alumni, and industry partners. Book mock interviews and request research or internship guidance.",
  },
  {
    icon: "file-text",
    title: "Co-Curricular Transcript",
    body: "Auto-generate a verified record of events, leadership, service hours, badges, and credentials for your portfolio.",
  },
];

const steps = [
  { n: "01", title: "Sign in with Marist SSO", body: "One click. Your CSM identity, securely connected." },
  { n: "02", title: "Engage & earn", body: "Attend events, complete pathways, and rack up XP and badges." },
  { n: "03", title: "Showcase & launch", body: "Build a portfolio and transcript that get you hired." },
];

const tracks = ["Software Engineering", "Data Science", "Cybersecurity", "AI / ML", "Cloud & DevOps", "Product"];

export default async function LandingPage() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 via-white to-gold-400/10" />
        <div className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700 ring-1 ring-inset ring-brand-200">
              <Icon name="sparkles" className="h-4 w-4" /> Marist School of Computer Science &amp; Mathematics
            </span>
            <h1 className="mt-5 font-serif text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Turn campus involvement into{" "}
              <span className="text-brand-600">career-ready</span> skills.
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              TechSkillsHub unifies events, gamified engagement, skill pathways,
              credentials, and mentorship into one platform — purpose-built for CSM
              students.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/login" size="lg">
                Continue with Marist SSO
                <Icon name="arrow-right" className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href="#features" variant="outline" size="lg">
                Explore features
              </ButtonLink>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="shield" className="h-4 w-4 text-emerald-500" /> Suitable-integrated
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="users" className="h-4 w-4 text-brand-500" /> 1,200+ students
              </span>
            </div>
          </div>

          {/* Hero card mock */}
          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card-hover">
              <div className="flex items-center justify-between">
                <BrandMark />
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                  Level 7
                </span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { label: "XP", value: "4,820", icon: "zap", tone: "text-amber-600" },
                  { label: "Badges", value: "12", icon: "award", tone: "text-brand-600" },
                  { label: "Events", value: "27", icon: "calendar", tone: "text-blue-600" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-slate-50 p-3 text-center">
                    <Icon name={s.icon} className={`mx-auto h-5 w-5 ${s.tone}`} />
                    <p className="mt-1 text-lg font-bold text-slate-900">{s.value}</p>
                    <p className="text-xs text-slate-400">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-slate-100 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">Cybersecurity Pathway</span>
                  <span className="text-slate-400">68%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-brand-500 to-brand-700" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-brand-50 p-3 text-sm text-brand-700">
                <Icon name="trophy" className="h-4 w-4" />
                Ranked #4 on the CSM leaderboard this month
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-slate-900">
            Everything CSM students need, in one place
          </h2>
          <p className="mt-3 text-slate-600">
            Eight integrated modules that bridge co-curricular engagement and
            professional readiness.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon name={f.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-serif text-3xl font-bold text-slate-900">
            How it works
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-2xl bg-white p-6 shadow-card">
                <span className="font-serif text-4xl font-bold text-brand-100">{s.n}</span>
                <h3 className="mt-2 font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section id="tracks" className="mx-auto max-w-6xl px-4 py-20">
        <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-12 text-white">
          <h2 className="font-serif text-3xl font-bold">Built for every career track</h2>
          <p className="mt-2 max-w-2xl text-brand-100">
            Personalized recommendations across the disciplines CSM students pursue.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {tracks.map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium ring-1 ring-inset ring-white/20"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/login" variant="secondary" size="lg">
              Get started free
              <Icon name="arrow-right" className="h-5 w-5" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-500 sm:flex-row">
          <BrandMark />
          <p>© {new Date().getFullYear()} Marist College · School of Computer Science &amp; Mathematics</p>
          <Link href="/login" className="font-medium text-brand-600 hover:underline">
            Sign in
          </Link>
        </div>
      </footer>
    </div>
  );
}
