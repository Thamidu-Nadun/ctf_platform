import { apiFetch } from "@/lib/auth";

export type EventStatus = "ended" | "ongoing" | "upcoming";
export type Event = {
  id: number;
  name: string;
  story: string;
  status: EventStatus;
  startDate: string;
  endDate: string;
};
export type EventInput = Omit<Event, "id">;

export const getEvents = () => apiFetch<Event[]>("/event");

export const getEvent = (eventId: number) =>
  apiFetch<Event>(`/event/${eventId}`);

export const createEvent = (event: EventInput) =>
  apiFetch<Event[]>("/event", {
    method: "POST",
    body: JSON.stringify(event),
  });

export const deleteEvent = (eventId: number) =>
  apiFetch<Event[]>(`/event/${eventId}`, { method: "DELETE" });
