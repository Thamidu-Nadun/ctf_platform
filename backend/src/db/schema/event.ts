import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const EventStatus = pgEnum("event_status", [
  "upcoming",
  "ongoing",
  "ended",
]);

export const EventTable = pgTable("events", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  story: text("story").notNull(),
  status: EventStatus("status").notNull().default("upcoming"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
});
