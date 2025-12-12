// app/api/me/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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

    const bookings = await prisma.booking.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      select: {
        id: true,
        service: true,
        date: true,
        time: true,
        status: true,
        paymentStatus: true,
        priceCents: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (err) {
    console.error("GET /api/me/bookings error:", err);
    return NextResponse.json(
      { error: "Failed to load bookings" },
      { status: 500 }
    );
  }
}
