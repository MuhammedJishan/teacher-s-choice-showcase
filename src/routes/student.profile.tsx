import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { student } from "@/lib/data";
import { PageHeader, Panel, Ring } from "@/components/ui-kit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/student/profile")({
  head: () => ({ meta: [{ title: "Profile · ReadySphere" }, { name: "description", content: "Your student profile." }, { property: "og:title", content: "Profile · ReadySphere" }, { property: "og:description", content: "Your student profile." }] }),
  component: () => (
    <>
      <PageHeader title="Profile" />
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <Panel className="text-center">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-brand font-display text-2xl font-semibold text-primary-foreground">AS</span>
          <p className="mt-4 text-lg font-semibold">{student.name}</p>
          <p className="text-sm text-muted-foreground">{student.className} · Level {student.level} {student.levelTitle}</p>
          <div className="mt-6 flex justify-center"><Ring value={student.preparedness} label="Preparedness" /></div>
        </Panel>
        <Panel title="Details">
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); toast.success("Profile saved"); }}>
            <div className="space-y-1.5"><Label>Full name</Label><Input defaultValue={student.name} /></div>
            <div className="space-y-1.5"><Label>Class</Label><Input defaultValue={student.className} /></div>
            <div className="space-y-1.5"><Label>School</Label><Input defaultValue="Greenfield Public School" /></div>
            <div className="space-y-1.5"><Label>Emergency contact</Label><Input defaultValue="+91 98765 43210" /></div>
            <div className="sm:col-span-2"><Button type="submit">Save changes</Button></div>
          </form>
        </Panel>
      </div>
    </>
  ),
});
