// lib/users.ts
import { prisma } from "./db";

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
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    passwordHash: u.passwordHash,
    createdAt: u.createdAt.toISOString(),
  }));
}

/**
 * Look up a user by email (case-insensitive).
 */
export async function getUserByEmail(
  email: string
): Promise<UserRecord | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    passwordHash: user.passwordHash,
    createdAt: user.createdAt.toISOString(),
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
  // Check if email already exists
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existing) {
    throw new Error("User with this email already exists");
  }

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash: input.passwordHash,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    passwordHash: user.passwordHash,
    createdAt: user.createdAt.toISOString(),
  };
}
