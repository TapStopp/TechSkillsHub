"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import type { PortfolioItem } from "@/lib/types";

const typeMeta: Record<PortfolioItem["type"], { icon: string; tone: Parameters<typeof Pill>[0]["tone"] }> = {
  PROJECT: { icon: "folder", tone: "brand" },
  FILE: { icon: "file-text", tone: "slate" },
  LINK: { icon: "link", tone: "blue" },
  GITHUB: { icon: "link", tone: "purple" },
  LINKEDIN: { icon: "link", tone: "teal" },
};

export function PortfolioManager({ initialItems }: { initialItems: PortfolioItem[] }) {
  const router = useRouter();
  const toast = useToast();
  const [items, setItems] = useState(initialItems);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    type: "PROJECT" as PortfolioItem["type"],
    url: "",
    description: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, isPublic: true }),
      });
      if (!res.ok) throw new Error();
      const created = (await res.json()) as PortfolioItem;
      setItems((prev) => [created, ...prev]);
      setForm({ title: "", type: "PROJECT", url: "", description: "" });
      setOpen(false);
      toast("Portfolio item added");
      router.refresh();
    } catch {
      toast("Could not add item", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button size="sm" onClick={() => setOpen((o) => !o)}>
          <Icon name="plus" className="h-4 w-4" /> Add item
        </Button>
      </div>

      {open && (
        <form
          onSubmit={submit}
          className="mb-6 space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-card"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Title">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Weather forecasting app"
                className={inputCls}
              />
            </Field>
            <Field label="Type">
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value as PortfolioItem["type"] })
                }
                className={inputCls}
              >
                {Object.keys(typeMeta).map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0) + t.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="URL (optional)">
            <input
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="https://github.com/…"
              className={inputCls}
            />
          </Field>
          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              placeholder="What is it?"
              className={inputCls}
            />
          </Field>
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={saving || !form.title.trim()}>
              {saving ? "Saving…" : "Save item"}
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const meta = typeMeta[item.type];
          return (
            <div
              key={item.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-card"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={meta.icon} className="h-5 w-5" />
                </span>
                <div className="flex items-center gap-1.5">
                  <Pill tone={meta.tone}>{item.type}</Pill>
                  {item.isPublic && <Pill tone="green">Public</Pill>}
                </div>
              </div>
              <h3 className="mt-3 font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1 flex-1 text-sm text-slate-500">{item.description}</p>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline"
                >
                  <Icon name="link" className="h-4 w-4" /> View
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
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
