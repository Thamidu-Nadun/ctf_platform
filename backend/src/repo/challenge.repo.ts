import { eq } from "drizzle-orm";
import { db } from "../db";
import { ChallengeTable, FlagTable, HintsTable } from "../db/schema/schema";

export const getAllChallenges = async () => {
  try {
    const challenges = await db.query.ChallengeTable.findMany();
    return challenges;
  } catch (error) {
    console.error("Error fetching challenges:", error);
    throw error;
  }
};

export const getChallengeById = async (id: number) => {
  try {
    const challenge = await db.query.ChallengeTable.findFirst({
      where: { id },
    });
    return challenge;
  } catch (error) {
    console.error("Error fetching challenge by ID:", error);
    throw error;
  }
};

export const createChallenge = async (
  name: string,
  description: string,
  level: "easy" | "medium" | "hard",
  points: number,
  visibility: boolean,
  eventId: number,
  categoryId: number,
  assets: string[] = [],
) => {
  try {
    const createdChallenge = await db
      .insert(ChallengeTable)
      .values({
        name,
        description,
        level,
        points,
        visibility,
        eventId,
        categoryId,
        assets,
      })
      .returning({
        id: ChallengeTable.id,
        name: ChallengeTable.name,
        description: ChallengeTable.description,
        level: ChallengeTable.level,
        points: ChallengeTable.points,
        visibility: ChallengeTable.visibility,
        eventId: ChallengeTable.eventId,
        categoryId: ChallengeTable.categoryId,
        assets: ChallengeTable.assets,
      });
    return createdChallenge;
  } catch (error) {
    console.error("Error creating challenge:", error);
    throw error;
  }
};

export const updateChallenge = async (
  id: number,
  name: string,
  description: string,
  level: "easy" | "medium" | "hard",
  points: number,
  visibility: boolean,
  eventId: number,
  categoryId: number,
  assets: string[] = [],
) => {
  try {
    const updatedChallenge = await db
      .update(ChallengeTable)
      .set({
        name,
        description,
        level,
        points,
        visibility,
        eventId,
        categoryId,
        assets,
      })
      .where(eq(ChallengeTable.id, id))
      .returning({
        id: ChallengeTable.id,
        name: ChallengeTable.name,
        description: ChallengeTable.description,
        level: ChallengeTable.level,
        points: ChallengeTable.points,
        visibility: ChallengeTable.visibility,
        eventId: ChallengeTable.eventId,
        categoryId: ChallengeTable.categoryId,
        assets: ChallengeTable.assets,
      });
    return updatedChallenge;
  } catch (error) {
    console.error("Error updating challenge:", error);
    throw error;
  }
};

export const deleteChallenge = async (id: number) => {
  try {
    const deletedChallenge = await db
      .delete(ChallengeTable)
      .where(eq(ChallengeTable.id, id))
      .returning({
        id: ChallengeTable.id,
        name: ChallengeTable.name,
        description: ChallengeTable.description,
        level: ChallengeTable.level,
        points: ChallengeTable.points,
        visibility: ChallengeTable.visibility,
        eventId: ChallengeTable.eventId,
        categoryId: ChallengeTable.categoryId,
        assets: ChallengeTable.assets,
      });
    return deletedChallenge;
  } catch (error) {
    console.error("Error deleting challenge:", error);
    throw error;
  }
};

// ======== Hints Repository Functions =====

export const getAllHints = async () => {
  try {
    const hints = await db.query.HintsTable.findMany();
    return hints;
  } catch (error) {
    console.error("Error fetching hints:", error);
    throw error;
  }
};

export const getHintsByChallengeId = async (challengeId: number) => {
  try {
    const hints = await db.query.HintsTable.findMany({
      where: { challengeId },
    });
    return hints;
  } catch (error) {
    console.error("Error fetching hints by challenge ID:", error);
    throw error;
  }
};

export const createHint = async (
  challengeId: number,
  hint: string,
  cost: number,
) => {
  try {
    const createdHint = await db
      .insert(HintsTable)
      .values({
        challengeId,
        hintText: hint,
        cost,
      })
      .returning({
        id: HintsTable.id,
        challengeId: HintsTable.challengeId,
        hintText: HintsTable.hintText,
        cost: HintsTable.cost,
      });
    return createdHint;
  } catch (error) {
    console.error("Error creating hint:", error);
    throw error;
  }
};

export const updateHint = async (
  hintId: number,
  hint: string,
  cost: number,
) => {
  try {
    const updatedHint = await db
      .update(HintsTable)
      .set({
        hintText: hint,
        cost,
      })
      .returning({
        id: HintsTable.id,
        challengeId: HintsTable.challengeId,
        hintText: HintsTable.hintText,
        cost: HintsTable.cost,
      })
      .where(eq(HintsTable.id, hintId));
    return updatedHint;
  } catch (error) {
    console.error("Error updating hint:", error);
    throw error;
  }
};

export const deleteHint = async (hintId: number) => {
  try {
    const deletedHint = await db
      .delete(HintsTable)
      .where(eq(HintsTable.id, hintId))
      .returning({
        id: HintsTable.id,
        challengeId: HintsTable.challengeId,
        hintText: HintsTable.hintText,
        cost: HintsTable.cost,
      });
    return deletedHint;
  } catch (error) {
    console.error("Error deleting hint:", error);
    throw error;
  }
};

// ======== Flag Repository Functions =====

export const getAllFlags = async () => {
  try {
    const flags = await db.query.FlagTable.findMany();
    return flags;
  } catch (error) {
    console.error("Error fetching flags:", error);
    throw error;
  }
};

export const getFlagByChallengeId = async (challengeId: number) => {
  try {
    const flag = await db.query.FlagTable.findFirst({
      where: { challengeId },
    });
    return flag;
  } catch (error) {
    console.error("Error fetching flag by challenge ID:", error);
    throw error;
  }
};

export const createFlag = async (challengeId: number, flag: string) => {
  try {
    const createdFlag = await db
      .insert(FlagTable)
      .values({
        challengeId,
        flagText: flag,
      })
      .returning({
        id: FlagTable.id,
        challengeId: FlagTable.challengeId,
        flagText: FlagTable.flagText,
      });
    return createdFlag;
  } catch (error) {
    console.error("Error creating flag:", error);
    throw error;
  }
};

export const updateFlag = async (challengeId: number, flag: string) => {
  try {
    const updatedFlag = await db
      .update(FlagTable)
      .set({
        flagText: flag,
      })
      .where(eq(FlagTable.challengeId, challengeId))
      .returning({
        id: FlagTable.id,
        challengeId: FlagTable.challengeId,
        flagText: FlagTable.flagText,
      });
    return updatedFlag;
  } catch (error) {
    console.error("Error updating flag:", error);
    throw error;
  }
};

export const deleteFlag = async (challengeId: number) => {
  try {
    const deletedFlag = await db
      .delete(FlagTable)
      .where(eq(FlagTable.challengeId, challengeId))
      .returning({
        id: FlagTable.id,
        challengeId: FlagTable.challengeId,
        flagText: FlagTable.flagText,
      });
    return deletedFlag;
  } catch (error) {
    console.error("Error deleting flag:", error);
    throw error;
  }
};
