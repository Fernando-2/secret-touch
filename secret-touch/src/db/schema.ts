import { mysqlTable, serial, int, varchar, datetime } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const users = mysqlTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),

  // IMPORTANT: change this string if your column is password_hash instead of passwordHash
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),

  createdAt: datetime("createdAt", { mode: "date", fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3)`)
    .notNull(),
});

export const bookings = mysqlTable("booking", {
  id: serial("id").primaryKey(),
  service: varchar("service", { length: 191 }).notNull(),
  date: varchar("date", { length: 191 }).notNull(),
  time: varchar("time", { length: 191 }).notNull(),
  name: varchar("name", { length: 191 }).notNull(),
  email: varchar("email", { length: 191 }).notNull(),
  vehicle: varchar("vehicle", { length: 191 }).notNull(),
  notes: varchar("notes", { length: 191 }),
  internalNotes: varchar("internalNotes", { length: 191 }),
  status: varchar("status", { length: 32 }).notNull(),
  createdAt: datetime("createdAt", { mode: "date", fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3)`)
    .notNull(),
  userId: int("userId"),
  confirmedAt: datetime("confirmedAt", { mode: "date", fsp: 3 }),
  paymentStatus: varchar("paymentStatus", { length: 32 }).notNull(),
  priceCents: int("priceCents").notNull(),
});
