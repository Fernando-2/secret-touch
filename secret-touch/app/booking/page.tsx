// app/booking/page.tsx
import BookingCalendar from "../components/BookingCalendar";

export default function BookingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Book an Appointment</h1>
      <p className="text-sm text-slate-300">
        Choose your service, select a date and time, and share your vehicle
        details. We&apos;ll confirm your booking by email and follow up if any
        adjustments are needed due to weather or scheduling.
      </p>

      <BookingCalendar />

      <section className="border border-slate-800 rounded-xl p-4 bg-slate-900/40 text-xs text-slate-300 space-y-1">
        <p>
          <span className="font-semibold">Cancellation:</span> Free up to 48
          hours before your appointment. Late cancellations may be subject to a
          fee.
        </p>
        <p>
          <span className="font-semibold">Rescheduling:</span> One free
          reschedule if requested at least 24 hours in advance.
        </p>
        <p>
          <span className="font-semibold">Weather:</span> Severe weather may
          require rescheduling. We&apos;ll contact you as early as possible.
        </p>
      </section>
    </div>
  );
}
