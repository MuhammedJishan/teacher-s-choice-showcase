import { createFileRoute } from "@tanstack/react-router";
import { modules } from "@/lib/data";
import { ModuleCard, PageHeader } from "@/components/ui-kit";

export const Route = createFileRoute("/teacher/modules/")({
  head: () => ({ meta: [{ title: "Disaster Modules · Teacher · ReadySphere" }, { name: "description", content: "Review available and upcoming modules." }, { property: "og:title", content: "Disaster Modules · ReadySphere" }, { property: "og:description", content: "Review available and upcoming modules." }] }),
  component: () => (
    <>
      <PageHeader eyebrow="Curriculum" title="Disaster modules" description="Fire Safety is ready to assign. Other modules are in development and visible to students as Coming Soon." />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((m) => <ModuleCard key={m.slug} module={m} base="/teacher/modules" />)}
      </div>
    </>
  ),
});
