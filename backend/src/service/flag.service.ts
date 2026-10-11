import { ConflictError, NotFoundError } from "../libs/errors";
import * as challengeRepo from "../repo/challenge.repo";

export const getFlags = async () => {
  return challengeRepo.getAllFlags();
};

export const getFlagByChallengeId = async (challengeId: number) => {
  const flag = await challengeRepo.getFlagByChallengeId(challengeId);
  if (!flag) {
    throw new NotFoundError(`Flag for challenge ${challengeId} not found`);
  }
  return flag;
};

export const createFlag = async (challengeId: number, flagText: string) => {
  const challenge = await challengeRepo.getChallengeById(challengeId);
  if (!challenge) {
    throw new NotFoundError(`Challenge with ID ${challengeId} not found`);
  }

  const existingFlag = await challengeRepo.getFlagByChallengeId(challengeId);
  if (existingFlag) {
    throw new ConflictError(`Flag for challenge ${challengeId} already exists`);
  }

  const [flag] = await challengeRepo.createFlag(challengeId, flagText);
  if (!flag) {
    throw new Error("Failed to create flag");
  }
  return flag;
};

export const updateFlag = async (challengeId: number, flagText: string) => {
  await getFlagByChallengeId(challengeId);
  const [flag] = await challengeRepo.updateFlag(challengeId, flagText);
  if (!flag) {
    throw new NotFoundError(`Flag for challenge ${challengeId} not found`);
  }
  return flag;
};

export const deleteFlag = async (challengeId: number) => {
  await getFlagByChallengeId(challengeId);
  const [flag] = await challengeRepo.deleteFlag(challengeId);
  if (!flag) {
    throw new NotFoundError(`Flag for challenge ${challengeId} not found`);
  }
  return flag;
};
