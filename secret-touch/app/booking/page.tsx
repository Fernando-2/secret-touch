"use client";
import { useState } from "react";
import Link from "next/link";
import BookingCalendar from "../components/BookingCalendar";
export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Example available time slots
  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  // Build next 14 days for the calendar
  const generateDates = () => {
    const today = new Date();
    const days = [];

    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      days.push(date);
    }

    return days;
  };

  const dates = generateDates();

  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }

    alert(
      `Your appointment is scheduled for:\n${selectedDate.toDateString()} at ${selectedTime}`
    );

    setSelectedDate(null);
    setSelectedTime("");
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
     <BookingCalendar/>

      {/* Contact Form (untouched) */}
      <section className="py-12 px-6 bg-blue-50">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8">
          <h3 className="text-xl font-bold mb-4 text-center">
            Any questions? Contact us directly below.
          </h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(`Thanks ${form.name}! We'll get back to you soon.`);
              setForm({ name: "", email: "", message: "" });
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
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
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                required
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
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
        <p>
          &copy; {new Date().getFullYear()} Secret Touch. All rights
          reserved.
        </p>
        <Link href="/" className="block text-blue-200 hover:text-white mt-2">
          ← Back to Home
        </Link>
      </footer>
    </main>
  );
}
