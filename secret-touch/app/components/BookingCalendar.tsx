"use client";
import { useState } from "react";

type Availability = {
  [service: string]: {
    [date: string]: string[]; // "YYYY-MM-DD": ["9:00 AM", "11:00 AM"]
  };
};

const availability: Availability = {
  "Auto Detailing": {
    "2025-11-14": ["9:00 AM", "11:00 AM", "2:00 PM"],
    "2025-11-15": ["10:00 AM", "1:00 PM"],
  },
  "Carpet Cleaning": {
    "2025-11-14": ["8:00 AM", "12:00 PM"],
    "2025-11-17": ["9:00 AM", "3:00 PM"],
  },
  "Driveway and Pavement Cleaning": {
    "2025-11-18": ["11:00 AM", "4:00 PM"],
  },
};

export default function BookingCalendar() {
  const [service, setService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayIndex = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const nextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );

  const prevMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );

  const currentMonthName = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const formatted = (day: number) =>
    `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const availableDates =
    service && availability[service] ? Object.keys(availability[service]) : [];

  const availableTimes =
    service && selectedDate && availability[service]?.[selectedDate]
      ? availability[service][selectedDate]
      : [];

  const submitBooking = () => {
    alert(
      `Booked:\nService: ${service}\nDate: ${selectedDate}\nTime: ${selectedTime}`
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow rounded-2xl mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        Book Your Appointment
      </h2>

      {/* Service Selector */}
      <label className="block text-sm font-medium mb-2">Select a Service</label>
      <select
        value={service}
        onChange={(e) => {
          setService(e.target.value);
          setSelectedDate("");
          setSelectedTime("");
        }}
        className="w-full border rounded-lg p-2 mb-6"
      >
        <option value="">Choose a service</option>
        <option value="Auto Detailing">Auto Detailing</option>
        <option value="Carpet Cleaning">Carpet Cleaning</option>
        <option value="Driveway and Pavement Cleaning">
          Driveway and Pavement Cleaning
        </option>
      </select>

      {/* Calendar */}
      <div className="border rounded-xl p-4 bg-gray-50 mb-6">
        <div className="flex justify-between items-center mb-3">
          <button onClick={prevMonth} className="text-xl font-bold">
            ←
          </button>
          <p className="font-semibold">{currentMonthName}</p>
          <button onClick={nextMonth} className="text-xl font-bold">
            →
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-600 mb-2">
          <p>Sun</p>
          <p>Mon</p>
          <p>Tue</p>
          <p>Wed</p>
          <p>Thu</p>
          <p>Fri</p>
          <p>Sat</p>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array(firstDayIndex).fill(null).map((_, i) => (
            <div key={i}></div>
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dateKey = formatted(day);
            const isAvailable = availableDates.includes(dateKey);
            const isSelected = selectedDate === dateKey;

            return (
              <button
                key={day}
                disabled={!isAvailable}
                onClick={() => {
                  setSelectedDate(dateKey);
                  setSelectedTime("");
                }}
                className={`p-2 rounded-lg text-sm ${
                  isAvailable
                    ? isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 hover:bg-blue-200"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Times */}
      {selectedDate && availableTimes.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Available Times</h3>
          <div className="grid grid-cols-2 gap-3">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-2 rounded-lg border ${
                  selectedTime === time
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        disabled={!service || !selectedDate || !selectedTime}
        onClick={submitBooking}
        className={`w-full py-3 rounded-lg font-bold transition ${
          service && selectedDate && selectedTime
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        Confirm Booking
      </button>
    </div>
  );
}
