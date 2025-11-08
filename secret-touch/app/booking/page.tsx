"use client";
import { useState } from "react";
import Link from "next/link";

export default function BookingPage() {
  const [booking, setBooking] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
  });
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you, ${booking.name}! Your booking has been received.`);
    setBooking({ name: "", email: "", service: "", date: "" });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thanks ${form.name}! We'll get back to you soon.`);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Book a Service</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Schedule a consultation or service appointment below.
        </p>
      </section>

      {/* Booking Form */}
      <section className="py-12 px-6 max-w-2xl mx-auto">
        <form
          onSubmit={handleBookingSubmit}
          className="bg-white p-8 rounded-2xl shadow-md space-y-4"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Booking Form</h2>

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              required
              value={booking.name}
              onChange={(e) => setBooking({ ...booking, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={booking.email}
              onChange={(e) => setBooking({ ...booking, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Service</label>
            <select
              required
              value={booking.service}
              onChange={(e) => setBooking({ ...booking, service: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a service</option>
              <option value="Web Development">Web Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="SEO Optimization">SEO Optimization</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Date</label>
            <input
              type="date"
              required
              value={booking.date}
              onChange={(e) => setBooking({ ...booking, date: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Booking
          </button>
        </form>
      </section>

      {/* Contact Card */}
      <section className="py-12 px-6 bg-blue-50">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8">
          <h3 className="text-xl font-bold mb-4 text-center">
            Any questions? Contact us directly below.
          </h3>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Write your message here"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-blue-600 text-white">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        <Link href="/" className="block text-blue-200 hover:text-white mt-2">
          ← Back to Home
        </Link>
      </footer>
    </main>
  );
}
