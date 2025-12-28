// app/api/bookings/public/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";
import { bookings } from "../../../../src/db/schema"; // adjust path if needed
import { asc } from "drizzle-orm";

export const runtime = "nodejs";
export const revalidate = 0;

export async function GET(_req: NextRequest) {
  try {
    const rows = await db
      .select({
        id: bookings.id,
        date: bookings.date,
        time: bookings.time,
        status: bookings.status,
      })
      .from(bookings)
      .orderBy(asc(bookings.date), asc(bookings.time));

    const slots = rows.map((row) => {
      const status = row.status; // "PENDING" | "CONFIRMED" | "CANCELLED" (string)

      return {
        id: row.id,
        date: row.date,
        time: row.time,
        status:
          status === "CANCELLED"
            ? "cancelled"
            : status === "CONFIRMED"
            ? "confirmed"
            : "pending",
        isBooked: status !== "CANCELLED",
      };
    });

    return NextResponse.json({ slots }, { status: 200 });
  } catch (err) {
    console.error("GET /api/bookings/public error:", err);
    return NextResponse.json(
      { error: "Failed to load public bookings" },
      { status: 500 }
    );
  }
}
