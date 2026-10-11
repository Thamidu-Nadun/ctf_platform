import { NotFoundError } from "../libs/errors";
import * as submissionRepo from "../repo/submission.repo";

export const getAllSubmissions = async () => {
  try {
    const submissions = await submissionRepo.getAllSubmissions();
    return submissions;
  } catch (error) {
    console.error("Error fetching submissions:", error);
    throw error;
  }
};

export const getSubmissionById = async (id: string) => {
  try {
    const submission = await submissionRepo.getSubmissionById(id);
    if (!submission) {
      throw new NotFoundError(`Submission with ID ${id} not found`);
    }
    return submission;
  } catch (error) {
    console.error(`Error fetching submission with ID ${id}:`, error);
    throw error;
  }
};

export const createSubmission = async (
  userId: string,
  eventId: number,
  challengeId: number,
  points: number,
  submittedAt: Date,
) => {
  try {
    const submission = await submissionRepo.createSubmission(
      userId,
      eventId,
      challengeId,
      points,
      submittedAt,
    );
    return submission;
  } catch (error) {
    console.error("Error creating submission:", error);
    throw error;
  }
};

export const updateSubmission = async (
  id: string,
  userId: string,
  eventId: number,
  challengeId: number,
  points: number,
  submittedAt: Date,
) => {
  try {
    const submission = await submissionRepo.updateSubmission(
      id,
      userId,
      eventId,
      challengeId,
      points,
      submittedAt,
    );
    if (!submission) {
      throw new NotFoundError(`Submission with ID ${id} not found`);
    }
    return submission;
  } catch (error) {
    console.error(`Error updating submission with ID ${id}:`, error);
    throw error;
  }
};

export const deleteSubmission = async (id: string) => {
  try {
    const submission = await submissionRepo.deleteSubmission(id);
    if (!submission) {
      throw new NotFoundError(`Submission with ID ${id} not found`);
    }
    return submission;
  } catch (error) {
    console.error(`Error deleting submission with ID ${id}:`, error);
    throw error;
  }
};
