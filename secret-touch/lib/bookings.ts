// lib/bookings.ts
import fs from "fs/promises";
import path from "path";

export type ServiceType = "interior" | "exterior" | "full";

export type BookingPayload = {
  service: ServiceType;
  date: string;   // YYYY-MM-DD
  time: string;   // "8:00 AM" etc.
  name: string;
  email: string;
  vehicle: string;
  notes?: string;
};

export type BookingRecord = BookingPayload & {
  id: number;
  createdAt: string;
};

const dataFilePath = path.join(process.cwd(), "data", "bookings.json");

async function ensureFileExists() {
  try {
    await fs.access(dataFilePath);
  } catch {
    // Make sure directory exists, then create empty array file
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
    await fs.writeFile(dataFilePath, "[]", "utf8");
  }
}

export async function getBookings(): Promise<BookingRecord[]> {
  await ensureFileExists();
  const content = await fs.readFile(dataFilePath, "utf8");
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) return parsed as BookingRecord[];
    return [];
  } catch {
    return [];
  }
}

export async function addBooking(
  payload: BookingPayload
): Promise<BookingRecord> {
  const bookings = await getBookings();
  const nextId = bookings.length ? bookings[bookings.length - 1].id + 1 : 1;

  const newBooking: BookingRecord = {
    id: nextId,
    createdAt: new Date().toISOString(),
    ...payload,
  };

  bookings.push(newBooking);

  await fs.writeFile(
    dataFilePath,
    JSON.stringify(bookings, null, 2),
    "utf8"
  );

  return newBooking;
}
