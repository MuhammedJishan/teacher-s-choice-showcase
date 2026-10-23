import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, Layers, BookOpen, Gamepad2, Puzzle, Award, Trophy, LineChart, User } from "lucide-react";
import { AppShell, type NavItem } from "@/components/app-shell";
import { student } from "@/lib/data";

const nav: NavItem[] = [
  { to: "/student", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/student/modules", label: "Disaster Modules", icon: Layers },
  { to: "/student/learn", label: "Learning Centre", icon: BookOpen },
  { to: "/student/simulations", label: "Simulations", icon: Gamepad2 },
  { to: "/student/challenges", label: "Challenges & Quizzes", icon: Puzzle },
  { to: "/student/achievements", label: "Achievements", icon: Award },
  { to: "/student/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/student/progress", label: "My Progress", icon: LineChart },
  { to: "/student/profile", label: "Profile", icon: User },
];

export const Route = createFileRoute("/student")({
  head: () => ({ meta: [{ title: "Student Portal · ReadySphere" }, { name: "description", content: "Your ReadySphere student learning space." }, { property: "og:title", content: "Student Portal · ReadySphere" }, { property: "og:description", content: "Your ReadySphere student learning space." }] }),
  component: () => (
    <AppShell nav={nav} roleLabel="Student" user={student.name} userMeta={`Level ${student.level} · ${student.className}`}>
      <Outlet />
    </AppShell>
  ),
});
