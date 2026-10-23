import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, Layers, Map, ClipboardList, Users, BarChart3, FileText, User } from "lucide-react";
import { AppShell, type NavItem } from "@/components/app-shell";
import { teacher } from "@/lib/data";

const nav: NavItem[] = [
  { to: "/teacher", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/teacher/modules", label: "Disaster Modules", icon: Layers },
  { to: "/teacher/scenarios", label: "Scenario Management", icon: Map },
  { to: "/teacher/assignments", label: "Assignments", icon: ClipboardList },
  { to: "/teacher/students", label: "Student Management", icon: Users },
  { to: "/teacher/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/teacher/reports", label: "Reports", icon: FileText },
  { to: "/teacher/profile", label: "Profile", icon: User },
];

export const Route = createFileRoute("/teacher")({
  head: () => ({ meta: [{ title: "Teacher Portal · ReadySphere" }, { name: "description", content: "Manage preparedness learning and track students." }, { property: "og:title", content: "Teacher Portal · ReadySphere" }, { property: "og:description", content: "Manage preparedness learning and track students." }] }),
  component: () => (
    <AppShell nav={nav} roleLabel="Teacher" user={teacher.name} userMeta={teacher.school}>
      <Outlet />
    </AppShell>
  ),
});
