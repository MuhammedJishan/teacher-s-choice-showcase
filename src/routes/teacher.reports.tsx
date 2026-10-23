import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, Plus } from "lucide-react";
import { toast } from "sonner";
import { reports } from "@/lib/data";
import { PageHeader, Panel } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/teacher/reports")({
  head: () => ({ meta: [{ title: "Reports · ReadySphere" }, { name: "description", content: "Preparedness reports for classes and the school." }, { property: "og:title", content: "Reports · ReadySphere" }, { property: "og:description", content: "Preparedness reports for classes and the school." }] }),
  component: () => (
    <>
      <PageHeader eyebrow="Reports" title="Reports" description="Generate and download preparedness summaries." action={<Button onClick={() => toast.success("Report is being generated", { description: "It will appear here shortly (demo)." })}><Plus /> Generate report</Button>} />
      <Panel>
        <div className="divide-y">
          {reports.map((r) => (
            <div key={r.title} className="flex items-center gap-4 py-4">
              <span className="grid size-11 place-items-center rounded-xl bg-indigo-soft text-indigo"><FileText className="size-5" /></span>
              <div className="flex-1"><p className="font-medium">{r.title}</p><p className="text-xs text-muted-foreground">{r.type} · {r.date} · {r.size}</p></div>
              <Button variant="outline" size="sm" onClick={() => toast.info("Download available once reports are connected")}><Download /> PDF</Button>
            </div>
          ))}
        </div>
      </Panel>
    </>
  ),
});
