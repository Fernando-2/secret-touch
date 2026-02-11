// app/television/AdminBookings.tsx
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

  const statusPill = (status?: AdminBooking["status"]) => {
    const s = status ?? "pending";
    const base =
      "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold border";
    if (s === "confirmed")
      return (
        <span className={`${base} border-[#BFFB00]/30 bg-[#BFFB00]/10 text-[#BFFB00]`}>
          confirmed
        </span>
      );
    if (s === "cancelled")
      return (
        <span className={`${base} border-red-500/30 bg-red-500/10 text-red-300`}>
          cancelled
        </span>
      );
    return (
      <span className={`${base} border-white/15 bg-white/5 text-white/70`}>
        pending
      </span>
    );
  };

  return (
    <div className="space-y-3">
      {bookings.map((b) => (
        <div
          key={b.id}
          className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="font-semibold text-white">
                {b.name} <span className="text-white/50">—</span>{" "}
                <span className="text-white/80">{b.service}</span>
              </div>
              {statusPill(b.status)}
            </div>

            <div className="mt-1 text-xs text-white/70">
              {b.date} @ {b.time} <span className="text-white/40">•</span>{" "}
              {b.email}
            </div>

            <div className="mt-1 text-xs text-white/50">
              Booking ID: <span className="font-mono">{b.id}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => updateStatus(b.id, "confirmed")}
              className="rounded-xl bg-[#BFFB00] px-3 py-2 text-xs font-semibold text-black hover:opacity-90 transition"
            >
              Confirm
            </button>
            <button
              onClick={() => updateStatus(b.id, "cancelled")}
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200 hover:bg-red-500/15 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ))}

      {bookings.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/70">No bookings found.</p>
        </div>
      )}
    </div>
  );
}
