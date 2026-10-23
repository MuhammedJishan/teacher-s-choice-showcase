import { Link } from "@tanstack/react-router";
import type { ComponentType, ReactNode } from "react";
import { ArrowRight, Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DisasterModule } from "@/lib/data";

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-teal">{eyebrow}</p>}
        <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

const tones = {
  teal: "bg-teal-soft text-teal",
  indigo: "bg-indigo-soft text-indigo",
  amber: "bg-amber-soft text-amber",
  navy: "bg-secondary text-navy",
} as const;
export type Tone = keyof typeof tones;
export const toneClass = (t: Tone) => tones[t];

export function StatCard({ label, value, hint, icon: Icon, tone = "teal" }: { label: string; value: ReactNode; hint?: string; icon: ComponentType<{ className?: string }>; tone?: Tone }) {
  return (
    <div className="surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span className={cn("grid size-9 place-items-center rounded-xl", tones[tone])}>
          <Icon className="size-[18px]" />
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-semibold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function Panel({ title, action, children, className }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("surface p-6", className)}>
      {(title || action) && (
        <div className="mb-5 flex items-center justify-between gap-3">
          {title && <h2 className="text-base font-semibold">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Bar({ value, tone = "teal", className }: { value: number; tone?: "teal" | "indigo" | "amber" | "brand"; className?: string }) {
  const fill = { teal: "bg-teal", indigo: "bg-indigo", amber: "bg-amber", brand: "bg-gradient-brand" }[tone];
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div className={cn("h-full rounded-full transition-all duration-700", fill)} style={{ width: `${value}%` }} />
    </div>
  );
}

export function Ring({ value, size = 120, label }: { value: number; size?: number; label?: string }) {
  const r = (size - 14) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--teal)" />
            <stop offset="100%" stopColor="var(--indigo)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--muted)" strokeWidth="10" fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke="url(#ringGrad)" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (value / 100) * c} className="transition-all duration-1000" />
      </svg>
      <div className="absolute text-center">
        <p className="font-display text-2xl font-semibold">{value}%</p>
        {label && <p className="text-[11px] text-muted-foreground">{label}</p>}
      </div>
    </div>
  );
}

export function StatusPill({ status }: { status: DisasterModule["status"] }) {
  return status === "available" ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-2.5 py-1 text-xs font-semibold text-teal">
      <span className="size-1.5 rounded-full bg-teal" /> Available
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-muted-foreground">
      <Lock className="size-3" /> Coming Soon
    </span>
  );
}

export function ModuleCard({ module, base, progress }: { module: DisasterModule; base: "/student/modules" | "/teacher/modules"; progress?: number }) {
  const available = module.status === "available";
  return (
    <Link
      to={`${base}/$slug`}
      params={{ slug: module.slug }}
      className="group surface flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img src={module.image} alt={module.name} loading="lazy" width={1024} height={768} className={cn("size-full object-cover transition-transform duration-500 group-hover:scale-105", !available && "opacity-80 grayscale-[35%]")} />
        <div className="absolute left-3 top-3"><StatusPill status={module.status} /></div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold">{module.name}</h3>
        <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{module.description}</p>
        {available && progress !== undefined && (
          <div className="mt-4">
            <div className="mb-1.5 flex justify-between text-xs"><span className="text-muted-foreground">Progress</span><span className="font-semibold">{progress}%</span></div>
            <Bar value={progress} tone="brand" />
          </div>
        )}
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{module.lessons} lessons{!available && module.eta ? ` · ${module.eta}` : ""}</span>
          <span className={cn("inline-flex items-center gap-1 font-semibold", available ? "text-teal" : "text-indigo")}>
            {available ? "Open" : "Preview"} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ComingSoonModule({ module }: { module: DisasterModule }) {
  return (
    <div className="space-y-6">
      <div className="surface grid overflow-hidden md:grid-cols-2">
        <img src={module.image} alt={module.name} width={1024} height={768} className="size-full object-cover" />
        <div className="flex flex-col justify-center p-8">
          <StatusPill status={module.status} />
          <h1 className="mt-4 text-3xl font-semibold">{module.name}</h1>
          <p className="mt-3 text-muted-foreground">{module.description}</p>
          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-indigo-soft p-4 text-sm">
            <Sparkles className="size-5 shrink-0 text-indigo" />
            <span>Expected availability: <b>{module.eta}</b> · {module.lessons} lessons and interactive simulations planned.</span>
          </div>
        </div>
      </div>
      <Panel title="What you will learn">
        <ul className="grid gap-3 sm:grid-cols-2">
          {module.objectives.map((o, i) => (
            <li key={o} className="flex gap-3 rounded-xl border p-4 text-sm">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-indigo-soft font-display text-xs font-semibold text-indigo">{i + 1}</span>
              {o}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
