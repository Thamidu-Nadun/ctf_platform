export type InstanceReq = {
  environmentId: number;
  challengeId: number;
  userId: string;
  status: "pending" | "running" | "stopped" | "error";
};

export type InstanceRes = {
  id: string;
  environmentId: number;
  challengeId: number;
  userId: string;
  status: "pending" | "running" | "stopped" | "error";
  createdAt: Date;
  expiresAt: Date;
};
