// app/television/AdminBookings.tsx
"use client";

import { useEffect, useState } from "react";

type ServiceType = "interior" | "exterior" | "full";
type BookingStatus = "confirmed" | "completed" | "cancelled";

type BookingRecord = {
  id: number;
  date: string;
  time: string;
  name: string;
  email: string;
  vehicle: string;
  notes?: string;
  service: ServiceType;
  createdAt: string;
  status?: BookingStatus;
  internalNotes?: string;
};

function parseBookingDateTime(date: string, time: string): Date {
  // date: YYYY-MM-DD, time: "8:00 AM"
  try {
    const [timePart, ampm] = time.split(" ");
    const [hStr, mStr] = timePart.split(":");
    let hour = parseInt(hStr, 10);
    const minute = parseInt(mStr, 10) || 0;

    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;

    const iso = `${date}T${String(hour).padStart(2, "0")}:${String(
      minute
    ).padStart(2, "0")}:00`;
    return new Date(iso);
  } catch {
    return new Date(date);
  }
}

function getCancellationInfo(booking: BookingRecord): string {
  const now = new Date();
  const dt = parseBookingDateTime(booking.date, booking.time);
  const diffHours = (dt.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (diffHours >= 48) {
    return "Free cancellation window (48+ hours before).";
  }
  if (diffHours >= 24) {
    return "Within 24–48 hours: still free per policy.";
  }
  if (diffHours > 0) {
    return "Less than 24 hours: 50% charge applies per policy.";
  }
  return "Appointment time has passed.";
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/bookings", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load bookings");
        const data = await res.json();
        setBookings(data.bookings || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const sorted = [...bookings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const updateBookingLocal = (updated: BookingRecord) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === updated.id ? updated : b))
    );
  };

  const handleStatusChange = async (id: number, status: BookingStatus) => {
    setSavingId(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        console.error(await res.json());
        return;
      }
      const data = await res.json();
      updateBookingLocal(data.booking);
    } catch (err) {
      console.error(err);
    } finally {
      setSavingId(null);
    }
  };

  const handleInternalNotesChange = async (
    id: number,
    internalNotes: string
  ) => {
    setSavingId(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ internalNotes }),
      });
      if (!res.ok) {
        console.error(await res.json());
        return;
      }
      const data = await res.json();
      updateBookingLocal(data.booking);
    } catch (err) {
      console.error(err);
    } finally {
      setSavingId(null);
    }
  };

  const handleReschedule = async (
    id: number,
    date: string,
    time: string
  ) => {
    setSavingId(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time }),
      });
      if (!res.ok) {
        console.error(await res.json());
        return;
      }
      const data = await res.json();
      updateBookingLocal(data.booking);
    } catch (err) {
      console.error(err);
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return <p className="text-sm text-slate-300">Loading bookings…</p>;
  }

  if (sorted.length === 0) {
    return (
      <p className="text-sm text-slate-300">
        No bookings yet. Once a customer submits the booking form, you&apos;ll
        see it here.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-400">
        Policy support: highlight when a cancellation would be free vs when a
        50% charge applies based on the appointment time.
      </p>

      <div className="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-900/40">
        <table className="min-w-full text-xs md:text-sm">
          <thead className="bg-slate-900">
            <tr className="text-left text-[11px] text-slate-400 uppercase tracking-wide">
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">When</th>
              <th className="px-3 py-2">Customer</th>
              <th className="px-3 py-2">Service</th>
              <th className="px-3 py-2">Policy</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Owner Notes</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((b) => {
              const status: BookingStatus = b.status || "confirmed";
              const policyInfo = getCancellationInfo(b);
              const isSaving = savingId === b.id;

              return (
                <tr
                  key={b.id}
                  className="border-t border-slate-800 hover:bg-slate-900/70 align-top"
                >
                  <td className="px-3 py-2 text-slate-200 whitespace-nowrap">
                    {b.id}
                  </td>
                  <td className="px-3 py-2 text-slate-200 whitespace-nowrap">
                    <div>{b.date}</div>
                    <div className="text-[11px] text-slate-400">
                      {b.time}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-slate-200 min-w-[140px]">
                    <div>{b.name}</div>
                    <div className="text-[11px] text-slate-400">
                      {b.email}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {b.vehicle}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-slate-200">
                    <div className="capitalize">{b.service}</div>
                    {b.notes && (
                      <div className="text-[11px] text-slate-400 mt-1">
                        “{b.notes}”
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-slate-300 max-w-xs">
                    {policyInfo}
                  </td>
                  <td className="px-3 py-2 text-slate-200">
                    <span
                      className={[
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px]",
                        status === "confirmed" &&
                          "bg-sky-500/10 text-sky-300 border border-sky-500/40",
                        status === "completed" &&
                          "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40",
                        status === "cancelled" &&
                          "bg-red-500/10 text-red-300 border border-red-500/40",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-slate-200 min-w-[160px]">
                    <textarea
                      defaultValue={b.internalNotes || ""}
                      onBlur={(e) =>
                        handleInternalNotesChange(b.id, e.target.value)
                      }
                      rows={2}
                      className="w-full bg-slate-950 border border-slate-700 rounded-md px-2 py-1 text-[11px] outline-none focus:border-sky-500 resize-none"
                    />
                  </td>
                  <td className="px-3 py-2 text-slate-200">
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => handleStatusChange(b.id, "completed")}
                        disabled={isSaving || status === "completed"}
                        className="px-2 py-1 rounded-md border border-emerald-500/60 text-[11px] hover:bg-emerald-500/15 disabled:opacity-50"
                      >
                        Mark completed
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(b.id, "cancelled")}
                        disabled={isSaving || status === "cancelled"}
                        className="px-2 py-1 rounded-md border border-red-500/60 text-[11px] hover:bg-red-500/15 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const newDate = prompt(
                            "New date (YYYY-MM-DD):",
                            b.date
                          );
                          const newTime = prompt(
                            "New time (e.g. 10:00 AM):",
                            b.time
                          );
                          if (newDate && newTime) {
                            handleReschedule(b.id, newDate, newTime);
                          }
                        }}
                        disabled={isSaving}
                        className="px-2 py-1 rounded-md border border-slate-600 text-[11px] hover:bg-slate-700/40"
                      >
                        Reschedule
                      </button>
                    </div>
                    {isSaving && (
                      <p className="text-[10px] text-slate-400 mt-1">
                        Saving…
                      </p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-slate-500">
        Policy logic implemented here: cancellations 48+ hours ahead are free,
        less than 24 hours may incur a 50% fee per your policy; reschedules are
        allowed via the &quot;Reschedule&quot; button (you can track if it&apos;s
        the first or additional reschedule using internal notes).
      </p>
    </div>
  );
}
