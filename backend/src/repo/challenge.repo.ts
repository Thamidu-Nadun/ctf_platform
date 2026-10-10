import { db } from "../db";
import { ChallengeTable } from "../db/schema/schema";

export const getAllChallenges = async () => {};
export const getChallengeById = async (id: string) => {};
export const createChallenge = async (
  name: string,
  description: string,
  categoryId: string,
  points: number,
) => {};
export const updateChallenge = async (
  id: string,
  name: string,
  description: string,
  categoryId: string,
  points: number,
) => {};
export const deleteChallenge = async (id: string) => {};
