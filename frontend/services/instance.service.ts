import { apiFetch } from "@/lib/auth";

export type InstanceStatus = "pending" | "running" | "stopped" | "error";
export type Instance = {
  id: string;
  environmentId: number;
  challengeId: number;
  userId: string;
  status: InstanceStatus;
  createdAt: string;
  expiresAt: string;
  targetUrl: string | null;
};
export type InstanceInput = {
  challengeId: number;
  environmentId: number;
  userId: string;
  status: InstanceStatus;
};
export type InstanceResponse = {
  statusCode: number;
  message: string;
  data: Instance;
};

export const getInstances = () =>
  apiFetch<{ statusCode: number; message: string; data: Instance[] }>(
    "/instance",
  );

export const getInstance = (instanceId: string) =>
  apiFetch<InstanceResponse>(`/instance/${encodeURIComponent(instanceId)}`);

export const createInstance = (instance: InstanceInput) =>
  apiFetch<InstanceResponse>("/instance", {
    method: "POST",
    body: JSON.stringify(instance),
  });

export const deleteInstance = (instanceId: string) =>
  apiFetch<{ statusCode: number; message: string }>(
    `/instance/${encodeURIComponent(instanceId)}`,
    { method: "DELETE" },
  );
