"use client";
import NavBar from "@/Components/platform/NavBar";
import EventCard from "@/Components/platform/EventCard";
import { State } from "@/Components/platform/ui";
import { usePresentation, useResource } from "@/lib/hooks";
import type { Event } from "@/lib/platform";
export default function EventsPage(){const events=useResource<Event[]>("/event");const {presentation}=usePresentation();return <div className="min-h-screen bg-slate-950"><NavBar /><main className="mx-auto max-w-7xl px-5 py-10"><p className="text-xs tracking-widest text-emerald-400">JOIN THE INVESTIGATION</p><h1 className="mb-3 mt-3 text-3xl font-black">Events</h1><p className="mb-8 text-sm text-slate-400">Upcoming operations and active competitions.</p><State loading={events.loading} error={events.error} retry={events.refresh} /><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{events.data?.map(event=><EventCard key={event.id} event={event} image={presentation.eventImages[event.id]} />)}</div>{events.data?.length===0 && <State empty="No events have been scheduled yet." />}</main></div>;}
