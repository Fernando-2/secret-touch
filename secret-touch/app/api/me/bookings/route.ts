// app/api/me/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookings } from "../../../../src/db/schema"; // adjust path if needed
import { desc, eq } from "drizzle-orm";

export const runtime = "nodejs";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const userIdCookie = req.cookies.get("user_session")?.value;
    if (!userIdCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = Number(userIdCookie);
    if (Number.isNaN(userId)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rows = await db
      .select({
        id: bookings.id,
        service: bookings.service,
        date: bookings.date,
        time: bookings.time,
        status: bookings.status,
        paymentStatus: bookings.paymentStatus,
        priceCents: bookings.priceCents,
        createdAt: bookings.createdAt,
      })
      .from(bookings)
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.date), desc(bookings.createdAt));

    const result = rows.map((b) => ({
      ...b,
      createdAt: b.createdAt.toISOString(),
    }));

    return NextResponse.json({ bookings: result }, { status: 200 });
  } catch (err) {
    console.error("GET /api/me/bookings error:", err);
    return NextResponse.json(
      { error: "Failed to load bookings" },
      { status: 500 }
    );
  }
}
