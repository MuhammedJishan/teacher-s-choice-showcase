import { createFileRoute } from "@tanstack/react-router";
import { Crown } from "lucide-react";
import { leaderboard } from "@/lib/data";
import { PageHeader, Panel } from "@/components/ui-kit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/student/leaderboard")({
  head: () => ({ meta: [{ title: "Leaderboard · ReadySphere" }, { name: "description", content: "See how your preparedness XP compares." }, { property: "og:title", content: "Leaderboard · ReadySphere" }, { property: "og:description", content: "See how your preparedness XP compares." }] }),
  component: () => {
    const [a, b, c] = leaderboard as [typeof leaderboard[0], typeof leaderboard[0], typeof leaderboard[0]];
    const podium = [{ p: b, n: 2, h: "h-28" }, { p: a, n: 1, h: "h-36" }, { p: c, n: 3, h: "h-20" }];
    return (
      <>
        <PageHeader eyebrow="This week" title="Leaderboard" description="Grade 9 rankings by preparedness XP." />
        <div className="mb-8 grid grid-cols-3 items-end gap-4 sm:mx-auto sm:max-w-xl">
          {podium.map(({ p, n, h }) => (
            <div key={p.name} className="text-center">
              {n === 1 && <Crown className="mx-auto mb-1 size-6 text-amber" />}
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-gradient-brand font-semibold text-primary-foreground shadow-glow">{p.name.split(" ").map((x) => x[0]).join("")}</span>
              <p className="mt-2 text-sm font-semibold">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.xp.toLocaleString()} XP</p>
              <div className={cn("mt-3 grid place-items-start justify-center rounded-t-2xl bg-navy pt-3 font-display text-2xl font-semibold text-navy-foreground", h)}>{n}</div>
            </div>
          ))}
        </div>
        <Panel>
          <div className="divide-y">
            {leaderboard.map((s, i) => (
              <div key={s.name} className={cn("flex items-center gap-4 rounded-xl px-3 py-3", s.me && "bg-teal-soft")}>
                <span className="w-6 font-display font-semibold text-muted-foreground">{i + 1}</span>
                <span className="flex-1 font-medium">{s.name}{s.me && <span className="ml-2 text-xs text-teal">(You)</span>}</span>
                <span className="hidden text-sm text-muted-foreground sm:block">{s.cls}</span>
                <span className="w-24 text-right text-sm">Score {s.score}%</span>
                <span className="w-24 text-right font-semibold text-amber">{s.xp.toLocaleString()} XP</span>
              </div>
            ))}
          </div>
        </Panel>
      </>
    );
  },
});
