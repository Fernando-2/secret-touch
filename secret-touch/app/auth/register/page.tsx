// app/auth/register/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Registration failed");
        return;
      }
      router.push("/account");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-md px-4 py-12">
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-widest text-[#BFFB00]">
              SECRET FINISH
            </p>
            <h1 className="text-3xl font-semibold">Create an account</h1>
            <p className="text-sm text-white/70">
              View your current and past bookings in one place.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/40">
            <form onSubmit={onSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wide text-white/70">
                  Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#BFFB00] focus:ring-1 focus:ring-[#BFFB00]"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wide text-white/70">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#BFFB00] focus:ring-1 focus:ring-[#BFFB00]"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wide text-white/70">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={onChange}
                  className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#BFFB00] focus:ring-1 focus:ring-[#BFFB00]"
                  placeholder="Create a password"
                />
              </div>

              {error && (
                <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#BFFB00] px-4 py-2.5 text-sm font-semibold text-black shadow-md shadow-[#BFFB00]/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Sign up"}
              </button>

              <p className="text-[11px] text-white/50">
                By creating an account, you can track bookings and manage your
                appointments with Secret Finish.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
