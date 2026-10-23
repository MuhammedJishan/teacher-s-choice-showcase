import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Bar as RBar, XAxis, YAxis, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, CartesianGrid } from "recharts";
import { weeklyXp, skillRadar, fireLessons, simulations, challenges, recentActivities } from "@/lib/data";
import { PageHeader, Panel, Bar, StatCard } from "@/components/ui-kit";
import { BookOpen, Gamepad2, Puzzle } from "lucide-react";

export const Route = createFileRoute("/student/progress")({
  head: () => ({ meta: [{ title: "My Progress · ReadySphere" }, { name: "description", content: "Track module completion, quiz and simulation performance." }, { property: "og:title", content: "My Progress · ReadySphere" }, { property: "og:description", content: "Track your preparedness progress." }] }),
  component: () => {
    const lessonsDone = fireLessons.filter((l) => l.done).length;
    const sims = simulations.filter((s) => s.best !== null);
    const ch = challenges.filter((c) => c.done);
    return (
      <>
        <PageHeader eyebrow="Progress" title="My progress" description="Your learning history across modules, quizzes and simulations." />
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <StatCard label="Lessons completed" value={`${lessonsDone}/${fireLessons.length}`} icon={BookOpen} />
          <StatCard label="Avg. simulation score" value={`${Math.round(sims.reduce((a, s) => a + (s.best ?? 0), 0) / sims.length)}%`} icon={Gamepad2} tone="indigo" />
          <StatCard label="Challenges passed" value={`${ch.length}/${challenges.length}`} icon={Puzzle} tone="amber" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="XP this week">
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={weeklyXp}>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12} />
                  <YAxis axisLine={false} tickLine={false} fontSize={12} />
                  <Tooltip cursor={{ fill: "var(--muted)" }} contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                  <RBar dataKey="xp" fill="var(--teal)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
          <Panel title="Skill profile">
            <div className="h-64">
              <ResponsiveContainer>
                <RadarChart data={skillRadar}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="skill" fontSize={12} />
                  <Radar dataKey="value" stroke="var(--indigo)" fill="var(--indigo)" fillOpacity={0.25} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
          <Panel title="Module completion">
            {[["Fire Safety", Math.round((lessonsDone / fireLessons.length) * 100)], ["Earthquake", 0], ["Flood", 0], ["Cyclone", 0]].map(([n, v]) => (
              <div key={n} className="mb-4"><div className="mb-1.5 flex justify-between text-sm"><span>{n}</span><span className="text-muted-foreground">{v ? `${v}%` : "Coming soon"}</span></div><Bar value={v as number} tone="brand" /></div>
            ))}
          </Panel>
          <Panel title="Learning history">
            <ul className="space-y-3">{recentActivities.map((a) => <li key={a.title} className="flex justify-between text-sm"><span>{a.title}</span><span className="text-muted-foreground">{a.time}</span></li>)}</ul>
          </Panel>
        </div>
      </>
    );
  },
});
