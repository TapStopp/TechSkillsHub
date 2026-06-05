"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandMark } from "@/components/PublicHeader";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function signIn() {
    setLoading(true);
    try {
      await fetch("/api/auth/mock-login", { method: "POST" });
      router.push("/dashboard");
      router.refresh();
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-700 to-brand-900 p-12 text-white lg:flex">
        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <Link href="/">
          <BrandMark light />
        </Link>
        <div>
          <h1 className="font-serif text-4xl font-bold leading-tight">
            Your campus journey,<br />amplified.
          </h1>
          <p className="mt-4 max-w-md text-brand-100">
            Sign in to track events, earn badges, follow skill pathways, and build a
            career-ready portfolio — all in one place.
          </p>
          <div className="mt-8 space-y-3">
            {["Unified events & check-in", "XP, badges & leaderboard", "Credentials & mentorship"].map(
              (t) => (
                <div key={t} className="flex items-center gap-2 text-sm">
                  <Icon name="check" className="h-4 w-4 text-gold-400" /> {t}
                </div>
              ),
            )}
          </div>
        </div>
        <p className="text-xs text-brand-200">
          © {new Date().getFullYear()} Marist College CSM
        </p>
      </div>

      {/* Right login form */}
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <Link href="/">
              <BrandMark />
            </Link>
          </div>
          <h2 className="mt-8 font-serif text-2xl font-bold text-slate-900">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Sign in with your Marist credentials to continue.
          </p>

          <div className="mt-8 space-y-3">
            <Button
              size="lg"
              className="w-full justify-center"
              onClick={signIn}
              disabled={loading}
            >
              <Icon name="shield" className="h-5 w-5" />
              {loading ? "Signing in…" : "Continue with Marist SSO"}
            </Button>

            <div className="relative py-2 text-center">
              <span className="relative z-10 bg-white px-3 text-xs uppercase tracking-wide text-slate-400">
                demo mode
              </span>
              <span className="absolute inset-x-0 top-1/2 -z-0 h-px bg-slate-200" />
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
              <p className="font-medium text-slate-700">Mock SSO is active</p>
              <p className="mt-1">
                Clicking sign in logs you in as <strong>Ava Thompson</strong> (CS
                &apos;27), a seeded demo student. Real Marist/Suitable SSO can be swapped
                in later.
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            By continuing you agree to the demo terms.{" "}
            <Link href="/" className="text-brand-600 hover:underline">
              Back home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
