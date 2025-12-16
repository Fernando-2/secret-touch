// app/booking/components/BookingCalendar.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type PublicSlot = {
  id: number;
  date: string; // "YYYY-MM-DD"
  time: string; // "8:00 AM"
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

// TIME & RANGE SETTINGS
const HOURS_START = 8;
const HOURS_END = 18;
const INTERVAL_MINUTES = 60;
const MAX_DAYS_AHEAD = 90;

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function formatTime(hour: number, minute: number): string {
  const h12 = ((hour + 11) % 12) + 1;
  const ampm = hour < 12 ? "AM" : "PM";
  const mm = minute.toString().padStart(2, "0");
  return `${h12}:${mm} ${ampm}`;
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

  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

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

  const bookedByDate = useMemo(() => {
    const map = new Map<string, PublicSlot[]>();
    for (const slot of bookedSlots) {
      if (!map.has(slot.date)) map.set(slot.date, []);
      map.get(slot.date)!.push(slot);
    }
    return map;
  }, [bookedSlots]);

  const calendarDays = useMemo(() => {
    const days: {
      date: Date;
      label: number;
      inCurrentMonth: boolean;
      isToday: boolean;
      disabled: boolean;
      hasAnyBooking: boolean;
    }[] = [];

    const firstOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const firstWeekday = firstOfMonth.getDay();

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
    if (prev < today && prev.getMonth() !== today.getMonth()) return;
    setCurrentMonth(prev);
  }

  function goToNextMonth() {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  }

  if (loading) {
    return (
      <p className="text-sm text-slate-300">
        Loading availability<span className="animate-pulse">…</span>
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Calendar header */}
      <div className="flex items-center justify-between rounded-xl bg-slate-950/70 px-3 py-2">
        <button
          type="button"
          onClick={goToPrevMonth}
          className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-100 hover:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={
            new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1) <=
            new Date(today.getFullYear(), today.getMonth(), 1)
          }
        >
          ‹ Prev
        </button>
        <div className="text-sm font-semibold text-slate-50">
          {currentMonth.toLocaleDateString(undefined, {
            month: "long",
            year: "numeric",
          })}
        </div>
        <button
          type="button"
          onClick={goToNextMonth}
          className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-100 hover:border-emerald-500"
        >
          Next ›
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 text-xs">
        {calendarDays.map((d, idx) => {
          const isSelected = selectedDate && isSameDay(selectedDate, d.date);

          let base =
            "flex h-9 items-center justify-center rounded-lg border text-xs transition ";
          if (d.disabled) {
            base +=
              "cursor-not-allowed border-slate-800 bg-slate-950 text-slate-600";
          } else {
            base +=
              "cursor-pointer border-slate-700 bg-slate-900 text-slate-100 hover:border-emerald-500 hover:bg-slate-800";
          }

          if (!d.inCurrentMonth && !d.disabled) {
            base += " opacity-60";
          }

          if (isSelected && !d.disabled) {
            base +=
              " border-emerald-500 bg-emerald-500/90 text-slate-900 shadow-md shadow-emerald-500/30";
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={d.disabled}
              onClick={() => {
                if (!d.disabled) setSelectedDate(d.date);
              }}
              className={base}
            >
              <span className="relative">
                {d.label}
                {d.isToday && !isSelected && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] text-emerald-400">
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

      {/* Time slots */}
      <div className="mt-2 space-y-2">
        {selectedDate && (
          <div className="text-[11px] text-slate-300">
            Showing times for{" "}
            <span className="font-semibold text-slate-100">
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
          const booked = slot.isBooked;

          return (
            <button
              key={`${slot.date}-${slot.time}`}
              type="button"
              disabled={!clickable}
              onClick={() =>
                clickable && onSelectSlot?.({ date: slot.date, time: slot.time })
              }
              className={
                "flex w-full items-center justify-between rounded-xl border px-4 py-2 text-sm transition " +
                (booked
                  ? "cursor-default border-slate-800 bg-slate-950 text-slate-400"
                  : "border-emerald-600/70 bg-slate-950 hover:border-emerald-400 hover:bg-slate-900 text-slate-100 disabled:cursor-not-allowed disabled:opacity-60")
              }
            >
              <div className="font-medium">{slot.time}</div>
              <span
                className={
                  "rounded-full px-2 py-0.5 text-[11px] font-semibold " +
                  (booked
                    ? "bg-red-500/20 text-red-300"
                    : "bg-emerald-500/20 text-emerald-300")
                }
              >
                {booked ? "Booked" : "Available"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
