import { PageHeader } from "@/components/PageHeader";
import { InterviewSlotCard } from "@/components/InterviewSlotCard";
import { Card, CardBody } from "@/components/ui/Card";
import { Icon } from "@/components/Icon";
import { store } from "@/lib/data/store";
import { formatDate, formatTimeRange } from "@/lib/utils";

export default function InterviewsPage() {
  const slots = store
    .getInterviewSlots()
    .slice()
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt));
  const booked = store.getBookedSlots();

  const available = slots.filter((s) => !store.isSlotBooked(s.id));

  return (
    <>
      <PageHeader
        title="Mock Interviews"
        description="Book practice interviews with industry partners and alumni to sharpen your skills."
      />

      {booked.length > 0 && (
        <Card className="mb-6 border-brand-200 bg-brand-50/40">
          <CardBody>
            <h2 className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
              <Icon name="check" className="h-5 w-5 text-emerald-600" /> Your booked sessions
            </h2>
            <ul className="space-y-2">
              {booked.map((s) => {
                const interviewer = store.getUser(s.interviewerId);
                const end = new Date(
                  new Date(s.startsAt).getTime() + s.durationMin * 60000,
                );
                return (
                  <li
                    key={s.id}
                    className="flex items-center justify-between rounded-lg bg-white px-4 py-2.5 text-sm shadow-card"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{s.topic}</p>
                      <p className="text-xs text-slate-500">
                        with {interviewer?.name} · {formatDate(s.startsAt, { weekday: "short" })},{" "}
                        {formatTimeRange(s.startsAt, end.toISOString())}
                      </p>
                    </div>
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
                      {s.modality}
                    </span>
                  </li>
                );
              })}
            </ul>
          </CardBody>
        </Card>
      )}

      <h2 className="mb-3 font-serif text-lg font-bold text-slate-900">Available slots</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {available.map((slot) => {
          const interviewer = store.getUser(slot.interviewerId);
          if (!interviewer) return null;
          return (
            <InterviewSlotCard
              key={slot.id}
              slot={slot}
              interviewer={interviewer}
              booked={false}
            />
          );
        })}
      </div>
    </>
  );
}
