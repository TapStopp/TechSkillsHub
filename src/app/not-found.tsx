import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <Icon name="search" className="h-8 w-8" />
      </span>
      <h1 className="mt-6 font-serif text-3xl font-bold text-slate-900">
        Page not found
      </h1>
      <p className="mt-2 max-w-sm text-slate-500">
        We couldn&apos;t find what you were looking for. It may have moved or no longer
        exists.
      </p>
      <div className="mt-6 flex gap-3">
        <ButtonLink href="/dashboard">Go to dashboard</ButtonLink>
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-brand-600 hover:underline"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
