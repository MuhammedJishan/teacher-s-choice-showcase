import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap, Flame, Trophy, Target, BookOpen, Gamepad2, Award, ArrowRight, CalendarClock } from "lucide-react";
import { student, modules, badges, recentActivities, fireLessons, simulations, upcomingAssignments } from "@/lib/data";
import { ModuleCard, Panel, StatCard, Bar, Ring, toneClass } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/student/")({
  head: () => ({ meta: [{ title: "Student Dashboard · ReadySphere" }, { name: "description", content: "Your preparedness score, XP, badges and next missions." }, { property: "og:title", content: "Student Dashboard · ReadySphere" }, { property: "og:description", content: "Your preparedness score, XP, badges and next missions." }] }),
  component: StudentDashboard,
});

export const fireProgress = Math.round((fireLessons.filter((l) => l.done).length / fireLessons.length) * 100);

function StudentDashboard() {
  const xpPct = Math.round((student.xp / student.nextLevelXp) * 100);
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 text-navy-foreground shadow-lift">
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm opacity-70">Good evening 👋</p>
            <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">Welcome back, {student.name.split(" ")[0]}</h1>
            <p className="mt-2 opacity-75">You're {student.nextLevelXp - student.xp} XP away from <b className="text-amber">Level {student.level + 1}</b>. Keep your {student.streak}-day streak alive!</p>
            <div className="mt-6 max-w-md">
              <div className="mb-2 flex justify-between text-xs opacity-80"><span>Level {student.level} · {student.levelTitle}</span><span>{student.xp} / {student.nextLevelXp} XP</span></div>
              <Bar value={xpPct} tone="brand" className="bg-sidebar-accent" />
            </div>
            <Button asChild className="mt-6 shadow-glow"><Link to="/student/learn">Continue learning <ArrowRight /></Link></Button>
          </div>
          <div className="rounded-3xl bg-card p-4 text-card-foreground"><Ring value={student.preparedness} size={150} label="Preparedness" /></div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total XP" value={student.xp.toLocaleString()} hint="+340 this week" icon={Zap} tone="amber" />
        <StatCard label="Current level" value={student.level} hint={student.levelTitle} icon={Target} tone="indigo" />
        <StatCard label="Learning streak" value={`${student.streak} days`} hint="Personal best: 12" icon={Flame} tone="teal" />
        <StatCard label="Leaderboard" value={`#${student.rank}`} hint="in Grade 9" icon={Trophy} tone="navy" />
      </div>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Explore</p>
            <h2 className="text-xl font-semibold">Disaster modules</h2>
          </div>
          <Link to="/student/modules" className="text-sm font-semibold text-teal">View all</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {modules.slice(0, 4).map((m) => <ModuleCard key={m.slug} module={m} base="/student/modules" progress={m.slug === "fire" ? fireProgress : undefined} />)}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Recommended missions" className="lg:col-span-2" action={<Link to="/student/learn" className="text-sm font-semibold text-teal">See all</Link>}>
          <div className="space-y-3">
            {[
              { icon: BookOpen, t: fireLessons[5].title, s: `Lesson · ${fireLessons[5].minutes} min`, xp: fireLessons[5].xp, to: "/student/learn" as const, tone: "teal" as const },
              { icon: Gamepad2, t: simulations[2].title, s: `Simulation · ${simulations[2].difficulty}`, xp: simulations[2].xp, to: "/student/simulations" as const, tone: "indigo" as const },
              { icon: Target, t: "Know Your Alarms", s: "Challenge · 4 min", xp: 80, to: "/student/challenges" as const, tone: "amber" as const },
            ].map((r) => (
              <Link key={r.t} to={r.to} className="group flex items-center gap-4 rounded-xl border p-4 transition-colors hover:border-teal hover:bg-accent/40">
                <span className={`grid size-10 place-items-center rounded-xl ${toneClass(r.tone)}`}><r.icon className="size-5" /></span>
                <div className="flex-1"><p className="font-medium">{r.t}</p><p className="text-xs text-muted-foreground">{r.s}</p></div>
                <span className="rounded-full bg-amber-soft px-2.5 py-1 text-xs font-semibold text-amber">+{r.xp} XP</span>
              </Link>
            ))}
          </div>
        </Panel>
        <Panel title="Upcoming assignments">
          <div className="space-y-3">
            {upcomingAssignments.map((a) => (
              <div key={a.title} className="flex gap-3 rounded-xl bg-muted p-3">
                <CalendarClock className="mt-0.5 size-5 text-indigo" />
                <div><p className="text-sm font-medium">{a.title}</p><p className="text-xs text-muted-foreground">Due {a.due} · {a.by}</p></div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Recent activity">
          <ul className="space-y-4">
            {recentActivities.map((a) => (
              <li key={a.title} className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-teal" />
                <div className="flex-1"><p className="text-sm">{a.title}</p><p className="text-xs text-muted-foreground">{a.time}</p></div>
                <span className="text-xs font-semibold text-amber">+{a.xp} XP</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Badges" action={<Link to="/student/achievements" className="text-sm font-semibold text-teal">All badges</Link>}>
          <div className="grid grid-cols-4 gap-3">
            {badges.filter((b) => b.earned).map((b) => (
              <div key={b.id} className="text-center">
                <span className={`mx-auto grid size-14 place-items-center rounded-2xl ${toneClass(b.tone)}`}><Award className="size-7" /></span>
                <p className="mt-2 text-[11px] font-medium leading-tight">{b.name}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
