import { Icon } from "@/components/Icon";
import { getSuitableConfig } from "@/lib/integrations/suitable/client";
import { formatDate } from "@/lib/utils";

export function IntegrationStatusCard() {
  const config = getSuitableConfig();
  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Icon name="sparkles" className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-semibold text-slate-900">Suitable API</h3>
            <p className="text-xs text-slate-500">Co-curricular integration</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-200">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
          {config.mockMode ? "Mock Mode" : "Live"}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-white p-3 ring-1 ring-inset ring-slate-100">
          <dt className="text-xs text-slate-400">Last sync</dt>
          <dd className="font-medium text-slate-700">
            {formatDate(config.lastSyncAt, { hour: "numeric", minute: "2-digit" })}
          </dd>
        </div>
        <div className="rounded-lg bg-white p-3 ring-1 ring-inset ring-slate-100">
          <dt className="text-xs text-slate-400">Records synced</dt>
          <dd className="font-medium text-slate-700">1,284</dd>
        </div>
        <div className="rounded-lg bg-white p-3 ring-1 ring-inset ring-slate-100">
          <dt className="text-xs text-slate-400">Endpoint</dt>
          <dd className="truncate font-medium text-slate-700">{config.baseUrl}</dd>
        </div>
        <div className="rounded-lg bg-white p-3 ring-1 ring-inset ring-slate-100">
          <dt className="text-xs text-slate-400">Status</dt>
          <dd className="font-medium text-emerald-600">Healthy</dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-slate-400">
        Mock stubs return seeded data. Swap in real REST calls in
        <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-[11px]">
          lib/integrations/suitable/client.ts
        </code>
        when credentials are available.
      </p>
    </div>
  );
}
