"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, Terminal } from "lucide-react";
import NavBar from "@/Components/platform/NavBar";
import { Badge, State, inputClass } from "@/Components/platform/ui";
import { usePresentation, useResource } from "@/lib/hooks";
import type { Category, Challenge } from "@/lib/platform";
export default function ChallengesPage() {
  const challenges = useResource<Challenge[]>("/challenge");
  const categories = useResource<Category[]>("/category");
  const { presentation } = usePresentation();
  const [search, setSearch] = useState(""); const [category, setCategory] = useState("all"); const [level, setLevel] = useState("all");
  const categoryName = (id: number) => categories.data?.find(c => c.id === id)?.name || `Category ${id}`;
  const available = (challenges.data || []).filter(c => c.visibility);
  const filtered = available.filter(c => (category === "all" || c.categoryId === Number(category)) && (level === "all" || c.level === level) && `${c.name} ${c.description} ${(c.tags || presentation.challenges[c.id]?.tags || []).join(" ")}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="min-h-screen bg-slate-950"><NavBar /><main className="mx-auto max-w-7xl px-5 py-10">
    <p className="text-xs tracking-[.2em] text-emerald-400">THE INVESTIGATION WORKSPACE</p><div className="mt-3 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-black">Challenge registry</h1><p className="mt-3 text-sm text-slate-400">Pick a target. Follow the evidence. Capture the flag.</p></div><span className="text-xs text-slate-500">{available.length} visible challenges</span></div>
    <div className="my-8 grid gap-3 md:grid-cols-[1fr_200px_160px]"><div className="relative"><Search size={18} className="absolute left-3 top-3 text-slate-500" /><input aria-label="Search challenges" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search challenges or tags…" className={`${inputClass} pl-10`} /></div>
      <select aria-label="Filter category" value={category} onChange={e=>setCategory(e.target.value)} className={inputClass}><option value="all">All categories</option>{Array.from(new Set(available.map(c=>c.categoryId))).map(id=><option key={id} value={id}>{categoryName(id)}</option>)}</select>
      <select aria-label="Filter difficulty" value={level} onChange={e=>setLevel(e.target.value)} className={inputClass}><option value="all">All difficulties</option>{["easy","medium","hard"].map(v=><option key={v} value={v}>{v}</option>)}</select></div>
    <State loading={challenges.loading} error={challenges.error} retry={challenges.refresh} />
    {!challenges.loading && !challenges.error && <><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map(c=><Link href={`/challenge/${c.id}`} key={c.id} className="group flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition hover:-translate-y-1 hover:border-emerald-500/60"><div className="mb-5 flex justify-between"><span className="rounded-lg border border-emerald-900 bg-emerald-950/40 p-3 text-emerald-400"><Terminal size={22} /></span><Badge tone={c.level}>{c.level}</Badge></div><p className="text-[10px] uppercase tracking-widest text-slate-500">{categoryName(c.categoryId)} / Event {c.eventId}</p><h2 className="mt-2 text-lg font-bold group-hover:text-emerald-400">{c.name}</h2><p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{c.description}</p><div className="mt-4 flex flex-wrap gap-2">{(c.tags || presentation.challenges[c.id]?.tags || []).map(tag=><span key={tag} className="rounded bg-slate-800 px-2 py-1 text-[10px] text-slate-400">{tag}</span>)}</div><div className="mt-6 flex justify-between border-t border-slate-800 pt-4 text-sm"><span className="font-bold text-emerald-400">{c.points} PTS</span><span className="flex items-center gap-2 text-slate-400">Investigate <ArrowUpRight size={16} /></span></div></Link>)}</div>{!filtered.length && <State empty="No challenges match your filters." />}</>}
  </main></div>;
}
