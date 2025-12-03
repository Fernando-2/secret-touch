// app/components/BookingCalendar.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type ServiceType = "interior" | "exterior" | "full";

type BookingRecord = {
  id: number;
  date: string;
  time: string;
  name: string;
  service: ServiceType;
  vehicle: string;
  createdAt?: string;
};

const TIME_SLOTS = ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDateKey(d: Date) {
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function BookingCalendar() {
  const today = useMemo(() => {
    const now = new Date();
    return formatDateKey(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
  }, []);

  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [date, setDate] = useState<string>(today);
  const [time, setTime] = useState<string>("");

  const [service, setService] = useState<ServiceType | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Load existing bookings from API on mount
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data.bookings || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingBookings(false);
      }
    };

    loadBookings();
  }, []);

  const calendarDays = useMemo(() => {
    const firstOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const startDayOfWeek = firstOfMonth.getDay();
    const startDate = new Date(firstOfMonth);
    startDate.setDate(firstOfMonth.getDate() - startDayOfWeek);

    const days: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      days.push(d);
    }
    return days;
  }, [currentMonth]);

  const bookingsForSelectedDate = useMemo(
    () => bookings.filter((b) => b.date === date),
    [bookings, date]
  );

  const bookedTimesForSelectedDate = bookingsForSelectedDate.map((b) => b.time);

  const canSubmit =
    service && date && time && name && email && vehicle && !submitting;

  const goToPrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const handleDayClick = (d: Date) => {
    const key = formatDateKey(d);
    if (key < today) return; // don’t allow past days
    setDate(key);
    setTime("");
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    if (bookedTimesForSelectedDate.includes(time)) {
      alert("That time is already booked. Please choose another slot.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          date,
          time,
          name,
          email,
          vehicle,
          notes,
        }),
      });

      if (!res.ok) {
        console.error(await res.json());
        alert("There was a problem creating your booking.");
        return;
      }

      const data = await res.json();
      const newBooking: BookingRecord = data.booking;

      // Update state so UI shows new booking without reload
      setBookings((prev) => [...prev, newBooking]);

      setSubmitted(true);

      // Clear only personal fields
      setService("");
      setName("");
      setEmail("");
      setVehicle("");
      setNotes("");
    } catch (err) {
      console.error(err);
      alert("Network error while creating booking.");
    } finally {
      setSubmitting(false);
    }
  };

  const monthLabel = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 border border-slate-800 rounded-2xl p-4 md:p-6 bg-slate-900/40 text-sm"
    >
      {/* Calendar + time slots */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={goToPrevMonth}
              className="px-2 py-1 text-xs border border-slate-700 rounded-md hover:border-sky-500"
            >
              Prev
            </button>
            <p className="font-medium">{monthLabel}</p>
            <button
              type="button"
              onClick={goToNextMonth}
              className="px-2 py-1 text-xs border border-slate-700 rounded-md hover:border-sky-500"
            >
              Next
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-[11px] text-center text-slate-400">
            {DAY_LABELS.map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-[11px]">
            {calendarDays.map((d) => {
              const key = formatDateKey(d);
              const isCurrentMonth =
                d.getMonth() === currentMonth.getMonth();
              const isSelected = key === date;
              const isPast = key < today;
              const isToday = key === today;

              const hasBooking = bookings.some((b) => b.date === key);

              return (
                <button
                  key={key + d.getDate()}
                  type="button"
                  onClick={() => handleDayClick(d)}
                  disabled={isPast}
                  className={[
                    "h-8 rounded-md border text-center transition-colors",
                    isCurrentMonth
                      ? "border-slate-800"
                      : "border-slate-900 text-slate-600",
                    isPast && "opacity-40 cursor-not-allowed",
                    isSelected &&
                      "border-sky-500 bg-sky-500 text-slate-950",
                    !isSelected &&
                      !isPast &&
                      "hover:border-sky-500",
                    isToday && !isSelected && "border-slate-600",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span>{d.getDate()}</span>
                  {hasBooking && (
                    <span className="block text-[9px] text-sky-400">
                      booked
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-slate-400">
            Selected date:{" "}
            <span className="text-slate-100 font-medium">{date}</span>
          </p>
          {loadingBookings && (
            <p className="text-[11px] text-slate-500">Loading bookings…</p>
          )}
        </div>

        {/* Time slots + summary */}
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs text-slate-300">
              Choose a time for{" "}
              <span className="font-medium">{date}</span>
            </p>
            <div className="grid grid-cols-2 gap-2">
              {TIME_SLOTS.map((slot) => {
                const isBooked = bookedTimesForSelectedDate.includes(slot);
                const isSelected = time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      if (!isBooked) {
                        setTime(slot);
                        setSubmitted(false);
                      }
                    }}
                    disabled={isBooked}
                    className={[
                      "px-2 py-2 rounded-md border text-xs text-left transition-colors",
                      isBooked
                        ? "border-slate-800 bg-slate-800 text-slate-500 cursor-not-allowed"
                        : "border-slate-700 hover:border-sky-500",
                      isSelected &&
                        !isBooked &&
                        "border-sky-500 bg-sky-500 text-slate-950",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <div>{slot}</div>
                    <div className="text-[10px] text-slate-400">
                      {isBooked ? "Booked" : "Available"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1 text-xs text-slate-300">
            <p className="font-medium">Appointments for this date</p>
            {bookingsForSelectedDate.length === 0 ? (
              <p className="text-slate-400">
                No appointments yet for this day.
              </p>
            ) : (
              <ul className="space-y-1">
                {bookingsForSelectedDate.map((b) => (
                  <li key={b.id} className="text-slate-300">
                    <span className="font-medium">{b.time}</span>{" "}
                    — {b.name} ({b.vehicle})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Booking details form */}
      <div className="border-t border-slate-800 pt-4 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Service */}
          <div className="space-y-1">
            <label className="block text-xs text-slate-300">
              Service type <span className="text-red-400">*</span>
            </label>
            <select
              value={service}
              onChange={(e) =>
                setService(e.target.value as ServiceType | "")
              }
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm outline-none focus:border-sky-500"
            >
              <option value="">Select a service</option>
              <option value="interior">Interior Detail</option>
              <option value="exterior">Exterior Detail</option>
              <option value="full">Full Detail</option>
            </select>
          </div>

          {/* Vehicle */}
          <div className="space-y-1">
            <label className="block text-xs text-slate-300">
              Vehicle (year, make, model){" "}
              <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              required
              placeholder="2020 Honda Civic"
              className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm outline-none focus:border-sky-500"
            />
          </div>

          {/* Name */}
          <div className="space-y-1">
            <label className="block text-xs text-slate-300">
              Your name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm outline-none focus:border-sky-500"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="block text-xs text-slate-300">
              Email address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1">
          <label className="block text-xs text-slate-300">
            Notes (pet hair, stains, access details, etc.)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm outline-none focus:border-sky-500 resize-none"
          />
        </div>

        <p className="text-xs text-slate-400">
          You are booking for{" "}
          <span className="text-slate-100 font-medium">{date}</span>{" "}
          at{" "}
          <span className="text-slate-100 font-medium">
            {time || "select a time"}
          </span>
          .
        </p>

        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-sky-500 text-slate-950 text-sm font-medium hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? "Sending..." : "Submit Booking Request"}
        </button>

        {submitted && (
          <p className="text-xs text-emerald-400">
            Thanks! Your booking request has been saved.
          </p>
        )}
      </div>
    </form>
  );
}
