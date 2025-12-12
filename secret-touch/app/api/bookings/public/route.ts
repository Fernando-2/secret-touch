import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { BookingStatus } from "@/generated/prisma/client";

export const runtime = "nodejs";
export const revalidate = 0;

export async function GET(_req: NextRequest) {
  try {
    const rows = await prisma.booking.findMany({
      orderBy: { date: "asc" },
      select: {
        id: true,
        date: true,
        time: true,
        status: true,
      },
    });

    const slots = rows.map((row) => ({
      id: row.id,
      date: row.date,
      time: row.time,
      status:
        row.status === BookingStatus.CANCELLED
          ? "cancelled"
          : row.status === BookingStatus.CONFIRMED
          ? "confirmed"
          : "pending",
      isBooked: row.status !== BookingStatus.CANCELLED,
    }));

    return NextResponse.json({ slots }, { status: 200 });
  } catch (err) {
    console.error("GET /api/bookings/public error:", err);
    return NextResponse.json(
      { error: "Failed to load public bookings" },
      { status: 500 }
    );
  }
}
