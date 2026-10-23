import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, MapPin, DoorOpen, Flame, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { initialScenarios, type Scenario } from "@/lib/data";
import { PageHeader } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/teacher/scenarios")({
  head: () => ({ meta: [{ title: "Scenario Management · ReadySphere" }, { name: "description", content: "Create and manage fire evacuation scenarios." }, { property: "og:title", content: "Scenario Management · ReadySphere" }, { property: "og:description", content: "Create and manage fire evacuation scenarios." }] }),
  component: Scenarios,
});

const layouts = ["Block A · Floor 2", "Main Building", "Chemistry Lab", "Central Library", "Auditorium", "Cafeteria"];
const fireSpots = ["Corridor", "Electrical room", "Lab bench", "Kitchen", "Stairwell B"];

function Scenarios() {
  const [list, setList] = useState<Scenario[]>(initialScenarios);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", location: layouts[0]!, difficulty: "Beginner" as Scenario["difficulty"], exits: "2", fire: fireSpots[0]!, blocked: "0" });

  const create = () => {
    if (!form.title.trim()) { toast.error("Give your scenario a title"); return; }
    const hazards = [`Fire at ${form.fire.toLowerCase()}`, ...(Number(form.blocked) ? [`${form.blocked} blocked exit(s)`] : [])];
    setList((l) => [{ id: crypto.randomUUID(), title: form.title, location: form.location, difficulty: form.difficulty, exits: Number(form.exits), hazards, status: "Draft", plays: 0 }, ...l]);
    setOpen(false);
    setForm({ ...form, title: "" });
    toast.success("Scenario created as draft");
  };
  const toggle = (id: string) => setList((l) => l.map((s) => (s.id === id ? { ...s, status: s.status === "Draft" ? "Published" : "Draft" } : s)));

  return (
    <>
      <PageHeader eyebrow="Fire module" title="Scenario management" description="Configure building layouts, fire locations, exits and difficulty for evacuation simulations."
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus /> New scenario</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create evacuation scenario</DialogTitle></DialogHeader>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Cafeteria lunch-hour fire" /></div>
                <Field label="Building layout" value={form.location} onChange={(v) => setForm({ ...form, location: v })} opts={layouts} />
                <Field label="Fire location" value={form.fire} onChange={(v) => setForm({ ...form, fire: v })} opts={fireSpots} />
                <Field label="Difficulty" value={form.difficulty} onChange={(v) => setForm({ ...form, difficulty: v as Scenario["difficulty"] })} opts={["Beginner", "Intermediate", "Advanced"]} />
                <Field label="Available exits" value={form.exits} onChange={(v) => setForm({ ...form, exits: v })} opts={["1", "2", "3", "4"]} />
                <Field label="Blocked exits" value={form.blocked} onChange={(v) => setForm({ ...form, blocked: v })} opts={["0", "1", "2"]} />
              </div>
              <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={create}>Create scenario</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="grid gap-5 md:grid-cols-2">
        {list.map((s) => (
          <div key={s.id} className="surface p-5 animate-in fade-in">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-lg font-semibold">{s.title}</p><p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="size-3.5" />{s.location}</p></div>
              <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", s.status === "Published" ? "bg-teal-soft text-teal" : "bg-amber-soft text-amber")}>{s.status}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-indigo-soft px-2.5 py-1 font-medium text-indigo">{s.difficulty}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1"><DoorOpen className="size-3" />{s.exits} exits</span>
              {s.hazards.map((h) => <span key={h} className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1"><Flame className="size-3 text-amber" />{h}</span>)}
            </div>
            <div className="mt-5 flex items-center justify-between border-t pt-4">
              <span className="text-sm text-muted-foreground">{s.plays} plays</span>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => toast.info("Preview available with the simulation engine")}><Eye /></Button>
                <Button size="sm" variant="ghost" onClick={() => { setList((l) => l.filter((x) => x.id !== s.id)); toast("Scenario deleted"); }}><Trash2 /></Button>
                <Button size="sm" variant="outline" onClick={() => toggle(s.id)}>{s.status === "Draft" ? "Publish" : "Unpublish"}</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Field({ label, value, onChange, opts }: { label: string; value: string; onChange: (v: string) => void; opts: string[] }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
        <SelectContent>{opts.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  );
}
