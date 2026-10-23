import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Activity, ShieldCheck, CheckCircle2, Plus } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { students, classPerformance, moduleCompletion, teacherActivities, teacher, initialAssignments } from "@/lib/data";
import { PageHeader, Panel, StatCard, Bar } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/teacher/")({
  head: () => ({ meta: [{ title: "Teacher Dashboard · ReadySphere" }, { name: "description", content: "Class preparedness at a glance." }, { property: "og:title", content: "Teacher Dashboard · ReadySphere" }, { property: "og:description", content: "Class preparedness at a glance." }] }),
  component: TeacherDashboard,
});

function TeacherDashboard() {
  const active = students.filter((s) => s.status === "Active").length;
  const avg = Math.round(students.reduce((a, s) => a + s.score, 0) / students.length);
  return (
    <div className="space-y-6">
      <PageHeader eyebrow={teacher.school} title={`Hello, ${teacher.name}`} description="Here's how your classes are building disaster readiness." action={<Button asChild><Link to="/teacher/assignments"><Plus /> New assignment</Link></Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total students" value={students.length * 10 + 2} hint="Across 4 classes" icon={Users} tone="indigo" />
        <StatCard label="Active learners" value={`${Math.round((active / students.length) * 100)}%`} hint="Last 7 days" icon={Activity} />
        <StatCard label="Avg. preparedness" value={`${avg}%`} hint="+6% vs last month" icon={ShieldCheck} tone="amber" />
        <StatCard label="Missions completed" value="1,284" hint="This term" icon={CheckCircle2} tone="navy" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Student performance by class" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={classPerformance}>
                <defs>
                  {[["a", "var(--teal)"], ["b", "var(--indigo)"], ["c", "var(--amber)"]].map(([k, c]) => (
                    <linearGradient key={k} id={`g${k}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={c} stopOpacity={0.3} /><stop offset="100%" stopColor={c} stopOpacity={0} /></linearGradient>
                  ))}
                </defs>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} domain={[50, 90]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                <Legend iconType="circle" />
                <Area dataKey="9-A" stroke="var(--teal)" fill="url(#ga)" strokeWidth={2} />
                <Area dataKey="9-B" stroke="var(--indigo)" fill="url(#gb)" strokeWidth={2} />
                <Area dataKey="9-C" stroke="var(--amber)" fill="url(#gc)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Recent activity">
          <ul className="space-y-4">
            {teacherActivities.map((a) => (
              <li key={a.who + a.time} className="flex gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-indigo-soft text-xs font-semibold text-indigo">{a.who.split(" ").map((x) => x[0]).join("")}</span>
                <div><p className="text-sm"><b>{a.who}</b> {a.what}</p><p className="text-xs text-muted-foreground">{a.time}</p></div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Fire module completion">
          {moduleCompletion.map((m) => (
            <div key={m.name} className="mb-4"><div className="mb-1.5 flex justify-between text-sm"><span>{m.name}</span><b>{m.value}%</b></div><Bar value={m.value} tone="brand" /></div>
          ))}
        </Panel>
        <Panel title="Assignment completion" action={<Link to="/teacher/assignments" className="text-sm font-semibold text-teal">Manage</Link>}>
          {initialAssignments.map((a) => {
            const p = Math.round((a.submitted / a.total) * 100);
            return (
              <div key={a.id} className="mb-4 rounded-xl border p-4">
                <div className="flex justify-between text-sm"><b>{a.title}</b><span className="text-muted-foreground">{a.cls}</span></div>
                <div className="mt-3 flex items-center gap-3"><Bar value={p} tone="indigo" /><span className="text-xs font-semibold">{a.submitted}/{a.total}</span></div>
              </div>
            );
          })}
        </Panel>
      </div>
    </div>
  );
}
