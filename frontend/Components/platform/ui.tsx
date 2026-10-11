import type { ReactNode } from "react";
import { AlertCircle, LoaderCircle } from "lucide-react";
export const inputClass = "w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10";
export const buttonClass = "inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40";
export function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block space-y-2 text-xs font-medium text-slate-400"><span>{label}</span>{children}</label>;
}
export function State({ loading, error, empty, retry }: { loading?: boolean; error?: string; empty?: string; retry?: () => void }) {
  if (loading) return <div role="status" className="flex items-center justify-center gap-3 p-12 text-slate-400"><LoaderCircle className="animate-spin" size={18} /> Loading workspace…</div>;
  if (error) return <div role="alert" className="my-5 rounded-xl border border-red-900 bg-red-950/30 p-5 text-sm text-red-300"><div className="flex items-center gap-2"><AlertCircle size={18} />{error}</div>{retry && <button onClick={retry} className="mt-3 underline">Try again</button>}</div>;
  return empty ? <div className="rounded-xl border border-dashed border-slate-700 p-12 text-center text-sm text-slate-500">{empty}</div> : null;
}
export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: string }) {
  return <span className={`inline-flex rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${tone === "easy" || tone === "ongoing" ? "border-emerald-800 bg-emerald-950/50 text-emerald-300" : tone === "hard" || tone === "ended" ? "border-red-900 bg-red-950/40 text-red-300" : "border-slate-700 bg-slate-800/50 text-slate-300"}`}>{children}</span>;
}
