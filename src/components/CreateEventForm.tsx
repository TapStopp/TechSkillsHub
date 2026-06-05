"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { categoryLabels } from "@/components/EventCard";
import type { EventCategory } from "@/lib/types";

export function CreateEventForm() {
  const router = useRouter();
  const toast = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "WORKSHOP" as EventCategory,
    location: "",
    startsAt: "",
    xpReward: 50,
    description: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/organization-admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          startsAt: form.startsAt ? new Date(form.startsAt).toISOString() : undefined,
        }),
      });
      if (!res.ok) throw new Error();
      toast("Event published 🎉");
      setForm({
        title: "",
        category: "WORKSHOP",
        location: "",
        startsAt: "",
        xpReward: 50,
        description: "",
      });
      router.refresh();
    } catch {
      toast("Could not create event", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Event title">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Intro to Cloud Computing"
            className={inputCls}
          />
        </Field>
        <Field label="Category">
          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value as EventCategory })
            }
            className={inputCls}
          >
            {Object.entries(categoryLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Location">
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Hancock Center 2023"
            className={inputCls}
          />
        </Field>
        <Field label="Date & time">
          <input
            type="datetime-local"
            value={form.startsAt}
            onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
            className={inputCls}
          />
        </Field>
        <Field label="XP reward">
          <input
            type="number"
            value={form.xpReward}
            onChange={(e) => setForm({ ...form, xpReward: Number(e.target.value) })}
            className={inputCls}
          />
        </Field>
      </div>
      <Field label="Description">
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          placeholder="What's the event about?"
          className={inputCls}
        />
      </Field>
      <Button type="submit" disabled={saving || !form.title.trim()}>
        <Icon name="plus" className="h-4 w-4" /> {saving ? "Publishing…" : "Publish event"}
      </Button>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-500">{label}</span>
      {children}
    </label>
  );
}
