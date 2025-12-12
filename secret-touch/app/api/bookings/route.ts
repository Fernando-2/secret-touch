// app/api/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { addBooking, getBookings, type BookingPayload } from "@/lib/bookings";

export const runtime = "nodejs";
export const revalidate = 0;

export async function GET(_req: NextRequest) {
  try {
    const bookings = await getBookings();
    return NextResponse.json({ bookings }, { status: 200 });
  } catch (err) {
    console.error("GET /api/bookings error:", err);
    return NextResponse.json(
      { error: "Failed to load bookings" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BookingPayload;

    if (
      !body.service ||
      !body.date ||
      !body.time ||
      !body.name ||
      !body.email ||
      !body.vehicle
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // if you attached userId via cookie earlier, you can also pull it from req.cookies here
    const booking = await addBooking({ ...body, userId: null });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (err) {
    console.error("POST /api/bookings error:", err);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
