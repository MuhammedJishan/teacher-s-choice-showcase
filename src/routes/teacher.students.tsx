import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { students, classes } from "@/lib/data";
import { PageHeader, Panel, Bar } from "@/components/ui-kit";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/teacher/students")({
  head: () => ({ meta: [{ title: "Student Management · ReadySphere" }, { name: "description", content: "Student progress, XP and preparedness scores." }, { property: "og:title", content: "Student Management · ReadySphere" }, { property: "og:description", content: "Student progress, XP and preparedness scores." }] }),
  component: Students,
});

function Students() {
  const [q, setQ] = useState("");
  const [cls, setCls] = useState("All");
  const rows = students.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()) && (cls === "All" || s.cls === cls));
  return (
    <>
      <PageHeader eyebrow="Students" title="Student management" description="Monitor every learner's progress and spot knowledge gaps early." />
      <Panel>
        <div className="mb-5 flex flex-wrap gap-3">
          <div className="relative min-w-56 flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder="Search students" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          <div className="flex flex-wrap gap-1.5">
            {["All", ...classes].map((c) => (
              <button key={c} onClick={() => setCls(c)} className={cn("rounded-full px-3 py-1.5 text-xs font-medium transition-colors", cls === c ? "bg-navy text-navy-foreground" : "bg-muted hover:bg-secondary")}>{c}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="pb-3 font-medium">Student</th><th className="pb-3 font-medium">Class</th><th className="pb-3 font-medium">Progress</th><th className="pb-3 text-right font-medium">XP</th><th className="pb-3 text-right font-medium">Score</th><th className="pb-3 text-right font-medium">Status</th></tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((s) => (
                <tr key={s.id} className="hover:bg-muted/50">
                  <td className="py-3"><div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-full bg-gradient-brand text-xs font-semibold text-primary-foreground">{s.name.split(" ").map((x) => x[0]).join("")}</span><span className="font-medium">{s.name}</span></div></td>
                  <td className="py-3 text-muted-foreground">{s.cls}</td>
                  <td className="py-3"><div className="flex w-40 items-center gap-2"><Bar value={s.progress} tone="brand" /><span className="text-xs">{s.progress}%</span></div></td>
                  <td className="py-3 text-right font-semibold text-amber">{s.xp.toLocaleString()}</td>
                  <td className={cn("py-3 text-right font-semibold", s.score < 65 && "text-destructive")}>{s.score}%</td>
                  <td className="py-3 text-right"><span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", s.status === "Active" ? "bg-teal-soft text-teal" : s.status === "Idle" ? "bg-amber-soft text-amber" : "bg-muted text-muted-foreground")}>{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">No students match.</p>}
        </div>
      </Panel>
    </>
  );
}
