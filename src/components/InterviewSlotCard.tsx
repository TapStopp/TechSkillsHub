"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { formatDate, formatTimeRange } from "@/lib/utils";
import type { InterviewSlot, User } from "@/lib/types";

export function InterviewSlotCard({
  slot,
  interviewer,
  booked: bookedInitial,
}: {
  slot: InterviewSlot;
  interviewer: User;
  booked: boolean;
}) {
  const toast = useToast();
  const [booked, setBooked] = useState(bookedInitial);
  const [loading, setLoading] = useState(false);

  async function book() {
    setLoading(true);
    try {
      const res = await fetch(`/api/interviews/${slot.id}/book`, { method: "POST" });
      if (!res.ok) throw new Error();
      setBooked(true);
      toast(`Mock interview booked with ${interviewer.name}`);
    } catch {
      toast("Could not book slot", "error");
    } finally {
      setLoading(false);
    }
  }

  const end = new Date(new Date(slot.startsAt).getTime() + slot.durationMin * 60000);

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <Pill tone="teal">{slot.topic}</Pill>
        <Pill tone="slate">{slot.modality}</Pill>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Avatar name={interviewer.name} color={interviewer.avatarColor} size={40} />
        <div>
          <p className="font-medium text-slate-900">{interviewer.name}</p>
          <p className="text-xs text-slate-500">{interviewer.title}</p>
        </div>
      </div>
      <div className="mt-3 space-y-1 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Icon name="calendar" className="h-4 w-4 text-slate-400" />
          {formatDate(slot.startsAt, { weekday: "short" })}
        </div>
        <div className="flex items-center gap-2">
          <Icon name="clock" className="h-4 w-4 text-slate-400" />
          {formatTimeRange(slot.startsAt, end.toISOString())} · {slot.durationMin} min
        </div>
      </div>
      <div className="mt-4 border-t border-slate-100 pt-3">
        {booked ? (
          <Pill tone="green">
            <Icon name="check" className="h-3 w-3" /> Booked
          </Pill>
        ) : (
          <Button size="sm" className="w-full" onClick={book} disabled={loading}>
            {loading ? "Booking…" : "Book this slot"}
          </Button>
        )}
      </div>
    </div>
  );
}
