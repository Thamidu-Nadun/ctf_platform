import { NotFoundError } from "../libs/errors";
import * as challengeRepo from "../repo/challenge.repo";

export const getHints = async () => {
  return challengeRepo.getAllHints();
};

export const getHintsByChallengeId = async (challengeId: number) => {
  const challenge = await challengeRepo.getChallengeById(challengeId);
  if (!challenge) {
    throw new NotFoundError(`Challenge with ID ${challengeId} not found`);
  }
  return challengeRepo.getHintsByChallengeId(challengeId);
};

export const createHint = async (
  challengeId: number,
  hintText: string,
  cost: number,
) => {
  const challenge = await challengeRepo.getChallengeById(challengeId);
  if (!challenge) {
    throw new NotFoundError(`Challenge with ID ${challengeId} not found`);
  }

  const [hint] = await challengeRepo.createHint(challengeId, hintText, cost);
  if (!hint) {
    throw new Error("Failed to create hint");
  }
  return hint;
};

export const updateHint = async (
  hintId: number,
  hintText: string,
  cost: number,
) => {
  const existingHints = await challengeRepo.getAllHints();
  if (!existingHints.some((hint) => hint.id === hintId)) {
    throw new NotFoundError(`Hint with ID ${hintId} not found`);
  }

  const [hint] = await challengeRepo.updateHint(hintId, hintText, cost);
  if (!hint) {
    throw new NotFoundError(`Hint with ID ${hintId} not found`);
  }
  return hint;
};

export const deleteHint = async (hintId: number) => {
  const existingHints = await challengeRepo.getAllHints();
  if (!existingHints.some((hint) => hint.id === hintId)) {
    throw new NotFoundError(`Hint with ID ${hintId} not found`);
  }

  const [hint] = await challengeRepo.deleteHint(hintId);
  if (!hint) {
    throw new NotFoundError(`Hint with ID ${hintId} not found`);
  }
  return hint;
};
