"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import type { MentorshipKind, MentorshipOpportunity, User } from "@/lib/types";

const kindLabels: Record<MentorshipKind, string> = {
  RESEARCH: "Research",
  INTERNSHIP: "Internship",
  PORTFOLIO_REVIEW: "Portfolio Review",
  CAREER_GUIDANCE: "Career Guidance",
  MOCK_INTERVIEW: "Mock Interview",
};

export function MentorCard({
  opportunity,
  mentor,
  applied: appliedInitial,
}: {
  opportunity: MentorshipOpportunity;
  mentor: User;
  applied: boolean;
}) {
  const toast = useToast();
  const [applied, setApplied] = useState(appliedInitial);
  const [loading, setLoading] = useState(false);

  async function apply() {
    setLoading(true);
    try {
      const res = await fetch(`/api/mentorship/${opportunity.id}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "I'd love to connect!" }),
      });
      if (!res.ok) throw new Error();
      setApplied(true);
      toast(`Application sent to ${mentor.name}`);
    } catch {
      toast("Could not send application", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-start gap-3">
        <Avatar name={mentor.name} color={mentor.avatarColor} size={48} />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-slate-900">{mentor.name}</h3>
          <p className="text-sm text-slate-500">
            {mentor.title}
            {mentor.company ? ` · ${mentor.company}` : ""}
          </p>
        </div>
        <Pill tone="brand">{kindLabels[opportunity.kind]}</Pill>
      </div>

      <h4 className="mt-3 font-medium text-slate-800">{opportunity.title}</h4>
      <p className="mt-1 text-sm text-slate-500">{opportunity.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {opportunity.expertise.map((e) => (
          <span
            key={e}
            className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600"
          >
            {e}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
        <span className="inline-flex items-center gap-1 text-slate-500">
          <Icon name="clock" className="h-4 w-4 text-slate-400" />
          {opportunity.availability}
        </span>
        {applied ? (
          <Pill tone="green">
            <Icon name="check" className="h-3 w-3" /> Applied
          </Pill>
        ) : (
          <Button size="sm" onClick={apply} disabled={loading}>
            {loading ? "Sending…" : "Request"}
            <Icon name="handshake" className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
