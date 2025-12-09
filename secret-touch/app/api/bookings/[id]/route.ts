// app/api/bookings/[id]/route.ts
import { NextResponse } from "next/server";
import { updateBooking } from "../../../../lib/bookings";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body = await req.json();
    const allowedFields = ["status", "date", "time", "internalNotes"];

    const updates: any = {};
    for (const key of allowedFields) {
      if (key in body) updates[key] = body[key];
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const updated = await updateBooking(id, updates);

    if (!updated) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ booking: updated }, { status: 200 });
  } catch (err) {
    console.error("PATCH /api/bookings/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}
