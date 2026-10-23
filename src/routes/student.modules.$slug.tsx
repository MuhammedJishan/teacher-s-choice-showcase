import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BookOpen, Gamepad2, Puzzle, CheckCircle2, Circle, ArrowLeft } from "lucide-react";
import { getModule, fireLessons } from "@/lib/data";
import { ComingSoonModule, Panel, Bar, StatusPill } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/student/modules/$slug")({
  loader: ({ params }) => {
    const m = getModule(params.slug);
    if (!m) throw notFound();
    return { slug: m.slug };
  },
  head: ({ loaderData }) => {
    const m = loaderData ? getModule(loaderData.slug) : undefined;
    const t = m ? `${m.name} · ReadySphere` : "Module · ReadySphere";
    return { meta: [{ title: t }, { name: "description", content: m?.description ?? "Disaster module" }, { property: "og:title", content: t }, { property: "og:description", content: m?.description ?? "Disaster module" }] };
  },
  component: ModulePage,
});

function ModulePage() {
  const { slug } = Route.useLoaderData();
  const m = getModule(slug)!;
  return (
    <div className="space-y-6">
      <Link to="/student/modules" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> All modules</Link>
      {m.status === "available" ? <FireEnvironment /> : <ComingSoonModule module={m} />}
    </div>
  );
}

function FireEnvironment() {
  const m = getModule("fire")!;
  const done = fireLessons.filter((l) => l.done).length;
  const pct = Math.round((done / fireLessons.length) * 100);
  return (
    <>
      <div className="surface grid overflow-hidden md:grid-cols-[1fr_1.2fr]">
        <img src={m.image} alt={m.name} width={1024} height={768} className="size-full object-cover" />
        <div className="flex flex-col justify-center p-8">
          <StatusPill status="available" />
          <h1 className="mt-4 text-3xl font-semibold">{m.name}</h1>
          <p className="mt-3 text-muted-foreground">{m.description}</p>
          <div className="mt-6"><div className="mb-2 flex justify-between text-sm"><span>{done} of {fireLessons.length} lessons</span><b>{pct}%</b></div><Bar value={pct} tone="brand" /></div>
          <Button asChild className="mt-6 w-fit"><Link to="/student/learn">Resume module</Link></Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { to: "/student/learn" as const, icon: BookOpen, t: "Learn", d: "Short illustrated lessons and knowledge checks", tone: "bg-teal-soft text-teal" },
          { to: "/student/challenges" as const, icon: Puzzle, t: "Challenge", d: "Spot hazards and make safe decisions", tone: "bg-amber-soft text-amber" },
          { to: "/student/simulations" as const, icon: Gamepad2, t: "Simulate", d: "Practise evacuations in interactive scenarios", tone: "bg-indigo-soft text-indigo" },
        ].map((x) => (
          <Link key={x.t} to={x.to} className="surface p-6 transition-all hover:-translate-y-1 hover:shadow-lift">
            <span className={`grid size-11 place-items-center rounded-xl ${x.tone}`}><x.icon className="size-5" /></span>
            <p className="mt-4 font-semibold">{x.t}</p><p className="text-sm text-muted-foreground">{x.d}</p>
          </Link>
        ))}
      </div>
      <Panel title="Learning path">
        <ol className="grid gap-2 sm:grid-cols-2">
          {fireLessons.map((l) => (
            <li key={l.id} className="flex items-center gap-3 rounded-xl border p-3 text-sm">
              {l.done ? <CheckCircle2 className="size-5 text-teal" /> : <Circle className="size-5 text-muted-foreground" />}
              <span className="flex-1">{l.title}</span><span className="text-xs text-muted-foreground">{l.minutes}m</span>
            </li>
          ))}
        </ol>
      </Panel>
    </>
  );
}
