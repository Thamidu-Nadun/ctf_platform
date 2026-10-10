import { defineRelations } from "drizzle-orm";
import { UserTable } from "./schema/users";
import { EventTable } from "./schema/event";
import { ChallengeTable, FlagTable, HintsTable } from "./schema/challenge";
import { SubmissionTable } from "./schema/submission";
import { CategoryTable } from "./schema/category";
import { ParticipantTable } from "./schema/participant";
import { EnvironmentTable, InstanceTable } from "./schema/instance";

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
    InstanceTable,
    EnvironmentTable,
  },
  (r) => ({
    // UserTable relations
    UserTable: {
      participants: r.many.ParticipantTable({
        from: r.UserTable.id,
        to: r.ParticipantTable.userId,
      }),
      submissions: r.many.SubmissionTable({
        from: r.UserTable.id,
        to: r.SubmissionTable.userId,
      }),
      instances: r.many.InstanceTable({
        from: r.UserTable.id,
        to: r.InstanceTable.userId,
      }),
    },

    // ChallengeTable relations
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

    // EventTable relations
    EventTable: {
      participants: r.many.ParticipantTable({
        from: r.EventTable.id,
        to: r.ParticipantTable.eventId,
      }),
      challenges: r.many.ChallengeTable({
        from: r.EventTable.id,
        to: r.ChallengeTable.eventId,
      }),
      submissions: r.many.SubmissionTable({
        from: r.EventTable.id,
        to: r.SubmissionTable.eventId,
      }),
    },

    // SubmissionTable relations
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

    // CategoryTable relations
    CategoryTable: {
      challenges: r.many.ChallengeTable({
        from: r.CategoryTable.id,
        to: r.ChallengeTable.categoryId,
      }),
    },

    // ParticipantTable relations
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

    // HintsTable relations
    HintsTable: {
      challenge: r.one.ChallengeTable({
        from: r.HintsTable.challengeId,
        to: r.ChallengeTable.id,
      }),
    },

    // FlagTable relations
    FlagTable: {
      challenge: r.one.ChallengeTable({
        from: r.FlagTable.challengeId,
        to: r.ChallengeTable.id,
      }),
    },

    // EnvironmentTable relations
    EnvironmentTable: {
      instances: r.many.InstanceTable({
        from: r.EnvironmentTable.id,
        to: r.InstanceTable.environmentId,
      }),
    },

    // InstanceTable relations
    InstanceTable: {
      user: r.one.UserTable({
        from: r.InstanceTable.userId,
        to: r.UserTable.id,
      }),
      challenge: r.one.ChallengeTable({
        from: r.InstanceTable.challengeId,
        to: r.ChallengeTable.id,
      }),
      environment: r.one.EnvironmentTable({
        from: r.InstanceTable.environmentId,
        to: r.EnvironmentTable.id,
      }),
    },
  }),
);
