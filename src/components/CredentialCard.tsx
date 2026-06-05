"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import type { Credential, CredentialStatus } from "@/lib/types";

const statusOptions: { value: CredentialStatus; label: string; tone: Parameters<typeof Pill>[0]["tone"] }[] = [
  { value: "SAVED", label: "Saved", tone: "slate" },
  { value: "PLANNED", label: "Planned", tone: "blue" },
  { value: "IN_PROGRESS", label: "In Progress", tone: "gold" },
  { value: "COMPLETED", label: "Completed", tone: "green" },
];

export function CredentialCard({
  credential,
  initialStatus,
}: {
  credential: Credential;
  initialStatus?: CredentialStatus;
}) {
  const toast = useToast();
  const [status, setStatus] = useState<CredentialStatus | undefined>(initialStatus);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  async function update(next: CredentialStatus) {
    setSaving(true);
    setOpen(false);
    try {
      const res = await fetch(`/api/credentials/${credential.id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus(next);
      toast(`${credential.name} marked ${next.replace("_", " ").toLowerCase()}`);
    } catch {
      toast("Could not update credential", "error");
    } finally {
      setSaving(false);
    }
  }

  const current = statusOptions.find((s) => s.value === status);

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
              {credential.provider}
            </span>
            <Pill tone="purple">{credential.careerTrack}</Pill>
          </div>
          <h3 className="mt-2 font-semibold text-slate-900">{credential.name}</h3>
        </div>
        {current && <Pill tone={current.tone}>{current.label}</Pill>}
      </div>

      <p className="mt-2 text-sm text-slate-500">{credential.description}</p>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <Detail icon="zap" label="Difficulty" value={credential.difficulty} />
        <Detail icon="clock" label="Duration" value={credential.duration} />
        <Detail icon="briefcase" label="Cost" value={credential.cost} />
        <Detail icon="graduation" label="Modality" value={credential.modality} />
      </dl>

      <div className="relative mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setOpen((o) => !o)}
          disabled={saving}
        >
          {status ? "Update status" : "Track credential"}
          <Icon name="arrow-right" className="h-4 w-4" />
        </Button>
        {credential.url && (
          <a
            href={credential.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline"
          >
            <Icon name="link" className="h-4 w-4" /> Provider
          </a>
        )}
        {open && (
          <div className="absolute bottom-12 left-0 z-10 w-48 rounded-xl border border-slate-200 bg-white p-1 shadow-card-hover">
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => update(opt.value)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                {opt.label}
                {status === opt.value && (
                  <Icon name="check" className="h-4 w-4 text-brand-600" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon name={icon} className="h-4 w-4 text-slate-400" />
      <span className="text-slate-400">{label}:</span>
      <span className="font-medium text-slate-700">{value}</span>
    </div>
  );
}
