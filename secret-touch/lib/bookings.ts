// lib/bookings.ts
import { prisma } from "@/lib/db";
import { BookingStatus as DbBookingStatus } from "@/generated/prisma/client";

export type ServiceType = "interior" | "exterior" | "full";

export type BookingPayload = {
  service: ServiceType;
  date: string;   // "YYYY-MM-DD"
  time: string;   // "8:00 AM"
  name: string;
  email: string;
  vehicle: string;
  notes?: string;
};

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type BookingRecord = BookingPayload & {
  id: number;
  createdAt: string;
  status: BookingStatus;
  internalNotes?: string;
};

function fromDbStatus(status: DbBookingStatus): BookingStatus {
  switch (status) {
    case DbBookingStatus.CONFIRMED:
      return "confirmed";
    case DbBookingStatus.CANCELLED:
      return "cancelled";
    case DbBookingStatus.PENDING:
    default:
      return "pending";
  }
}

function toDbStatus(status: BookingStatus): DbBookingStatus {
  switch (status) {
    case "confirmed":
      return DbBookingStatus.CONFIRMED;
    case "cancelled":
      return DbBookingStatus.CANCELLED;
    case "pending":
    default:
      return DbBookingStatus.PENDING;
  }
}

function mapDbBookingToRecord(db: {
  id: number;
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  vehicle: string;
  notes: string | null;
  internalNotes: string | null;
  status: DbBookingStatus;
  createdAt: Date;
}): BookingRecord {
  return {
    id: db.id,
    service: db.service as ServiceType,
    date: db.date,
    time: db.time,
    name: db.name,
    email: db.email,
    vehicle: db.vehicle,
    notes: db.notes ?? undefined,
    internalNotes: db.internalNotes ?? undefined,
    status: fromDbStatus(db.status),
    createdAt: db.createdAt.toISOString(),
  };
}

export async function getBookings(): Promise<BookingRecord[]> {
  const rows = await prisma.booking.findMany({
    orderBy: { date: "asc" },
  });

  return rows.map((row) =>
    mapDbBookingToRecord({
      id: row.id,
      service: row.service,
      date: row.date,
      time: row.time,
      name: row.name,
      email: row.email,
      vehicle: row.vehicle,
      notes: row.notes ?? null,
      internalNotes: row.internalNotes ?? null,
      status: row.status,
      createdAt: row.createdAt,
    })
  );
}

export async function addBooking(
  payload: BookingPayload & { userId?: number | null }
): Promise<BookingRecord> {
  const created = await prisma.booking.create({
    data: {
      userId: payload.userId ?? null,
      service: payload.service,
      date: payload.date,
      time: payload.time,
      name: payload.name,
      email: payload.email,
      vehicle: payload.vehicle,
      notes: payload.notes ?? null,
      internalNotes: "",
      status: DbBookingStatus.PENDING, // admin will confirm
    },
  });

  return mapDbBookingToRecord({
    id: created.id,
    service: created.service,
    date: created.date,
    time: created.time,
    name: created.name,
    email: created.email,
    vehicle: created.vehicle,
    notes: created.notes ?? null,
    internalNotes: created.internalNotes ?? null,
    status: created.status,
    createdAt: created.createdAt,
  });
}

export async function updateBooking(
  id: number,
  updates: Partial<Pick<BookingRecord, "status" | "date" | "time" | "internalNotes">>
): Promise<BookingRecord | null> {
  // translate our union status to DB enum if provided
  const data: any = {};

  if (updates.status) {
    data.status = toDbStatus(updates.status);
  }
  if (updates.date) data.date = updates.date;
  if (updates.time) data.time = updates.time;
  if (typeof updates.internalNotes === "string") {
    data.internalNotes = updates.internalNotes;
  }

  if (Object.keys(data).length === 0) {
    return null;
  }

  const updated = await prisma.booking.update({
    where: { id },
    data,
  });

  return mapDbBookingToRecord({
    id: updated.id,
    service: updated.service,
    date: updated.date,
    time: updated.time,
    name: updated.name,
    email: updated.email,
    vehicle: updated.vehicle,
    notes: updated.notes ?? null,
    internalNotes: updated.internalNotes ?? null,
    status: updated.status,
    createdAt: updated.createdAt,
  });
}
