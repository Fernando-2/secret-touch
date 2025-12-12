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
      // basic front-end validation
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
        setMessage("Your booking request has been received! Pending confirmation.");
        // optionally clear some fields
        // keep date/time so they see what they picked
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
    <div className="mx-auto max-w-3xl space-y-6 py-8">
      <h1 className="mb-4 text-2xl font-semibold">Book an appointment</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Read-only fields filled from the calendar */}
        <input
          type="text"
          value={date}
          readOnly
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          placeholder="Select a date from the calendar"
        />
        <input
          type="text"
          value={time}
          readOnly
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          placeholder="Select a time from the calendar"
        />

        {/* Service dropdown */}
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
        >
          <option value="">Select a service</option>
          <option value="interior">Interior detail</option>
          <option value="exterior">Exterior detail</option>
          <option value="full">Full detail</option>
        </select>

        {/* Name / Email / Vehicle */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          placeholder="Your name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          placeholder="Your email"
        />
        <input
          type="text"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          placeholder="Vehicle (make/model)"
        />

        {/* Optional notes */}
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          placeholder="Any notes for us (optional)"
          rows={3}
        />

        {error && <p className="text-sm text-red-400">{error}</p>}
        {message && <p className="text-sm text-emerald-400">{message}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400 disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit booking request"}
        </button>
      </form>

      <section>
        <h2 className="mb-2 text-lg font-semibold">Availability</h2>
        <BookingCalendar
          onSelectSlot={({ date, time }) => {
            setDate(date);
            setTime(time);
          }}
        />
      </section>
    </div>
  );
}
