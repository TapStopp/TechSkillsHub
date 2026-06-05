"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import type { CheckInMethod } from "@/lib/types";

export function RsvpButton({
  eventId,
  initialRsvped,
  size = "md",
}: {
  eventId: string;
  initialRsvped: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const router = useRouter();
  const toast = useToast();
  const [rsvped, setRsvped] = useState(initialRsvped);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}/rsvp`, { method: "POST" });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { rsvped: boolean };
      setRsvped(data.rsvped);
      toast(data.rsvped ? "You're going! 🎉" : "RSVP cancelled");
      router.refresh();
    } catch {
      toast("Could not update RSVP", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      size={size}
      variant={rsvped ? "outline" : "primary"}
      onClick={toggle}
      disabled={loading}
    >
      {rsvped ? (
        <>
          <Icon name="check" className="h-4 w-4" /> Going
        </>
      ) : (
        <>
          <Icon name="calendar" className="h-4 w-4" /> RSVP
        </>
      )}
    </Button>
  );
}

const methods: { value: CheckInMethod; label: string; icon: string }[] = [
  { value: "QR", label: "Scan QR", icon: "sparkles" },
  { value: "MOBILE", label: "Mobile", icon: "zap" },
  { value: "REMOTE", label: "Remote", icon: "footprints" },
];

export function CheckInButton({
  eventId,
  initialCheckedIn,
}: {
  eventId: string;
  initialCheckedIn: boolean;
}) {
  const router = useRouter();
  const toast = useToast();
  const [checkedIn, setCheckedIn] = useState(initialCheckedIn);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function checkIn(method: CheckInMethod) {
    setLoading(true);
    setOpen(false);
    try {
      const res = await fetch(`/api/events/${eventId}/check-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method }),
      });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { xpAwarded: number };
      setCheckedIn(true);
      toast(
        data.xpAwarded > 0
          ? `Checked in! +${data.xpAwarded} XP`
          : "Already checked in",
      );
      router.refresh();
    } catch {
      toast("Could not check in", "error");
    } finally {
      setLoading(false);
    }
  }

  if (checkedIn) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
        <Icon name="check" className="h-4 w-4" /> Checked in
      </span>
    );
  }

  return (
    <div className="relative">
      <Button variant="secondary" onClick={() => setOpen((o) => !o)} disabled={loading}>
        <Icon name="footprints" className="h-4 w-4" /> Check in
      </Button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-card-hover">
          <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Method
          </p>
          {methods.map((m) => (
            <button
              key={m.value}
              onClick={() => checkIn(m.value)}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50"
            >
              <Icon name={m.icon} className="h-4 w-4 text-brand-600" />
              {m.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ReflectionForm({ eventId }: { eventId: string }) {
  const router = useRouter();
  const toast = useToast();
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}/reflection`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      toast("Reflection saved · +20 XP");
      router.refresh();
    } catch {
      toast("Could not save reflection", "error");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700 ring-1 ring-inset ring-emerald-200">
        <p className="font-medium">Thanks for reflecting!</p>
        <p className="mt-1 text-emerald-600">{content}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        placeholder="What did you learn? How will you apply it?"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
      />
      <Button type="submit" disabled={loading || !content.trim()}>
        <Icon name="pen" className="h-4 w-4" /> Submit reflection
      </Button>
    </form>
  );
}
