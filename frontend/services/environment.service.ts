import { apiFetch } from "@/lib/auth";

export type Environment = {
  id: number;
  imageName: string;
  repoUrl: string;
};
export type EnvironmentInput = { imageUrl: string; repoUrl: string };

export const getEnvironments = () => apiFetch<Environment[]>("/env");

export const getEnvironment = (environmentId: number) =>
  apiFetch<Environment>(`/env/${environmentId}`);

export const createEnvironment = (environment: EnvironmentInput) =>
  apiFetch<Environment[]>("/env", {
    method: "POST",
    body: JSON.stringify(environment),
  });

export const deleteEnvironment = (environmentId: number) =>
  apiFetch<Environment[]>(`/env/${environmentId}`, { method: "DELETE" });
