import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 font-serif text-lg font-bold text-white">
        M
      </span>
      <span className={light ? "text-white" : "text-slate-900"}>
        <span className="font-serif text-lg font-bold leading-none">TechSkillsHub</span>
        <span className="block text-[10px] font-medium uppercase tracking-wide text-brand-500">
          Marist CSM
        </span>
      </span>
    </span>
  );
}

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" aria-label="TechSkillsHub home">
          <BrandMark />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <a href="#features" className="hover:text-brand-700">
            Features
          </a>
          <a href="#how" className="hover:text-brand-700">
            How it works
          </a>
          <a href="#tracks" className="hover:text-brand-700">
            Career tracks
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href="/login" variant="ghost" size="sm">
            Sign in
          </ButtonLink>
          <ButtonLink href="/login" size="sm">
            Get started
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
