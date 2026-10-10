import {
  integer,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { EventTable } from "./event";
import { ChallengeTable } from "./challenge";
import { UserTable } from "./users";

export const SubmissionTable = pgTable("submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id", { length: 50 })
    .notNull()
    .references(() => UserTable.id),
  eventId: serial("event_id")
    .notNull()
    .references(() => EventTable.id),
  challengeId: serial("challenge_id")
    .notNull()
    .references(() => ChallengeTable.id),
  points: integer("points").notNull().default(0),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});
