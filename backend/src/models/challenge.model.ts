export type ChallengeReq = {
  name: string;
  description: string;
  level: "easy" | "medium" | "hard";
  points: number;
  visibility: boolean;
  eventId: number;
  categoryId: number;
};

export type ChallengeRes = {
  id: number;
  name: string;
  description: string;
  level: "easy" | "medium" | "hard";
  points: number;
  visibility: boolean;
  eventId: number;
  categoryId: number;
};
