import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, PlayCircle, Clock, Lock } from "lucide-react";
import { toast } from "sonner";
import { fireLessons, modules } from "@/lib/data";
import { PageHeader, Panel, Bar } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/student/learn")({
  head: () => ({ meta: [{ title: "Learning Centre · ReadySphere" }, { name: "description", content: "Short preparedness lessons with XP rewards." }, { property: "og:title", content: "Learning Centre · ReadySphere" }, { property: "og:description", content: "Short preparedness lessons with XP rewards." }] }),
  component: Learn,
});

function Learn() {
  const [lessons, setLessons] = useState(fireLessons);
  const done = lessons.filter((l) => l.done).length;
  const complete = (id: number) => {
    const l = lessons.find((x) => x.id === id)!;
    setLessons((ls) => ls.map((x) => (x.id === id ? { ...x, done: true } : x)));
    toast.success(`Lesson complete! +${l.xp} XP`, { description: l.title });
  };
  return (
    <>
      <PageHeader eyebrow="Learning Centre" title="Fire Safety lessons" description="Bite-sized lessons with knowledge checks. Every correct answer earns XP." />
      <Panel className="mb-6">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex-1"><div className="mb-2 flex justify-between text-sm"><span>Fire Safety path</span><b>{done}/{lessons.length}</b></div><Bar value={(done / lessons.length) * 100} tone="brand" /></div>
          <div className="flex gap-2">{modules.slice(1).map((m) => <span key={m.slug} className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"><Lock className="size-3" />{m.short}</span>)}</div>
        </div>
      </Panel>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {lessons.map((l, i) => (
          <div key={l.id} className="surface flex flex-col p-5">
            <div className="flex items-center justify-between">
              <span className="font-display text-xs font-semibold text-muted-foreground">LESSON {String(i + 1).padStart(2, "0")}</span>
              <span className="rounded-full bg-amber-soft px-2 py-0.5 text-xs font-semibold text-amber">+{l.xp} XP</span>
            </div>
            <p className="mt-3 flex-1 font-semibold">{l.title}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Clock className="size-3.5" />{l.minutes} min</span>
              {l.done ? (
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal"><CheckCircle2 className="size-4" /> Completed</span>
              ) : (
                <Button size="sm" onClick={() => complete(l.id)}><PlayCircle /> Start</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
