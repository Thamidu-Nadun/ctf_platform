import { apiFetch } from "@/lib/auth";

export type ChallengeLevel = "easy" | "medium" | "hard";

export type Challenge = {
  id: number;
  name: string;
  description: string;
  level: ChallengeLevel;
  points: number;
  visibility: boolean;
  eventId: number;
  categoryId: number;
  assets: string[];
};

export type ChallengeInput = Omit<Challenge, "id">;

export const getChallenges = () => apiFetch<Challenge[]>("/challenge");

export const getChallenge = (challengeId: number) =>
  apiFetch<Challenge>(`/challenge/${challengeId}`);

export const createChallenge = (challenge: ChallengeInput) =>
  apiFetch<Challenge[]>("/challenge", {
    method: "POST",
    body: JSON.stringify(challenge),
  });

export const updateChallenge = (
  challengeId: number,
  challenge: ChallengeInput,
) =>
  apiFetch<Challenge[]>(`/challenge/${challengeId}`, {
    method: "PUT",
    body: JSON.stringify(challenge),
  });

export const deleteChallenge = (challengeId: number) =>
  apiFetch<{ message: string }>(`/challenge/${challengeId}`, {
    method: "DELETE",
  });
