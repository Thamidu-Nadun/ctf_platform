import type { ChallengeReq } from "./../models/challenge.model";
import * as challengeRepo from "../repo/challenge.repo";
import { NotFoundError } from "../libs/errors";

export const getChallenges = async () => {
  try {
    const challenges = await challengeRepo.getAllChallenges();
    return challenges;
  } catch (error) {
    console.error("Error fetching challenges:", error);
    throw error;
  }
};

export const getChallengeById = async (id: number) => {
  try {
    const challenge = await challengeRepo.getChallengeById(id);
    if (!challenge) {
      throw new NotFoundError(`Challenge with ID ${id} not found`);
    }
    return challenge;
  } catch (error) {
    console.error(`Error fetching challenge with ID ${id}:`, error);
    throw error;
  }
};

export const createChallenge = async (challengeData: ChallengeReq) => {
  try {
    const createdChallenge = await challengeRepo.createChallenge(
      challengeData.name,
      challengeData.description,
      challengeData.level,
      challengeData.points,
      challengeData.visibility,
      challengeData.eventId,
      challengeData.categoryId,
    );
    return createdChallenge;
  } catch (error) {
    console.error("Error creating challenge:", error);
    throw error;
  }
};

export const updateChallenge = async (
  id: number,
  challengeData: ChallengeReq,
) => {
  try {
    const existingChallenge = await challengeRepo.getChallengeById(id);
    if (!existingChallenge) {
      throw new NotFoundError(`Challenge with ID ${id} not found`);
    }
    const updatedChallenge = await challengeRepo.updateChallenge(
      id,
      challengeData.name,
      challengeData.description,
      challengeData.level,
      challengeData.points,
      challengeData.visibility,
      challengeData.eventId,
      challengeData.categoryId,
    );
    return updatedChallenge;
  } catch (error) {
    console.error(`Error updating challenge with ID ${id}:`, error);
    throw error;
  }
};

export const deleteChallenge = async (id: number) => {
  try {
    const existingChallenge = await challengeRepo.getChallengeById(id);
    if (!existingChallenge) {
      throw new NotFoundError(`Challenge with ID ${id} not found`);
    }
    await challengeRepo.deleteChallenge(id);
    return { message: `Challenge with ID ${id} deleted successfully` };
  } catch (error) {
    console.error(`Error deleting challenge with ID ${id}:`, error);
    throw error;
  }
};
