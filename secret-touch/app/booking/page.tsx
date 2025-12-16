// app/booking/page.tsx
"use client";

import { useState } from "react";
import BookingCalendar from "../components/BookingCalendar";

export default function BookingPage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      if (!date || !time || !service || !name || !email || !vehicle) {
        setError("Please select a date & time and fill out all required fields.");
        setSubmitting(false);
        return;
      }

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          time,
          service,
          name,
          email,
          vehicle,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create booking.");
      } else {
        setMessage(
          "Your booking request has been received! We’ll confirm it by email once it’s approved."
        );
        // keep date/time so they remember what they chose
        setService("");
        setVehicle("");
        setNotes("");
      }
    } catch (err) {
      console.error("Booking submit error:", err);
      setError("Something went wrong while creating your booking.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 lg:flex-row">
        {/* Left column: booking form */}
        <div className="w-full lg:w-5/12">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">
              Secret Touch
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-50">
              Book an appointment
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Choose a date and time that works for you, then tell us a little
              about your vehicle. Your request will be reviewed and confirmed by
              our team.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-900/40 backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Date & time (read-only – filled from calendar) */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Selected date
                </label>
                <input
                  type="text"
                  value={date}
                  readOnly
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Select a date from the calendar"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Selected time
                </label>
                <input
                  type="text"
                  value={time}
                  readOnly
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Select a time from the calendar"
                />
              </div>

              {/* Service */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Service
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="">Select a service</option>
                  <option value="interior">Interior detail</option>
                  <option value="exterior">Exterior detail</option>
                  <option value="full">Full detail</option>
                </select>
              </div>

              {/* Name / Email / Vehicle */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Vehicle
                </label>
                <input
                  type="text"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Make / model"
                />
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Tell us anything we should know beforehand."
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 bg-red-900/30 border border-red-700/60 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
              {message && (
                <p className="text-sm text-emerald-300 bg-emerald-900/20 border border-emerald-700/60 rounded-lg px-3 py-2">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-md shadow-emerald-500/30 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit booking request"}
              </button>

              <p className="pt-1 text-[11px] leading-snug text-slate-400">
                By submitting, you’re requesting a time slot. Bookings are{" "}
                <span className="font-semibold text-slate-200">
                  pending approval
                </span>{" "}
                until confirmed by Secret Touch.
              </p>
            </form>
          </div>
        </div>

        {/* Right column: calendar */}
        <div className="w-full lg:w-7/12">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-900/40 backdrop-blur">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-slate-50">
                  Availability
                </h2>
                <p className="text-xs text-slate-300">
                  Tap on a date and then an available time to attach it to your
                  booking form.
                </p>
              </div>
              <div className="hidden text-[11px] text-slate-300 sm:flex sm:flex-col sm:items-end">
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
                  <span>Available</span>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-red-500/70" />
                  <span>Booked</span>
                </div>
              </div>
            </div>

            <BookingCalendar
              onSelectSlot={({ date, time }) => {
                setDate(date);
                setTime(time);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
