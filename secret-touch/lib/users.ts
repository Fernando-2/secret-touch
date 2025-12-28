// lib/users.ts
import { db } from "@/lib/db";
import { users } from "../src/db/schema"; 
import { desc, eq, sql } from "drizzle-orm";

export type UserRecord = {
  id: number;
  name: string;
  email: string;
  passwordHash: string; // bcrypt hash stored in DB
  createdAt: string;
};

/**
 * Get all users from MySQL.
 */
export async function getUsers(): Promise<UserRecord[]> {
  const rows = await db
    .select()
    .from(users)
    .orderBy(desc(users.createdAt));

  return rows.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    passwordHash: u.passwordHash,
    createdAt: u.createdAt instanceof Date ? u.createdAt.toISOString() : String(u.createdAt),
  }));
}

/**
 * Look up a user by email (case-insensitive).
 */
export async function getUserByEmail(email: string): Promise<UserRecord | null> {
  // case-insensitive match in MySQL:
  // using LOWER(email) = LOWER(?) keeps behavior consistent regardless of column collation
  const rows = await db
    .select()
    .from(users)
    .where(sql`lower(${users.email}) = lower(${email})`)
    .limit(1);

  const user = rows[0];
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    passwordHash: user.passwordHash,
    createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : String(user.createdAt),
  };
}

/**
 * Create a new user with a bcrypt-hashed password.
 * Pass in the already-hashed password as passwordHash.
 */
export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
}): Promise<UserRecord> {
  // Check if email already exists (case-insensitive)
  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(sql`lower(${users.email}) = lower(${input.email})`)
    .limit(1);

  if (existing.length > 0) {
    throw new Error("User with this email already exists");
  }

  // Insert user
  const result = await db.insert(users).values({
    name: input.name,
    email: input.email,
    passwordHash: input.passwordHash,
  });

  // mysql2 returns insertId on result[0] internally; drizzle exposes it via result.insertId in many setups.
  // We'll safely re-query by email to return a complete record.
  const created = await getUserByEmail(input.email);
  if (!created) throw new Error("Failed to create user");

  return created;
}
