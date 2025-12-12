// app/television/page.tsx
"use client";

import { useEffect, useState } from "react";

type AdminBooking = {
  id: number;
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  status?: "pending" | "confirmed" | "cancelled";
  vehicle: string;
  notes?: string | null;
};

export default function TelevisionAdminPage() {
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoadingLogin(true);
    setError(null);

    try {
      const res = await fetch("/api/television", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid password");
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
        setPassword("");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setError("Something went wrong logging in.");
    } finally {
      setLoadingLogin(false);
    }
  }

  async function loadBookings() {
    try {
      setLoadingBookings(true);
      const res = await fetch("/api/bookings", { cache: "no-store" });
      const data = await res.json();
      setBookings(data.bookings ?? []);
    } catch (err) {
      console.error("Failed to load bookings:", err);
    } finally {
      setLoadingBookings(false);
    }
  }

  async function updateStatus(id: number, status: "confirmed" | "cancelled") {
    try {
      setUpdatingId(id);
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error("Failed to update booking:", data.error || res.statusText);
      } else {
        await loadBookings();
      }
    } catch (err) {
      console.error("Update booking status error:", err);
    } finally {
      setUpdatingId(null);
    }
  }

  // When we become admin, load bookings
  useEffect(() => {
    if (isAdmin) {
      loadBookings();
    }
  }, [isAdmin]);

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-8">
      <h1 className="mb-4 text-2xl font-semibold">Admin – Secret Touch</h1>

      {!isAdmin && (
        <form onSubmit={handleLogin} className="space-y-4 max-w-sm">
          <p className="text-sm text-slate-300">
            Owners only. Enter the admin password.
          </p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            placeholder="Admin password"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loadingLogin}
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400 disabled:opacity-60"
          >
            {loadingLogin ? "Checking..." : "Login as admin"}
          </button>
        </form>
      )}

      {isAdmin && (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">Bookings (admin view)</h2>
            <button
              type="button"
              onClick={loadBookings}
              disabled={loadingBookings}
              className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-100 hover:border-emerald-500 disabled:opacity-60"
            >
              {loadingBookings ? "Refreshing…" : "Refresh"}
            </button>
          </div>

          {bookings.length === 0 && !loadingBookings && (
            <p className="text-sm text-slate-300">No bookings yet.</p>
          )}

          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-900/80 text-xs uppercase text-slate-300">
                <tr>
                  <th className="px-3 py-2">Customer</th>
                  <th className="px-3 py-2">Service</th>
                  <th className="px-3 py-2">Date/Time</th>
                  <th className="px-3 py-2">Vehicle</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950/60">
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td className="px-3 py-2 align-top">
                      <div className="font-medium">{b.name}</div>
                      <div className="text-xs text-slate-300">{b.email}</div>
                    </td>
                    <td className="px-3 py-2 align-top">
                      <span className="text-xs uppercase tracking-wide text-slate-200">
                        {b.service}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top text-xs text-slate-200">
                      {b.date}
                      <br />
                      {b.time}
                    </td>
                    <td className="px-3 py-2 align-top text-xs text-slate-200">
                      {b.vehicle}
                    </td>
                    <td className="px-3 py-2 align-top text-xs">
                      <span
                        className={
                          "rounded-full px-2 py-0.5 font-semibold " +
                          (b.status === "confirmed"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : b.status === "cancelled"
                            ? "bg-red-500/20 text-red-300"
                            : "bg-amber-500/20 text-amber-300")
                        }
                      >
                        {b.status ?? "pending"}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top">
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          disabled={updatingId === b.id}
                          onClick={() => updateStatus(b.id, "confirmed")}
                          className="rounded-md bg-emerald-500 px-2 py-1 text-xs font-semibold text-slate-900 hover:bg-emerald-400 disabled:opacity-60"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          disabled={updatingId === b.id}
                          onClick={() => updateStatus(b.id, "cancelled")}
                          className="rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-slate-900 hover:bg-red-400 disabled:opacity-60"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
