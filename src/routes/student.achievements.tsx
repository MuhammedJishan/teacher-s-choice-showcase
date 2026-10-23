import { createFileRoute } from "@tanstack/react-router";
import { Award, Lock } from "lucide-react";
import { badges } from "@/lib/data";
import { PageHeader, toneClass } from "@/components/ui-kit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/student/achievements")({
  head: () => ({ meta: [{ title: "Achievements · ReadySphere" }, { name: "description", content: "Badges earned for safe preparedness decisions." }, { property: "og:title", content: "Achievements · ReadySphere" }, { property: "og:description", content: "Badges earned for safe preparedness decisions." }] }),
  component: () => {
    const earned = badges.filter((b) => b.earned).length;
    return (
      <>
        <PageHeader eyebrow="Achievements" title="Your badges" description={`${earned} of ${badges.length} unlocked. Badges reward correct knowledge and calm, safe decisions.`} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((b) => (
            <div key={b.id} className={cn("surface p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lift", !b.earned && "opacity-60")}>
              <span className={cn("mx-auto grid size-20 place-items-center rounded-3xl", b.earned ? toneClass(b.tone) : "bg-muted text-muted-foreground")}>
                {b.earned ? <Award className="size-10" /> : <Lock className="size-8" />}
              </span>
              <p className="mt-4 font-semibold">{b.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
              <p className={cn("mt-3 text-xs font-semibold", b.earned ? "text-teal" : "text-muted-foreground")}>{b.earned ? "Unlocked" : "Locked"}</p>
            </div>
          ))}
        </div>
      </>
    );
  },
});
