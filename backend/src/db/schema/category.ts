import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const CategoryTable = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});
