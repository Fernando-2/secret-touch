// app/booking/components/BookingCalendar.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type PublicSlot = {
  id: number;
  date: string; // "YYYY-MM-DD"
  time: string; // e.g. "8:00 AM"
  status: "pending" | "confirmed" | "cancelled";
  isBooked: boolean;
};

type CalendarSlot = {
  date: string;
  time: string;
  isBooked: boolean;
  status?: "pending" | "confirmed" | "cancelled";
};

type BookingCalendarProps = {
  onSelectSlot?: (slot: { date: string; time: string }) => void;
};

// TIME SETTINGS
const HOURS_START = 8; // 8 AM
const HOURS_END = 18; // 6 PM (exclusive)
const INTERVAL_MINUTES = 60;

// DATE LIMITS
const MAX_DAYS_AHEAD = 90; // allow up to 90 days into future

function formatDate(date: Date): string {
  // Booking.date format: "YYYY-MM-DD"
  return date.toISOString().slice(0, 10);
}

function formatTime(hour: number, minute: number): string {
  // MUST MATCH Booking.time in DB
  const h12 = ((hour + 11) % 12) + 1;
  const ampm = hour < 12 ? "AM" : "PM";
  const mm = minute.toString().padStart(2, "0");
  return `${h12}:${mm} ${ampm}`; // e.g. "8:00 AM"
}

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function BookingCalendar({ onSelectSlot }: BookingCalendarProps) {
  const [bookedSlots, setBookedSlots] = useState<PublicSlot[]>([]);
  const [loading, setLoading] = useState(true);

  const today = useMemo(() => startOfDay(new Date()), []);
  const maxDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + MAX_DAYS_AHEAD);
    return startOfDay(d);
  }, [today]);

  // currentMonth is a Date pointing at the 1st of the visible month
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  // Fetch booked slots from public API
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/bookings/public", { cache: "no-store" });
        const data = await res.json();
        setBookedSlots(data.slots ?? []);
      } catch (err) {
        console.error("Failed to load public bookings", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Map bookings by date string for quick lookup
  const bookedByDate = useMemo(() => {
    const map = new Map<string, PublicSlot[]>();
    for (const slot of bookedSlots) {
      if (!map.has(slot.date)) map.set(slot.date, []);
      map.get(slot.date)!.push(slot);
    }
    return map;
  }, [bookedSlots]);

  // Build calendar grid for currentMonth
  const calendarDays = useMemo(() => {
    const days: {
      date: Date;
      label: number;
      inCurrentMonth: boolean;
      isToday: boolean;
      disabled: boolean;
      hasAnyBooking: boolean;
    }[] = [];

    const firstOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const firstWeekday = firstOfMonth.getDay(); // 0 = Sun, 6 = Sat

    // Start from the Sunday before (or same day if Sunday)
    const start = new Date(firstOfMonth);
    start.setDate(firstOfMonth.getDate() - firstWeekday);

    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const dStart = startOfDay(d);

      const disabled = dStart < today || dStart > maxDate;
      const inCurrentMonth = d.getMonth() === currentMonth.getMonth();
      const dateStr = formatDate(d);
      const hasAnyBooking = bookedByDate.has(dateStr);
      const isTodayFlag = isSameDay(dStart, today);

      days.push({
        date: dStart,
        label: d.getDate(),
        inCurrentMonth,
        isToday: isTodayFlag,
        disabled,
        hasAnyBooking,
      });
    }

    return days;
  }, [currentMonth, today, maxDate, bookedByDate]);

  // Time slots for selectedDate
  const slotsForSelectedDay: CalendarSlot[] = useMemo(() => {
    if (!selectedDate) return [];

    const dateStr = formatDate(selectedDate);
    const slots: CalendarSlot[] = [];

    for (let h = HOURS_START; h < HOURS_END; h++) {
      for (let m = 0; m < 60; m += INTERVAL_MINUTES) {
        const timeStr = formatTime(h, m);

        const match = bookedSlots.find(
          (b) => b.date === dateStr && b.time === timeStr && b.isBooked
        );

        slots.push({
          date: dateStr,
          time: timeStr,
          isBooked: !!match,
          status: match?.status,
        });
      }
    }

    return slots;
  }, [bookedSlots, selectedDate]);

  function goToPrevMonth() {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    // Don’t allow navigating entirely before today’s month if all days would be disabled
    if (prev < today && prev.getMonth() !== today.getMonth()) return;
    setCurrentMonth(prev);
  }

  function goToNextMonth() {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  }

  if (loading) {
    return <p className="text-sm text-slate-300">Loading availability…</p>;
  }

  return (
    <div className="space-y-4">
      {/* Calendar header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goToPrevMonth}
          className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 hover:border-emerald-500 disabled:opacity-40"
          disabled={
            // disable going back if entire previous month is before today
            new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1) <=
            new Date(today.getFullYear(), today.getMonth(), 1)
          }
        >
          ‹ Prev
        </button>
        <div className="text-sm font-semibold">
          {currentMonth.toLocaleDateString(undefined, {
            month: "long",
            year: "numeric",
          })}
        </div>
        <button
          type="button"
          onClick={goToNextMonth}
          className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 hover:border-emerald-500 disabled:opacity-40"
          disabled={false}
        >
          Next ›
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 text-center text-xs font-medium text-slate-300">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 text-xs">
        {calendarDays.map((d, idx) => {
          const isSelected =
            selectedDate && isSameDay(selectedDate, d.date);

          const baseClasses =
            "flex h-8 items-center justify-center rounded-md border text-xs " +
            (d.disabled
              ? "border-slate-800 bg-slate-950 text-slate-600 cursor-not-allowed"
              : "cursor-pointer border-slate-700 bg-slate-900 text-slate-100 hover:border-emerald-500");

          const selectedClasses = isSelected
            ? " border-emerald-500 bg-emerald-600 text-slate-900"
            : "";

          const dimOutsideMonth = !d.inCurrentMonth && !d.disabled;

          return (
            <button
              key={idx}
              type="button"
              disabled={d.disabled}
              onClick={() => {
                if (d.disabled) return;
                setSelectedDate(d.date);
              }}
              className={
                baseClasses +
                selectedClasses +
                (dimOutsideMonth ? " opacity-60" : "")
              }
            >
              <span className="relative">
                {d.label}
                {d.isToday && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-emerald-400">
                    ●
                  </span>
                )}
                {d.hasAnyBooking && !d.disabled && (
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[8px] text-amber-300">
                    •
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Time slots for selected day */}
      <div className="space-y-2">
        {selectedDate && (
          <div className="text-xs text-slate-300">
            Showing times for{" "}
            <span className="font-semibold">
              {selectedDate.toLocaleDateString(undefined, {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        )}

        {slotsForSelectedDay.map((slot) => {
          const clickable = !slot.isBooked && !!onSelectSlot;

          return (
            <button
              key={`${slot.date}-${slot.time}`}
              type="button"
              disabled={!clickable}
              onClick={() =>
                clickable && onSelectSlot?.({ date: slot.date, time: slot.time })
              }
              className={
                "flex w-full items-center justify-between rounded-md border px-4 py-2 text-sm " +
                (slot.isBooked
                  ? "cursor-default border-slate-700 bg-slate-900"
                  : "border-emerald-600 bg-slate-900 hover:border-emerald-400 hover:bg-slate-800 disabled:opacity-60")
              }
            >
              <div className="font-medium">
                {slot.time}
                {slot.isBooked && slot.status === "pending" && (
                  <span className="ml-2 text-xs text-slate-300">
                    (pending confirmation)
                  </span>
                )}
              </div>

              <span
                className={
                  slot.isBooked
                    ? "rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-semibold text-red-300"
                    : "rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-300"
                }
              >
                {slot.isBooked ? "Booked" : "Available"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
