import { apiFetch } from "@/lib/auth";

export type Flag = {
  id: number;
  challengeId: number;
  flagText: string;
};

export const getFlags = () => apiFetch<Flag[]>("/flag");

export const getFlagByChallengeId = (challengeId: number) =>
  apiFetch<Flag>(`/flag/${challengeId}`);

export const createFlag = (challengeId: number, flagText: string) =>
  apiFetch<Flag>("/flag", {
    method: "POST",
    body: JSON.stringify({ challengeId, flagText }),
  });

export const updateFlag = (challengeId: number, flagText: string) =>
  apiFetch<Flag>(`/flag/${challengeId}`, {
    method: "PUT",
    body: JSON.stringify({ flagText }),
  });

export const deleteFlag = (challengeId: number) =>
  apiFetch<Flag>(`/flag/${challengeId}`, { method: "DELETE" });
