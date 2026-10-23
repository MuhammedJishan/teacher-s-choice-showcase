import { createFileRoute } from "@tanstack/react-router";
import { Gamepad2, MapPin, Clock, Info } from "lucide-react";
import { toast } from "sonner";
import { simulations } from "@/lib/data";
import { PageHeader } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/student/simulations")({
  head: () => ({ meta: [{ title: "Interactive Simulations · ReadySphere" }, { name: "description", content: "Practise fire evacuations in interactive scenarios." }, { property: "og:title", content: "Interactive Simulations · ReadySphere" }, { property: "og:description", content: "Practise fire evacuations in interactive scenarios." }] }),
  component: () => (
    <>
      <PageHeader eyebrow="Simulate" title="Interactive simulations" description="Make decisions in realistic evacuation scenarios. Points reward safe choices — not reckless speed." />
      <div className="mb-6 flex items-start gap-3 rounded-2xl bg-indigo-soft p-4 text-sm">
        <Info className="mt-0.5 size-5 shrink-0 text-indigo" /> The full simulation engine is in development. Scenarios below preview what you'll play.
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {simulations.map((s) => (
          <div key={s.id} className="surface overflow-hidden">
            <div className="relative h-36 bg-gradient-hero">
              <div className="absolute inset-0 grid-pattern" />
              <Gamepad2 className="absolute bottom-4 right-4 size-12 text-teal opacity-80" />
              <span className="absolute left-4 top-4 rounded-full bg-card px-2.5 py-1 text-xs font-semibold">{s.difficulty}</span>
            </div>
            <div className="p-5">
              <p className="text-lg font-semibold">{s.title}</p>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" />{s.location}</span>
                <span className="inline-flex items-center gap-1"><Clock className="size-3.5" />{s.minutes} min</span>
                <span className="font-semibold text-amber">+{s.xp} XP</span>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm">{s.best !== null ? <>Best score <b className="text-teal">{s.best}%</b></> : <span className="text-muted-foreground">Not attempted</span>}</span>
                <Button onClick={() => toast.info("Simulation engine coming soon", { description: `${s.title} will be playable in the next release.` })}>
                  {s.best !== null ? "Replay" : "Launch"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  ),
});
