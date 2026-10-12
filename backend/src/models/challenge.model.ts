export type ChallengeReq = {
  name: string;
  description: string;
  level: "easy" | "medium" | "hard";
  points: number;
  visibility: boolean;
  eventId: number;
  categoryId: number;
  assets: string[]; // Array of asset URLs or identifiers
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
  assets: string[]; // Array of asset URLs or identifiers
};
