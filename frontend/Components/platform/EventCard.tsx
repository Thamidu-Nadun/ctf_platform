import { CalendarDays } from "lucide-react";
import { Badge } from "./ui";
import { dateLabel, safeUrl, type Event } from "@/lib/platform";
export default function EventCard({ event, image }: { event: Event; image?: string }) {
  const cover=safeUrl(event.imageUrl || image) || "/images/event-cover.svg";
  return <article className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50"><div className="h-40 bg-slate-900 bg-cover bg-center" style={{backgroundImage:`url(${JSON.stringify(cover)})`}} role="img" aria-label={`${event.name} event cover`} /><div className="p-5"><div className="mb-3 flex items-center justify-between"><Badge tone={event.status}>{event.status}</Badge><span className="text-[10px] text-slate-500">EVENT #{event.id}</span></div><h2 className="text-lg font-bold">{event.name}</h2><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{event.story}</p><p className="mt-5 flex items-center gap-2 border-t border-slate-800 pt-4 text-xs text-slate-500"><CalendarDays size={14} />{dateLabel(event.startDate)} — {dateLabel(event.endDate)}</p></div></article>;
}
