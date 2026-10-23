import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { moduleCompletion, classPerformance, students } from "@/lib/data";
import { PageHeader, Panel } from "@/components/ui-kit";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/teacher/analytics")({
  head: () => ({ meta: [{ title: "Analytics · ReadySphere" }, { name: "description", content: "Learning outcomes and knowledge gaps." }, { property: "og:title", content: "Analytics · ReadySphere" }, { property: "og:description", content: "Learning outcomes and knowledge gaps." }] }),
  component: () => {
    const dist = [
      { name: "Ready (80+)", value: students.filter((s) => s.score >= 80).length, c: "var(--teal)" },
      { name: "Developing (65–79)", value: students.filter((s) => s.score >= 65 && s.score < 80).length, c: "var(--indigo)" },
      { name: "Needs support", value: students.filter((s) => s.score < 65).length, c: "var(--amber)" },
    ];
    const tip = { borderRadius: 12, border: "1px solid var(--border)" };
    return (
      <>
        <PageHeader eyebrow="Analytics" title="Learning analytics" description="Understand outcomes and identify knowledge gaps across classes." />
        <div className="grid gap-6 lg:grid-cols-3">
          <Panel title="Lesson completion rate" className="lg:col-span-2">
            <div className="h-72"><ResponsiveContainer><BarChart data={moduleCompletion}><CartesianGrid vertical={false} stroke="var(--border)" /><XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} /><YAxis axisLine={false} tickLine={false} fontSize={12} /><Tooltip cursor={{ fill: "var(--muted)" }} contentStyle={tip} /><Bar dataKey="value" fill="var(--indigo)" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></div>
          </Panel>
          <Panel title="Preparedness distribution">
            <div className="h-52"><ResponsiveContainer><PieChart><Pie data={dist} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={4}>{dist.map((d) => <Cell key={d.name} fill={d.c} />)}</Pie><Tooltip contentStyle={tip} /></PieChart></ResponsiveContainer></div>
            <ul className="space-y-2 text-sm">{dist.map((d) => <li key={d.name} className="flex items-center gap-2"><span className="size-2.5 rounded-full" style={{ background: d.c }} /><span className="flex-1">{d.name}</span><b>{d.value}</b></li>)}</ul>
          </Panel>
          <Panel title="Score trend by class" className="lg:col-span-2">
            <div className="h-72"><ResponsiveContainer><LineChart data={classPerformance}><CartesianGrid vertical={false} stroke="var(--border)" /><XAxis dataKey="week" axisLine={false} tickLine={false} fontSize={12} /><YAxis axisLine={false} tickLine={false} fontSize={12} domain={[50, 90]} /><Tooltip contentStyle={tip} /><Legend iconType="circle" /><Line dataKey="9-A" stroke="var(--teal)" strokeWidth={2.5} dot={false} /><Line dataKey="9-B" stroke="var(--indigo)" strokeWidth={2.5} dot={false} /><Line dataKey="9-C" stroke="var(--amber)" strokeWidth={2.5} dot={false} /></LineChart></ResponsiveContainer></div>
          </Panel>
          <Panel title="Knowledge gaps">
            {[["Escaping through smoke", "41% completion"], ["Reading evacuation maps", "58% completion"], ["Blocked-exit decisions", "Avg. 62% accuracy"]].map(([t, d]) => (
              <div key={t} className="mb-3 flex gap-3 rounded-xl bg-amber-soft p-3"><AlertTriangle className="size-5 shrink-0 text-amber" /><div><p className="text-sm font-medium">{t}</p><p className="text-xs text-muted-foreground">{d}</p></div></div>
            ))}
          </Panel>
        </div>
      </>
    );
  },
});
