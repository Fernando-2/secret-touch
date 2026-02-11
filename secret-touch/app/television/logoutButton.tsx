// app/television/LogoutButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/television/logout", {
        method: "POST",
      });
      router.push("/television/login");
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 text-xs text-white/80 hover:border-[#BFFB00]/50 hover:bg-white/10 transition disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
