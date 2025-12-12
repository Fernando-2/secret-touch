// app/television/admin-bookings.tsx (for example)
"use client";

import { useEffect, useState } from "react";

type AdminBooking = {
  id: number;
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  status?: "pending" | "confirmed" | "cancelled";
};

export function AdminBookings() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);

  async function load() {
    const res = await fetch("/api/bookings", { cache: "no-store" });
    const data = await res.json();
    setBookings(data.bookings ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  return (
    <div className="space-y-3">
      {bookings.map((b) => (
        <div
          key={b.id}
          className="flex items-center justify-between rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
        >
          <div>
            <div className="font-medium">
              {b.name} – {b.service}
            </div>
            <div className="text-xs text-slate-300">
              {b.date} @ {b.time} • {b.email}
            </div>
            <div className="mt-1 text-xs">
              Status:{" "}
              <span className="font-semibold">{b.status ?? "pending"}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => updateStatus(b.id, "confirmed")}
              className="rounded-md bg-emerald-500 px-2 py-1 text-xs font-semibold text-slate-900 hover:bg-emerald-400"
            >
              Confirm
            </button>
            <button
              onClick={() => updateStatus(b.id, "cancelled")}
              className="rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-slate-900 hover:bg-red-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
