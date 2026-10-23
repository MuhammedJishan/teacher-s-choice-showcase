import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { teacher, classes } from "@/lib/data";
import { PageHeader, Panel } from "@/components/ui-kit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/teacher/profile")({
  head: () => ({ meta: [{ title: "Teacher Profile · ReadySphere" }, { name: "description", content: "Your teacher profile." }, { property: "og:title", content: "Teacher Profile · ReadySphere" }, { property: "og:description", content: "Your teacher profile." }] }),
  component: () => (
    <>
      <PageHeader title="Profile" />
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <Panel className="text-center">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-brand font-display text-2xl font-semibold text-primary-foreground">KR</span>
          <p className="mt-4 text-lg font-semibold">{teacher.name}</p>
          <p className="text-sm text-muted-foreground">Safety Coordinator · {teacher.school}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">{classes.map((c) => <span key={c} className="rounded-full bg-indigo-soft px-2.5 py-1 text-xs text-indigo">{c}</span>)}</div>
        </Panel>
        <Panel title="Details">
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); toast.success("Profile saved"); }}>
            <div className="space-y-1.5"><Label>Full name</Label><Input defaultValue={teacher.name} /></div>
            <div className="space-y-1.5"><Label>Email</Label><Input defaultValue="kavita.rao@greenfield.edu" /></div>
            <div className="space-y-1.5"><Label>School</Label><Input defaultValue={teacher.school} /></div>
            <div className="space-y-1.5"><Label>Department</Label><Input defaultValue="Science" /></div>
            <div className="sm:col-span-2"><Button type="submit">Save changes</Button></div>
          </form>
        </Panel>
      </div>
    </>
  ),
});
