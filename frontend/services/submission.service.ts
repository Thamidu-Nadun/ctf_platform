import { apiFetch } from "@/lib/auth";

export type Submission = {
  id: string;
  userId: string;
  eventId: number;
  challengeId: number;
  points: number;
  submittedAt: string;
};
export type SubmissionInput = Omit<Submission, "id" | "submittedAt"> & {
  submittedAt?: string;
};
export type SubmissionUpdate = Omit<Submission, "id">;

export const getSubmissions = () => apiFetch<Submission[]>("/submission");

export const getSubmission = (submissionId: string) =>
  apiFetch<Submission>(`/submission/${encodeURIComponent(submissionId)}`);

export const createSubmission = (submission: SubmissionInput) =>
  apiFetch<Submission[]>("/submission", {
    method: "POST",
    body: JSON.stringify(submission),
  });

export const updateSubmission = (
  submissionId: string,
  submission: SubmissionUpdate,
) =>
  apiFetch<Submission[]>(`/submission/${encodeURIComponent(submissionId)}`, {
    method: "PUT",
    body: JSON.stringify(submission),
  });

export const deleteSubmission = (submissionId: string) =>
  apiFetch<Submission[]>(`/submission/${encodeURIComponent(submissionId)}`, {
    method: "DELETE",
  });
