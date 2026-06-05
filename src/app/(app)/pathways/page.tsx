import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Icon } from "@/components/Icon";
import { store } from "@/lib/data/store";

const statusTone = {
  NOT_STARTED: "slate",
  IN_PROGRESS: "gold",
  COMPLETED: "green",
} as const;

const statusLabel = {
  NOT_STARTED: "Not started",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
} as const;

export default function PathwaysPage() {
  const pathways = store.getPathways();
  const progress = store.getPathwayProgress();

  return (
    <>
      <PageHeader
        title="Skill Pathways"
        description="Curated, step-by-step tracks that build the skills employers want."
      />
      <div className="space-y-5">
        {pathways.map((pathway) => {
          const p = progress.find((x) => x.pathwayId === pathway.id);
          const completed = p?.completedSteps ?? 0;
          const status = p?.status ?? "NOT_STARTED";
          const pct = Math.round((completed / pathway.steps.length) * 100);

          return (
            <Card key={pathway.id}>
              <CardBody>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon name="route" className="h-6 w-6" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900">{pathway.title}</h3>
                        <Pill tone={statusTone[status]}>{statusLabel[status]}</Pill>
                      </div>
                      <p className="mt-1 max-w-2xl text-sm text-slate-500">
                        {pathway.description}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {pathway.category} · {pathway.estimatedHours} hours ·{" "}
                        {pathway.steps.length} steps
                      </p>
                    </div>
                  </div>
                  <div className="w-full shrink-0 sm:w-44">
                    <ProgressBar value={pct} tone="brand" showLabel />
                  </div>
                </div>

                <ol className="mt-5 grid gap-2 border-t border-slate-100 pt-4 sm:grid-cols-2">
                  {pathway.steps.map((step, i) => {
                    const done = i < completed;
                    return (
                      <li key={step.id} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                            done
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {done ? <Icon name="check" className="h-3.5 w-3.5" /> : i + 1}
                        </span>
                        <div>
                          <p
                            className={`text-sm font-medium ${
                              done ? "text-slate-400 line-through" : "text-slate-700"
                            }`}
                          >
                            {step.title}
                          </p>
                          <p className="text-xs text-slate-400">{step.detail}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </>
  );
}
