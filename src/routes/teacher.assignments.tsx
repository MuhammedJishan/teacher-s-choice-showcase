import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, Plus } from "lucide-react";
import { toast } from "sonner";
import { initialAssignments, classes, activities, type Assignment } from "@/lib/data";
import { PageHeader, Panel, Bar } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/teacher/assignments")({
  head: () => ({ meta: [{ title: "Assignments · ReadySphere" }, { name: "description", content: "Assign preparedness activities to classes." }, { property: "og:title", content: "Assignments · ReadySphere" }, { property: "og:description", content: "Assign preparedness activities to classes." }] }),
  component: Assignments,
});

function Assignments() {
  const [list, setList] = useState<Assignment[]>(initialAssignments);
  const [title, setTitle] = useState("");
  const [cls, setCls] = useState(classes[0]!);
  const [activity, setActivity] = useState(activities[0]!);
  const [due, setDue] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !due) { toast.error("Add a title and a deadline"); return; }
    setList((l) => [{ id: crypto.randomUUID(), title, cls, activity, due, submitted: 0, total: 30 }, ...l]);
    setTitle(""); setDue("");
    toast.success("Assignment created", { description: `${cls} · due ${due}` });
  };

  return (
    <>
      <PageHeader eyebrow="Assignments" title="Assign learning missions" description="Pick a class, choose an activity and set a deadline." />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Panel title="New assignment">
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5"><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Smoke Escape practice" /></div>
            <div className="space-y-1.5"><Label>Class</Label>
              <Select value={cls} onValueChange={setCls}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{classes.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
            </div>
            <div className="space-y-1.5"><Label>Learning activity</Label>
              <Select value={activity} onValueChange={setActivity}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{activities.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent></Select>
            </div>
            <div className="space-y-1.5"><Label>Deadline</Label><Input type="date" value={due} onChange={(e) => setDue(e.target.value)} /></div>
            <Button type="submit" className="w-full"><Plus /> Create assignment</Button>
          </form>
        </Panel>
        <Panel title={`Active assignments (${list.length})`}>
          <div className="space-y-3">
            {list.map((a) => {
              const p = Math.round((a.submitted / a.total) * 100);
              return (
                <div key={a.id} className="rounded-xl border p-4 animate-in fade-in">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div><p className="font-semibold">{a.title}</p><p className="text-xs text-muted-foreground">{a.activity}</p></div>
                    <span className="rounded-full bg-indigo-soft px-2.5 py-1 text-xs font-semibold text-indigo">{a.cls}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs">
                    <span className="inline-flex items-center gap-1 text-muted-foreground"><CalendarDays className="size-3.5" />Due {a.due}</span>
                    <Bar value={p} tone="teal" className="flex-1" />
                    <span className="font-semibold">{a.submitted}/{a.total}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </>
  );
}
