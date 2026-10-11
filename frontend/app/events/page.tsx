"use client";
import { useEffect, useState } from "react";
import NavBar from "@/Components/platform/NavBar";
import EventCard from "@/Components/platform/EventCard";
import { State } from "@/Components/platform/ui";
import { getEvents } from "@/services/event.service";
import { usePresentation } from "@/lib/hooks";
import type { Event } from "@/lib/platform";
export default function EventsPage() {
  const [eventData, setEventData] = useState<Event[] | null>(null);
  const [eventLoading, setEventLoading] = useState(true);
  const [eventError, setEventError] = useState("");
  const [eventRevision, setEventRevision] = useState(0);
  const { presentation } = usePresentation();

  useEffect(() => {
    let active = true;
    getEvents()
      .then((data) => {
        if (active) setEventData(data);
      })
      .catch((error: Error) => {
        if (active) setEventError(error.message);
      })
      .finally(() => {
        if (active) setEventLoading(false);
      });
    return () => {
      active = false;
    };
  }, [eventRevision]);

  const refreshEvents = () => {
    setEventLoading(true);
    setEventError("");
    setEventRevision((value) => value + 1);
  };

  const events = {
    data: eventData,
    loading: eventLoading,
    error: eventError,
    refresh: refreshEvents,
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <NavBar />
      <main className="mx-auto max-w-7xl px-5 py-10">
        <p className="text-xs tracking-widest text-emerald-400">
          JOIN THE INVESTIGATION
        </p>
        <h1 className="mb-3 mt-3 text-3xl font-black">Events</h1>
        <p className="mb-8 text-sm text-slate-400">
          Upcoming operations and active competitions.
        </p>
        <State
          loading={events.loading}
          error={events.error}
          retry={events.refresh}
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {events.data?.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              image={presentation.eventImages[event.id]}
            />
          ))}
        </div>
        {events.data?.length === 0 && (
          <State empty="No events have been scheduled yet." />
        )}
      </main>
    </div>
  );
}
