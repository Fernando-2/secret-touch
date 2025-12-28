// lib/bookings.ts
import { db } from "@/lib/db";
import { bookings } from "../src/db/schema"; 
import { asc, desc, eq } from "drizzle-orm";

export type ServiceType = "interior" | "exterior" | "full";

export type BookingPayload = {
  service: ServiceType;
  date: string; // "YYYY-MM-DD"
  time: string; // "8:00 AM"
  name: string;
  email: string;
  vehicle: string;
  notes?: string;
};

export type BookingStatus = "pending" | "confirmed" | "cancelled";

// DB stores uppercase strings (like Prisma enum style)
type DbBookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

// payment status is whatever strings you use in DB
export type PaymentStatus = string;

export type BookingRecord = BookingPayload & {
  id: number;
  createdAt: string;
  status: BookingStatus;
  internalNotes?: string;
  paymentStatus: PaymentStatus;
  priceCents: number;
  userId?: number | null;
};

function fromDbStatus(status: string): BookingStatus {
  switch (status as DbBookingStatus) {
    case "CONFIRMED":
      return "confirmed";
    case "CANCELLED":
      return "cancelled";
    case "PENDING":
    default:
      return "pending";
  }
}

function toDbStatus(status: BookingStatus): DbBookingStatus {
  switch (status) {
    case "confirmed":
      return "CONFIRMED";
    case "cancelled":
      return "CANCELLED";
    case "pending":
    default:
      return "PENDING";
  }
}

function mapRowToRecord(row: {
  id: number;
  userId: number | null;
  service: string;
  date: string;
  time: string;
  status: string;
  paymentStatus: string;
  priceCents: number;
  notes: string | null;
  internalNotes: string | null;
  createdAt: Date;
  name: string;
  email: string;
  vehicle: string;
}): BookingRecord {
  return {
    id: row.id,
    userId: row.userId,
    service: row.service as ServiceType,
    date: row.date,
    time: row.time,
    name: row.name,
    email: row.email,
    vehicle: row.vehicle,
    notes: row.notes ?? undefined,
    internalNotes: row.internalNotes ?? undefined,
    status: fromDbStatus(row.status),
    paymentStatus: row.paymentStatus,
    priceCents: row.priceCents,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function getBookings(): Promise<BookingRecord[]> {
  const rows = await db
    .select({
      id: bookings.id,
      userId: bookings.userId,
      service: bookings.service,
      date: bookings.date,
      time: bookings.time,
      status: bookings.status,
      paymentStatus: bookings.paymentStatus,
      priceCents: bookings.priceCents,
      notes: bookings.notes,
      internalNotes: bookings.internalNotes,
      createdAt: bookings.createdAt,
      name: bookings.name,
      email: bookings.email,
      vehicle: bookings.vehicle,
    })
    .from(bookings)
    .orderBy(asc(bookings.date), asc(bookings.time));

  return rows.map((r) =>
    mapRowToRecord({
      ...r,
      notes: (r.notes ?? null) as string | null,
      internalNotes: (r.internalNotes ?? null) as string | null,
    })
  );
}

export async function getBookingsForUser(userId: number): Promise<BookingRecord[]> {
  const rows = await db
    .select({
      id: bookings.id,
      userId: bookings.userId,
      service: bookings.service,
      date: bookings.date,
      time: bookings.time,
      status: bookings.status,
      paymentStatus: bookings.paymentStatus,
      priceCents: bookings.priceCents,
      notes: bookings.notes,
      internalNotes: bookings.internalNotes,
      createdAt: bookings.createdAt,
      name: bookings.name,
      email: bookings.email,
      vehicle: bookings.vehicle,
    })
    .from(bookings)
    .where(eq(bookings.userId, userId))
    .orderBy(desc(bookings.date), desc(bookings.createdAt));

  return rows.map((r) =>
    mapRowToRecord({
      ...r,
      notes: (r.notes ?? null) as string | null,
      internalNotes: (r.internalNotes ?? null) as string | null,
    })
  );
}

export async function addBooking(
  payload: BookingPayload & {
    userId?: number | null;
    // allow caller to set payment fields; default if omitted
    paymentStatus?: string;
    priceCents?: number;
  }
): Promise<BookingRecord> {
  await db.insert(bookings).values({
    userId: payload.userId ?? null,
    service: payload.service,
    date: payload.date,
    time: payload.time,
    status: "PENDING",
    paymentStatus: payload.paymentStatus ?? "UNPAID",
    priceCents: payload.priceCents ?? 0,
    notes: payload.notes ?? null,
    internalNotes: "",
    name: payload.name,
    email: payload.email,
    vehicle: payload.vehicle,
  });

  // safest cross-driver way: re-read latest booking for that email/date/time
  const createdRows = await db
    .select({
      id: bookings.id,
      userId: bookings.userId,
      service: bookings.service,
      date: bookings.date,
      time: bookings.time,
      status: bookings.status,
      paymentStatus: bookings.paymentStatus,
      priceCents: bookings.priceCents,
      notes: bookings.notes,
      internalNotes: bookings.internalNotes,
      createdAt: bookings.createdAt,
      name: bookings.name,
      email: bookings.email,
      vehicle: bookings.vehicle,
    })
    .from(bookings)
    .where(eq(bookings.email, payload.email))
    .orderBy(desc(bookings.createdAt))
    .limit(1);

  const created = createdRows[0];
  if (!created) throw new Error("Failed to create booking");

  return mapRowToRecord({
    ...created,
    notes: (created.notes ?? null) as string | null,
    internalNotes: (created.internalNotes ?? null) as string | null,
  });
}

export async function updateBooking(
  id: number,
  updates: Partial<
    Pick<
      BookingRecord,
      "status" | "date" | "time" | "internalNotes" | "paymentStatus" | "priceCents"
    >
  >
): Promise<BookingRecord | null> {
  const data: Partial<{
    status: DbBookingStatus;
    date: string;
    time: string;
    internalNotes: string;
    paymentStatus: string;
    priceCents: number;
  }> = {};

  if (updates.status) data.status = toDbStatus(updates.status);
  if (updates.date) data.date = updates.date;
  if (updates.time) data.time = updates.time;
  if (typeof updates.internalNotes === "string") data.internalNotes = updates.internalNotes;
  if (typeof updates.paymentStatus === "string") data.paymentStatus = updates.paymentStatus;
  if (typeof updates.priceCents === "number") data.priceCents = updates.priceCents;

  if (Object.keys(data).length === 0) return null;

  const res = await db.update(bookings).set(data).where(eq(bookings.id, id));
  const affected = Number((res as any).affectedRows ?? (res as any).rowsAffected ?? 0);
  if (affected === 0) return null;

  const updatedRows = await db
    .select({
      id: bookings.id,
      userId: bookings.userId,
      service: bookings.service,
      date: bookings.date,
      time: bookings.time,
      status: bookings.status,
      paymentStatus: bookings.paymentStatus,
      priceCents: bookings.priceCents,
      notes: bookings.notes,
      internalNotes: bookings.internalNotes,
      createdAt: bookings.createdAt,
      name: bookings.name,
      email: bookings.email,
      vehicle: bookings.vehicle,
    })
    .from(bookings)
    .where(eq(bookings.id, id))
    .limit(1);

  const updated = updatedRows[0];
  if (!updated) return null;

  return mapRowToRecord({
    ...updated,
    notes: (updated.notes ?? null) as string | null,
    internalNotes: (updated.internalNotes ?? null) as string | null,
  });
}
