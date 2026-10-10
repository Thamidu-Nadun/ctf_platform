import { defineRelations } from "drizzle-orm";
import { UserTable } from "./schema/users";
import { EventTable } from "./schema/event";
import { ChallengeTable, FlagTable, HintsTable } from "./schema/challenge";
import { SubmissionTable } from "./schema/submission";
import { CategoryTable } from "./schema/category";
import { ParticipantTable } from "./schema/participant";

export const relations = defineRelations(
  {
    UserTable,
    EventTable,
    ChallengeTable,
    FlagTable,
    HintsTable,
    SubmissionTable,
    CategoryTable,
    ParticipantTable,
  },
  (r) => ({
    UserTable: {
      participants: r.many.ParticipantTable(),
      submissions: r.many.SubmissionTable(),
    },
    ChallengeTable: {
      category: r.one.CategoryTable({
        from: r.ChallengeTable.categoryId,
        to: r.CategoryTable.id,
      }),
      event: r.one.EventTable({
        from: r.ChallengeTable.eventId,
        to: r.EventTable.id,
      }),
      submissions: r.many.SubmissionTable(),
      hints: r.many.HintsTable({
        from: r.ChallengeTable.id,
        to: r.HintsTable.challengeId,
      }),
      flags: r.many.FlagTable({
        from: r.ChallengeTable.id,
        to: r.FlagTable.challengeId,
      }),
    },
    EventTable: {
      participants: r.many.ParticipantTable(),
      submissions: r.many.SubmissionTable(),
    },
    SubmissionTable: {
      user: r.one.UserTable({
        from: r.SubmissionTable.userId,
        to: r.UserTable.id,
      }),
      challenge: r.one.ChallengeTable({
        from: r.SubmissionTable.challengeId,
        to: r.ChallengeTable.id,
      }),
      event: r.one.EventTable({
        from: r.SubmissionTable.eventId,
        to: r.EventTable.id,
      }),
    },
    CategoryTable: {
      challenges: r.many.ChallengeTable({
        from: r.CategoryTable.id,
        to: r.ChallengeTable.categoryId,
      }),
    },
    ParticipantTable: {
      event: r.one.EventTable({
        from: r.ParticipantTable.eventId,
        to: r.EventTable.id,
      }),
      user: r.one.UserTable({
        from: r.ParticipantTable.userId,
        to: r.UserTable.id,
      }),
    },
    HintsTable: {
      challenge: r.one.ChallengeTable({
        from: r.HintsTable.challengeId,
        to: r.ChallengeTable.id,
      }),
    },
    FlagTable: {
      challenge: r.one.ChallengeTable({
        from: r.FlagTable.challengeId,
        to: r.ChallengeTable.id,
      }),
    },
  }),
);
