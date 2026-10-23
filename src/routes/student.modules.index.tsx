import { createFileRoute } from "@tanstack/react-router";
import { modules, fireLessons } from "@/lib/data";
import { ModuleCard, PageHeader } from "@/components/ui-kit";

export const Route = createFileRoute("/student/modules/")({
  head: () => ({ meta: [{ title: "Disaster Modules · ReadySphere" }, { name: "description", content: "Explore fire, earthquake, flood, cyclone and other emergency modules." }, { property: "og:title", content: "Disaster Modules · ReadySphere" }, { property: "og:description", content: "Explore every disaster preparedness module." }] }),
  component: () => {
    const p = Math.round((fireLessons.filter((l) => l.done).length / fireLessons.length) * 100);
    return (
      <>
        <PageHeader eyebrow="Explore" title="Disaster modules" description="Each module combines lessons, challenges and simulations. Fire Safety is live now — more hazards are on the way." />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {modules.map((m) => <ModuleCard key={m.slug} module={m} base="/student/modules" progress={m.slug === "fire" ? p : undefined} />)}
        </div>
      </>
    );
  },
});
