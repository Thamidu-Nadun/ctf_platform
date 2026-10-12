import {
  pgTable,
  serial,
  text,
  boolean,
  varchar,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { EventTable } from "./event";
import { CategoryTable } from "./category";

export const ChallengeLevel = pgEnum("challenge_level", [
  "easy",
  "medium",
  "hard",
]);

export const ChallengeTable = pgTable("challenges", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description").notNull(),
  level: ChallengeLevel("level").notNull().default("easy"),
  points: integer("points").notNull().default(0),
  visibility: boolean("visibility").notNull().default(true),
  eventId: serial("event_id")
    .references(() => EventTable.id)
    .notNull(),
  categoryId: serial("category_id")
    .references(() => CategoryTable.id)
    .notNull(),
  assets: text("assets").array(),
});

export const HintsTable = pgTable("hints", {
  id: serial("id").primaryKey(),
  challengeId: serial("challenge_id")
    .references(() => ChallengeTable.id)
    .notNull(),
  hintText: text("hint_text").notNull(),
  cost: integer("cost").notNull().default(0),
});

export const FlagTable = pgTable("flags", {
  id: serial("id").primaryKey(),
  challengeId: serial("challenge_id")
    .references(() => ChallengeTable.id)
    .notNull(),
  flagText: text("flag_text").notNull(),
});
