import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, Presentation, Trophy, Zap, Target, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/app-shell";
import { modules } from "@/lib/data";
import { StatusPill } from "@/components/ui-kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ReadySphere — Gamified Disaster Preparedness for Schools" },
      { name: "description", content: "Learn, practise and master fire, earthquake, flood and cyclone preparedness through lessons, challenges and simulations." },
      { property: "og:title", content: "ReadySphere — Gamified Disaster Preparedness for Schools" },
      { property: "og:description", content: "Learn, practise and master disaster preparedness through lessons, challenges and simulations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-gradient-hero text-navy-foreground">
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-6">
          <header className="flex items-center justify-between">
            <Logo />
            <span className="hidden text-sm opacity-70 sm:block">Disaster Preparedness & Response Education System</span>
          </header>

          <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="inline-flex items-center gap-2 rounded-full border border-sidebar-border bg-sidebar-accent/60 px-3 py-1 text-xs font-semibold text-teal">
                <ShieldCheck className="size-3.5" /> For schools & colleges
              </span>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.08] sm:text-6xl">
                Be ready for <span className="text-gradient-brand">anything</span> — before it happens.
              </h1>
              <p className="mt-6 max-w-xl text-lg opacity-75">
                ReadySphere turns disaster preparedness into an engaging game of lessons, challenges and simulations — so students know exactly what to do when it matters.
              </p>
              <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
                {[
                  { icon: Zap, k: "XP & Levels" },
                  { icon: Target, k: "Simulations" },
                  { icon: Trophy, k: "Badges" },
                ].map(({ icon: I, k }) => (
                  <div key={k} className="rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-3 text-center text-xs">
                    <I className="mx-auto mb-1.5 size-5 text-amber" /> {k}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-sidebar-border bg-card p-8 text-card-foreground shadow-lift animate-in fade-in zoom-in-95 duration-700">
              <h2 className="text-2xl font-semibold">Welcome back</h2>
              <p className="mt-1 text-sm text-muted-foreground">Choose your role to enter the demo workspace.</p>
              <div className="mt-6 space-y-3">
                <RoleButton to="/student" icon={GraduationCap} title="I'm a Student" desc="Learn, play simulations, earn XP & badges" tone="teal" />
                <RoleButton to="/teacher" icon={Presentation} title="I'm a Teacher" desc="Assign missions, manage scenarios & track progress" tone="indigo" />
              </div>
              <p className="mt-6 text-center text-xs text-muted-foreground">Demo mode · sample data, no account needed</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">One platform, every hazard</p>
          <h2 className="mt-2 text-3xl font-semibold">Disaster modules</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {modules.map((m) => (
            <div key={m.slug} className="surface overflow-hidden">
              <img src={m.image} alt={m.name} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover" />
              <div className="p-4">
                <StatusPill status={m.status} />
                <p className="mt-2 font-semibold">{m.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        ReadySphere · Educational preparedness tool — always follow your institution's official emergency procedures.
      </footer>
    </div>
  );
}

function RoleButton({ to, icon: Icon, title, desc, tone }: { to: "/student" | "/teacher"; icon: typeof GraduationCap; title: string; desc: string; tone: "teal" | "indigo" }) {
  return (
    <Link to={to} className="group flex items-center gap-4 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:border-teal hover:shadow-soft">
      <span className={tone === "teal" ? "grid size-12 place-items-center rounded-xl bg-teal-soft text-teal" : "grid size-12 place-items-center rounded-xl bg-indigo-soft text-indigo"}>
        <Icon className="size-6" />
      </span>
      <span className="flex-1">
        <span className="block font-semibold">{title}</span>
        <span className="block text-sm text-muted-foreground">{desc}</span>
      </span>
      <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-teal" />
    </Link>
  );
}
