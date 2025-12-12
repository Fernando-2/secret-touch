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
    <div className="max-w-sm mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Create an account</h1>
      <p className="text-sm text-slate-300">
        View your current and past bookings in one place.
      </p>

      <form onSubmit={onSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="block text-xs text-slate-300">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm outline-none focus:border-sky-500"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs text-slate-300">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm outline-none focus:border-sky-500"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs text-slate-300">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm outline-none focus:border-sky-500"
          />
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2.5 rounded-md bg-sky-500 text-slate-950 text-sm font-medium hover:bg-sky-400 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>
    </div>
  );
}
