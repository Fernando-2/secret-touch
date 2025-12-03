// app/television/page.tsx
import { getBookings } from "../../lib/bookings";

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // needed because getBookings uses fs

type ServiceType = "interior" | "exterior" | "full";

type BookingRecord = {
  id: number;
  date: string;
  time: string;
  name: string;
  email: string;
  vehicle: string;
  notes?: string;
  service: ServiceType;
  createdAt: string;
};

export default async function TelevisionAdminPage() {
  const bookings = (await getBookings()) as BookingRecord[];

  const sorted = [...bookings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Television</h1>
        <p className="text-sm text-slate-300">
          Owners-only view of all bookings saved in{" "}
          <code>data/bookings.json</code>.
        </p>
      </div>

      {sorted.length === 0 ? (
        <p className="text-sm text-slate-300">
          No bookings yet. Once a customer submits the booking form, you&apos;ll
          see it here.
        </p>
      ) : (
        <div className="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-900/40">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-900">
              <tr className="text-left text-xs text-slate-400 uppercase tracking-wide">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Service</th>
                <th className="px-4 py-2">Vehicle</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Notes</th>
                <th className="px-4 py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((b) => (
                <tr
                  key={b.id}
                  className="border-t border-slate-800 hover:bg-slate-900/70"
                >
                  <td className="px-4 py-2 text-slate-200">{b.id}</td>
                  <td className="px-4 py-2 text-slate-200">{b.date}</td>
                  <td className="px-4 py-2 text-slate-200">{b.time}</td>
                  <td className="px-4 py-2 text-slate-200">{b.name}</td>
                  <td className="px-4 py-2 text-slate-200 capitalize">
                    {b.service}
                  </td>
                  <td className="px-4 py-2 text-slate-200">{b.vehicle}</td>
                  <td className="px-4 py-2 text-slate-300 text-xs">
                    {b.email}
                  </td>
                  <td className="px-4 py-2 text-slate-300 text-xs max-w-xs">
                    {b.notes || "-"}
                  </td>
                  <td className="px-4 py-2 text-slate-400 text-xs">
                    {new Date(b.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-slate-500">
        This route is intentionally named something non-obvious and is protected
        by a password + HttpOnly cookie.
      </p>
    </div>
  );
}
