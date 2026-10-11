"use client";
import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Container,
  FileUp,
  Flag,
  Home,
  ListChecks,
  Menu,
  Lightbulb,
  Shield,
  Users,
} from "lucide-react";
import { Field, inputClass, buttonClass } from "@/Components/platform/ui";
const links = [
  { label: "Event", href: "/dashboard", Icon: CalendarDays },
  { label: "Challenge", href: "/dashboard/challenges", Icon: Flag },
  { label: "Hints", href: "/dashboard/hints", Icon: Lightbulb },
  { label: "Flags", href: "/dashboard/flags", Icon: Flag },
  { label: "Submission", href: "/dashboard/submissions", Icon: ListChecks },
  { label: "Users", href: "/dashboard/users", Icon: Users },
  { label: "Environments", href: "/dashboard/environments", Icon: Container },
  { label: "Assets", href: "/dashboard/upload", Icon: FileUp },
];
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (
      data.get("username") === "admin" &&
      data.get("password") === "raven2026"
    ) {
      setAuthenticated(true);
      setError("");
    } else setError("Access denied: incorrect admin credentials.");
  };
  if (!authenticated)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-5">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
          <Shield className="mb-5 text-emerald-400" size={32} />
          <p className="text-xs tracking-widest text-emerald-400">
            PRIVILEGED WORKSPACE
          </p>
          <h1 className="mb-3 mt-2 text-2xl font-bold">Dashboard access</h1>
          <p className="mb-6 text-sm text-slate-500">
            Enter your admin credentials to manage the platform.
          </p>
          <form onSubmit={login} className="space-y-5">
            <Field label="Admin username">
              <input
                name="username"
                autoComplete="username"
                required
                className={inputClass}
              />
            </Field>
            <Field label="Password">
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={inputClass}
              />
            </Field>
            {error && (
              <p role="alert" className="text-xs text-red-300">
                {error}
              </p>
            )}
            <button className={`${buttonClass} w-full`}>Open dashboard</button>
          </form>
          <Link
            href="/"
            className="mt-5 block text-center text-xs text-slate-500 hover:text-emerald-400"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  return (
    <div className="min-h-screen bg-slate-950">
      <aside
        className={`${collapsed ? "md:w-20" : "md:w-60"} border-b border-slate-800 bg-slate-950 md:fixed md:inset-y-0 md:border-b-0 md:border-r`}
      >
        <div className="flex items-center justify-between gap-3 p-5">
          <Link
            href="/"
            className={`font-black tracking-wider ${collapsed ? "md:hidden" : ""}`}
          >
            RAVEN<span className="text-emerald-400">{"//"}</span>TRACE
          </Link>
          <button
            aria-label="Toggle sidebar"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden text-slate-400 md:block"
          >
            <Menu size={20} />
          </button>
        </div>
        <p
          className={`px-5 pb-4 text-[10px] tracking-widest text-slate-600 ${collapsed ? "md:hidden" : ""}`}
        >
          CONTROL CENTER
        </p>
        <nav className="flex gap-2 overflow-x-auto px-3 pb-4 md:flex-col">
          {links.map(({ label, href, Icon }) => {
            const active =
              pathname === href ||
              (href === "/dashboard" && pathname === "/dashboard/events");
            return (
              <Link
                key={label}
                href={href}
                aria-current={active ? "page" : undefined}
                title={label}
                className={`flex shrink-0 items-center gap-3 rounded-lg border px-4 py-3 text-sm ${active ? "border-emerald-800 bg-emerald-500/10 text-emerald-300" : "border-transparent text-slate-500 hover:bg-slate-900 hover:text-slate-200"}`}
              >
                <Icon size={18} />
                <span className={collapsed ? "md:hidden" : ""}>{label}</span>
              </Link>
            );
          })}
        </nav>
        <Link
          href="/"
          className="m-3 flex items-center gap-3 rounded-lg px-4 py-3 text-xs text-slate-500 hover:text-emerald-400"
        >
          <Home size={17} />
          <span className={collapsed ? "md:hidden" : ""}>Back to platform</span>
        </Link>
      </aside>
      <div className={collapsed ? "md:ml-20" : "md:ml-60"}>
        <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <span className="text-xs text-slate-500">RAVEN / ADMINISTRATION</span>
          <span className="flex items-center gap-2 text-xs text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Admin workspace
          </span>
        </header>
        {children}
      </div>
    </div>
  );
}
