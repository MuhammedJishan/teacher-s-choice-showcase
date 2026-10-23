import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ClipboardList, Map } from "lucide-react";
import { getModule, fireLessons, moduleCompletion } from "@/lib/data";
import { ComingSoonModule, Panel, StatusPill, Bar } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/teacher/modules/$slug")({
  loader: ({ params }) => {
    if (!getModule(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const m = loaderData ? getModule(loaderData.slug) : undefined;
    const t = m ? `${m.name} · Teacher · ReadySphere` : "Module · ReadySphere";
    return { meta: [{ title: t }, { name: "description", content: m?.description ?? "Disaster module" }, { property: "og:title", content: t }, { property: "og:description", content: m?.description ?? "Disaster module" }] };
  },
  component: Page,
});

function Page() {
  const m = getModule(Route.useLoaderData().slug)!;
  return (
    <div className="space-y-6">
      <Link to="/teacher/modules" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> All modules</Link>
      {m.status !== "available" ? <ComingSoonModule module={m} /> : (
        <>
          <div className="surface grid overflow-hidden md:grid-cols-[1fr_1.2fr]">
            <img src={m.image} alt={m.name} width={1024} height={768} className="size-full object-cover" />
            <div className="flex flex-col justify-center p-8">
              <StatusPill status="available" />
              <h1 className="mt-4 text-3xl font-semibold">{m.name}</h1>
              <p className="mt-3 text-muted-foreground">{m.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild><Link to="/teacher/assignments"><ClipboardList /> Assign to class</Link></Button>
                <Button asChild variant="outline"><Link to="/teacher/scenarios"><Map /> Manage scenarios</Link></Button>
              </div>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title={`Lessons (${fireLessons.length})`}>
              <ol className="space-y-2 text-sm">{fireLessons.map((l, i) => <li key={l.id} className="flex justify-between rounded-lg border px-3 py-2"><span>{i + 1}. {l.title}</span><span className="text-muted-foreground">{l.minutes}m</span></li>)}</ol>
            </Panel>
            <Panel title="Class completion">
              {moduleCompletion.map((x) => <div key={x.name} className="mb-4"><div className="mb-1.5 flex justify-between text-sm"><span>{x.name}</span><b>{x.value}%</b></div><Bar value={x.value} tone="brand" /></div>)}
            </Panel>
          </div>
        </>
      )}
    </div>
  );
}
