import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const globalForDb = globalThis as unknown as { pool?: mysql.Pool };

// Reuse pool across hot reloads in dev
export const pool =
  globalForDb.pool ??
  mysql.createPool({
    uri: process.env.DATABASE_URL!,
    connectionLimit: 10,
  });

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;

export const db = drizzle(pool);
