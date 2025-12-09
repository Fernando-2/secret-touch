// app/television/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminBookings from "./AdminBookings"; // new in next section
import LogoutButton from "./logoutButton";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function TelevisionAdminPage() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session")?.value;

  if (adminSession !== "true") {
    redirect("/television/login");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Television</h1>
          <p className="text-sm text-slate-300">
            Owners-only view & management of bookings.
          </p>
        </div>
        <LogoutButton/>
      </div>

      <AdminBookings />
    </div>
  );
}
