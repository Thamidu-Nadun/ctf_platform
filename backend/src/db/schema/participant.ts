import {
  pgTable,
  varchar,
  serial,
  primaryKey,
  timestamp,
} from "drizzle-orm/pg-core";
import { UserTable } from "./users";
import { EventTable } from "./event";

export const ParticipantTable = pgTable(
  "participants",
  {
    userId: varchar("user_id", { length: 50 })
      .notNull()
      .references(() => UserTable.id),
    eventId: serial("event_id")
      .notNull()
      .references(() => EventTable.id),
    joinedAt: timestamp("joined_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.eventId] }),
    };
  },
);
