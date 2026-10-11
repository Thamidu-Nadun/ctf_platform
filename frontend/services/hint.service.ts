import { apiFetch } from "@/lib/auth";

export type Hint = {
  id: number;
  challengeId: number;
  hintText: string;
  cost: number;
};

export const getHints = () => apiFetch<Hint[]>("/hint");

export const getHintsByChallengeId = (challengeId: number) =>
  apiFetch<Hint[]>(`/hint/challenge/${challengeId}`);

export const createHint = (
  challengeId: number,
  hintText: string,
  cost: number,
) =>
  apiFetch<Hint>("/hint", {
    method: "POST",
    body: JSON.stringify({ challengeId, hintText, cost }),
  });

export const updateHint = (hintId: number, hintText: string, cost: number) =>
  apiFetch<Hint>(`/hint/${hintId}`, {
    method: "PUT",
    body: JSON.stringify({ hintText, cost }),
  });

export const deleteHint = (hintId: number) =>
  apiFetch<Hint>(`/hint/${hintId}`, { method: "DELETE" });
