import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode, type ComponentType } from "react";
import { Menu, X, LogOut, Bell, Search, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  exact?: boolean;
}

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-xl bg-gradient-brand shadow-glow">
        <ShieldCheck className="size-5 text-primary-foreground" />
      </span>
      <span className={cn("font-display text-lg font-semibold", light ? "text-navy-foreground" : "text-foreground")}>
        Ready<span className="text-teal">Sphere</span>
      </span>
    </Link>
  );
}

export function AppShell({
  nav,
  roleLabel,
  user,
  userMeta,
  children,
}: {
  nav: NavItem[];
  roleLabel: string;
  user: string;
  userMeta: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.to || pathname === item.to + "/" : pathname.startsWith(item.to);

  const initials = user.replace("Mrs. ", "").split(" ").map((p) => p[0]).join("").slice(0, 2);

  const sidebar = (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center justify-between px-5">
        <Logo />
        <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
          <X className="size-5" />
        </button>
      </div>
      <div className="px-5 pb-3">
        <span className="rounded-full bg-sidebar-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-teal">
          {roleLabel} workspace
        </span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-2">
        {nav.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className={cn("size-[18px] transition-colors", active ? "text-teal" : "opacity-70")} />
              {item.label}
              {active && <span className="ml-auto size-1.5 rounded-full bg-teal" />}
            </Link>
          );
        })}
      </nav>
      <div className="m-3 rounded-2xl border border-sidebar-border p-3">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-gradient-brand text-sm font-semibold text-primary-foreground">
            {initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-sidebar-accent-foreground">{user}</p>
            <p className="truncate text-xs">{userMeta}</p>
          </div>
          <Link to="/" aria-label="Sign out" className="rounded-lg p-1.5 hover:bg-sidebar-accent">
            <LogOut className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">{sidebar}</aside>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-navy/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 animate-in slide-in-from-left">{sidebar}</div>
        </div>
      )}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-md sm:px-8">
          <button className="rounded-lg p-2 hover:bg-muted lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </button>
          <div className="hidden max-w-sm flex-1 items-center gap-2 rounded-xl border bg-card px-3 py-2 text-sm text-muted-foreground sm:flex">
            <Search className="size-4" />
            <span>Search lessons, students, scenarios…</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="relative rounded-xl border bg-card p-2 hover:bg-muted" aria-label="Notifications">
              <Bell className="size-4" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-amber" />
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 animate-in fade-in duration-300">{children}</main>
      </div>
    </div>
  );
}
