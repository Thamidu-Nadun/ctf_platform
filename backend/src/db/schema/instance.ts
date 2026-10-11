import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
import { ChallengeTable } from "./challenge";
import { UserTable } from "./schema";

export const EnvironmentTable = pgTable("environments", {
  id: serial("id").primaryKey(),
  imageName: text("image_name").notNull(),
  repoUrl: text("repo_url").notNull(),
});

export const InstanceStatus = pgEnum("instance_status", [
  "pending",
  "running",
  "stopped",
  "error",
]);

export const InstanceTable = pgTable("instances", {
  id: varchar("id", { length: 50 })
    .primaryKey()
    .$default(() => `i-${crypto.randomUUID()}`),
  environmentId: serial("environment_id")
    .notNull()
    .references(() => EnvironmentTable.id),
  challengeId: serial("challenge_id")
    .notNull()
    .references(() => ChallengeTable.id),
  userId: varchar("user_id", { length: 50 })
    .notNull()
    .references(() => UserTable.id),
  status: InstanceStatus("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at").notNull().defaultNow(),
  targetUrl: text("target_url").notNull(),
});
