export type Challenge = {
  id: number;
  name: string;
  description: string;
  level: "easy" | "medium" | "hard";
  points: number;
  visibility: boolean;
  eventId: number;
  categoryId: number;
  assets: string[];
  tags?: string[];
  files?: ChallengeFile[];
  environmentId?: number;
};
export type ChallengeFile = { name: string; url: string };
export type Category = { id: number; name: string };
export type Event = {
  id: number;
  name: string;
  story: string;
  status: "ended" | "ongoing" | "upcoming";
  startDate: string;
  endDate: string;
  imageUrl?: string;
};
export type User = { id: string; name: string; email: string };
export type Submission = {
  id: string;
  userId: string;
  eventId: number;
  challengeId: number;
  points: number;
  submittedAt: string;
};
export type Environment = {
  id: number;
  imageName?: string;
  imageUrl?: string;
  repoUrl: string;
};
export type Instance = {
  id: string;
  status: string;
  expiresAt: string;
  targetUrl?: string | null;
  containerInfo?: { ports: string[] };
};
export type Presentation = {
  eventImages: Record<string, string>;
  challenges: Record<
    string,
    { tags?: string[]; files?: ChallengeFile[]; environmentId?: number }
  >;
};
export const emptyPresentation: Presentation = {
  eventImages: {},
  challenges: {},
};
export const presentationKey = "raven.presentation.v1";

export async function api<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`/api/backend${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
    cache: "no-store",
  });
  const body = await response.json().catch(() => null);
  if (!response.ok)
    throw new Error(
      body?.message || body?.error || `Request failed (${response.status})`,
    );
  return (
    body && typeof body === "object" && !Array.isArray(body) && "data" in body
      ? body.data
      : body
  ) as T;
}
export function single<T>(value: T | T[]): T {
  const item = Array.isArray(value) ? value[0] : value;
  if (!item) throw new Error("The server did not return the created record.");
  return item;
}
export function safeUrl(value?: string): string | null {
  if (!value) return null;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
export function dateLabel(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}
