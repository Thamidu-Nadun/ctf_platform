"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Radar } from "lucide-react";
export default function NavBar() {
  const router = useRouter();
  return <nav className="border-b border-slate-800 bg-slate-950/95">
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5">
      <Link href="/" className="flex items-center gap-3 font-black tracking-wider"><Radar className="text-emerald-400" /><span>RAVEN<span className="text-emerald-400">//</span>TRACE</span></Link>
      <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
        <Link href="/challenge" className="hover:text-emerald-400">Challenges</Link>
        <Link href="/events" className="hover:text-emerald-400">Events</Link>
        <Link href="/dashboard" className="hover:text-emerald-400">Dashboard</Link>
        <button onClick={() => router.push("/login")} className="flex items-center gap-2 rounded-lg bg-emerald-400 px-4 py-2 font-bold text-slate-950 hover:bg-emerald-300">Log in <ArrowUpRight size={16} /></button>
      </div>
    </div>
  </nav>;
}
