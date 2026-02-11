"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TelevisionLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/television/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Invalid password");
        return;
      }

      router.push("/television");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
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
            <h1 className="text-3xl font-semibold">Television Login</h1>
            <p className="text-sm text-white/70">
              This area is restricted to the owners of the website.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/40">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wide text-white/70">
                  Owner password
                </label>
                <input
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#BFFB00] focus:ring-1 focus:ring-[#BFFB00]"
                  placeholder="Enter owner password"
                />
              </div>

              {error && (
                <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full inline-flex items-center justify-center rounded-full bg-[#BFFB00] px-4 py-2.5 text-sm font-semibold text-black shadow-md shadow-[#BFFB00]/20 transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <p className="text-[11px] text-white/50">
                Authorized access only.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
