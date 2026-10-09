import { index, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["admin", "user"]);

export const userTable = pgTable(
  "users",
  {
    id: varchar("id", { length: 50 })
      .primaryKey()
      .$default(() => `u-${crypto.randomUUID()}`),
    name: varchar("username", { length: 256 }).notNull().unique(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    password: varchar("password", { length: 256 }).notNull(),
    role: userRole("role").notNull().default("user"),
  },
  (table) => [
    index("user_email_index").on(table.email),
    index("user_username_index").on(table.name),
  ],
);
