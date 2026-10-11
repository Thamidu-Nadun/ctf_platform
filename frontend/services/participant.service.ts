import { apiFetch } from "@/lib/auth";

export type Participant = {
  userId: string;
  eventId: number;
  joinedAt: string;
};
export type ParticipantInput = { userId: string; eventId: number };
export type ParticipantUpdate = { joinedAt: string };

export const getParticipants = () => apiFetch<Participant[]>("/participant");

export const getParticipant = (userId: string, eventId: number) =>
  apiFetch<Participant>(
    `/participant/${encodeURIComponent(userId)}/${eventId}`,
  );

export const createParticipant = (participant: ParticipantInput) =>
  apiFetch<Participant[]>("/participant", {
    method: "POST",
    body: JSON.stringify(participant),
  });

export const updateParticipant = (
  userId: string,
  eventId: number,
  participant: ParticipantUpdate,
) =>
  apiFetch<Participant[]>(
    `/participant/${encodeURIComponent(userId)}/${eventId}`,
    { method: "PUT", body: JSON.stringify(participant) },
  );

export const deleteParticipant = (userId: string, eventId: number) =>
  apiFetch<Participant[]>(
    `/participant/${encodeURIComponent(userId)}/${eventId}`,
    { method: "DELETE" },
  );
