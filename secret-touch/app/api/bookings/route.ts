// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import { addBooking, getBookings, BookingPayload } from "@/lib/bookings";

// Make sure we run on Node (needed for fs)
export const runtime = "nodejs";
// Always serve fresh data
export const revalidate = 0;

export async function GET() {
  try {
    const bookings = await getBookings();
    return NextResponse.json({ bookings });
  } catch (err) {
    console.error("GET /api/bookings error:", err);
    return NextResponse.json(
      { error: "Failed to load bookings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as BookingPayload;

    // Very simple validation
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

    const booking = await addBooking(body);

    return NextResponse.json({ booking }, { status: 201 });
  } catch (err) {
    console.error("POST /api/bookings error:", err);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
