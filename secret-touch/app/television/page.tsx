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

  useEffect(() => {
    if (isAdmin) loadBookings();
  }, [isAdmin]);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-widest text-[#BFFB00]">
            ADMIN
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Admin — Secret Finish
          </h1>
          <p className="text-sm text-white/70">
            Manage bookings and confirm/cancel requests.
          </p>
        </div>

        {!isAdmin && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 max-w-md">
            <form onSubmit={handleLogin} className="space-y-4">
              <p className="text-sm text-white/70">
                Owners only. Enter the admin password.
              </p>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#BFFB00] focus:ring-1 focus:ring-[#BFFB00]"
                placeholder="Admin password"
              />

              {error && (
                <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loadingLogin}
                className="rounded-full bg-[#BFFB00] px-5 py-2.5 text-sm font-semibold text-black shadow-md shadow-[#BFFB00]/20 transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loadingLogin ? "Checking..." : "Login as admin"}
              </button>
            </form>
          </div>
        )}

        {isAdmin && (
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Bookings (admin view)</h2>
                <p className="text-xs text-white/60">
                  Confirm or cancel bookings. Pending is the default state.
                </p>
              </div>

              <button
                type="button"
                onClick={loadBookings}
                disabled={loadingBookings}
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/80 hover:border-[#BFFB00]/50 hover:bg-white/10 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loadingBookings ? "Refreshing…" : "Refresh"}
              </button>
            </div>

            {bookings.length === 0 && !loadingBookings && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-white/70">No bookings yet.</p>
              </div>
            )}

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-black/40 text-xs uppercase text-white/60">
                  <tr>
                    <th className="px-3 py-3">Customer</th>
                    <th className="px-3 py-3">Service</th>
                    <th className="px-3 py-3">Date/Time</th>
                    <th className="px-3 py-3">Vehicle</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-white/5 transition">
                      <td className="px-3 py-3 align-top">
                        <div className="font-semibold text-white">{b.name}</div>
                        <div className="text-xs text-white/60">{b.email}</div>
                      </td>

                      <td className="px-3 py-3 align-top">
                        <span className="text-xs uppercase tracking-wide text-white/80">
                          {b.service}
                        </span>
                      </td>

                      <td className="px-3 py-3 align-top text-xs text-white/80">
                        {b.date}
                        <br />
                        {b.time}
                      </td>

                      <td className="px-3 py-3 align-top text-xs text-white/80">
                        {b.vehicle}
                        {b.notes ? (
                          <div className="mt-1 text-[11px] text-white/50">
                            Notes: {b.notes}
                          </div>
                        ) : null}
                      </td>

                      <td className="px-3 py-3 align-top text-xs">
                        <span
                          className={
                            "rounded-full px-2 py-0.5 font-semibold border " +
                            (b.status === "confirmed"
                              ? "border-[#BFFB00]/30 bg-[#BFFB00]/10 text-[#BFFB00]"
                              : b.status === "cancelled"
                              ? "border-red-500/30 bg-red-500/10 text-red-300"
                              : "border-white/15 bg-white/5 text-white/70")
                          }
                        >
                          {b.status ?? "pending"}
                        </span>
                      </td>

                      <td className="px-3 py-3 align-top">
                        <div className="flex flex-col gap-2">
                          <button
                            type="button"
                            disabled={updatingId === b.id}
                            onClick={() => updateStatus(b.id, "confirmed")}
                            className="rounded-xl bg-[#BFFB00] px-3 py-2 text-xs font-semibold text-black hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {updatingId === b.id ? "Updating…" : "Confirm"}
                          </button>

                          <button
                            type="button"
                            disabled={updatingId === b.id}
                            onClick={() => updateStatus(b.id, "cancelled")}
                            className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200 hover:bg-red-500/15 transition disabled:opacity-60 disabled:cursor-not-allowed"
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
    </main>
  );
}
