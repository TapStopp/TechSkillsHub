import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Icon } from "@/components/Icon";
import { store } from "@/lib/data/store";

export default function CompetenciesPage() {
  const competencies = store.getCompetencies();
  const progress = store.getCompetencyProgress();

  const grouped = competencies.reduce<Record<string, typeof competencies>>((acc, c) => {
    (acc[c.category] ??= []).push(c);
    return acc;
  }, {});

  const avg = Math.round(
    progress.reduce((s, p) => s + p.percent, 0) / Math.max(1, progress.length),
  );

  return (
    <>
      <PageHeader
        title="Competencies"
        description="Track your growth across NACE career-readiness and CSM-specific competencies."
        action={<Pill tone="brand">{avg}% overall</Pill>}
      />

      <div className="space-y-6">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h2 className="mb-3 font-serif text-lg font-bold text-slate-900">{category}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((c) => {
                const p = progress.find((x) => x.competencyId === c.id);
                const percent = p?.percent ?? 0;
                const level = p?.level ?? 0;
                return (
                  <Card key={c.id}>
                    <CardBody>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                            <Icon name="target" className="h-5 w-5" />
                          </span>
                          <div>
                            <h3 className="font-semibold text-slate-900">{c.name}</h3>
                            <Pill tone={c.framework === "NACE" ? "blue" : "purple"}>
                              {c.framework}
                            </Pill>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-slate-500">
                          Lv {level}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-500">{c.description}</p>
                      <div className="mt-3">
                        <ProgressBar value={percent} tone="brand" showLabel />
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
