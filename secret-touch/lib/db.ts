// lib/db.ts
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

declare global {
  // eslint-disable-next-line no-var
  var mysqlPool: mysql.Pool | undefined;
}

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return url;
}

// Reuse the pool in dev (prevents creating too many connections on hot reload)
export const pool =
  global.mysqlPool ??
  mysql.createPool({
    uri: getDatabaseUrl(),
    connectionLimit: 10,
  });

if (process.env.NODE_ENV !== "production") global.mysqlPool = pool;

export const db = drizzle(pool);
