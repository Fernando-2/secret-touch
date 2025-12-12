// app/account/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getBookings, BookingRecord } from "../../lib/bookings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseBookingDateTime(date: string, time: string): Date {
  try {
    const [timePart, ampm] = time.split(" ");
    const [hStr, mStr] = timePart.split(":");
    let hour = parseInt(hStr, 10);
    const minute = parseInt(mStr, 10) || 0;

    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;

    const iso = `${date}T${String(hour).padStart(2, "0")}:${String(
      minute
    ).padStart(2, "0")}:00`;
    return new Date(iso);
  } catch {
    return new Date(date);
  }
}

export default async function AccountPage() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("user_session")?.value;

  if (!userEmail) {
    redirect("/auth/login");
  }

  const bookings = (await getBookings()) as BookingRecord[];
  const now = new Date();

  const mine = bookings.filter(
    (b) => b.email.toLowerCase() === userEmail!.toLowerCase()
  );

  const upcoming = mine.filter(
    (b) => parseBookingDateTime(b.date, b.time) >= now
  );
  const past = mine.filter(
    (b) => parseBookingDateTime(b.date, b.time) < now
  );

  const statusOrDefault = (b: BookingRecord) => b.status || "confirmed";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Your bookings</h1>
        <p className="text-sm text-slate-300">
          Signed in as <span className="font-mono">{userEmail}</span>.
        </p>
      </div>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Upcoming</h2>
        {upcoming.length === 0 ? (
          <p className="text-sm text-slate-400">
            You don&apos;t have any upcoming bookings.
          </p>
        ) : (
          <div className="space-y-2">
            {upcoming
              .sort(
                (a, b) =>
                  parseBookingDateTime(a.date, a.time).getTime() -
                  parseBookingDateTime(b.date, b.time).getTime()
              )
              .map((b) => (
                <div
                  key={b.id}
                  className="border border-slate-800 rounded-xl p-3 bg-slate-900/40 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {b.service.toUpperCase()} detail
                      </p>
                      <p className="text-slate-300">
                        {b.date} at {b.time}
                      </p>
                      <p className="text-xs text-slate-400">
                        Vehicle: {b.vehicle}
                      </p>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full border border-slate-600">
                      {statusOrDefault(b)}
                    </span>
                  </div>
                  {b.notes && (
                    <p className="text-xs text-slate-400 mt-1">
                      Notes: {b.notes}
                    </p>
                  )}
                </div>
              ))}
          </div>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Past</h2>
        {past.length === 0 ? (
          <p className="text-sm text-slate-400">
            You don&apos;t have any past bookings yet.
          </p>
        ) : (
          <div className="space-y-2">
            {past
              .sort(
                (a, b) =>
                  parseBookingDateTime(b.date, b.time).getTime() -
                  parseBookingDateTime(a.date, a.time).getTime()
              )
              .map((b) => (
                <div
                  key={b.id}
                  className="border border-slate-800 rounded-xl p-3 bg-slate-900/40 text-sm"
                >
                  <p className="font-medium">
                    {b.service.toUpperCase()} detail
                  </p>
                  <p className="text-slate-300">
                    {b.date} at {b.time}
                  </p>
                  <p className="text-xs text-slate-400">
                    Vehicle: {b.vehicle}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Status: {statusOrDefault(b)}
                  </p>
                </div>
              ))}
          </div>
        )}
      </section>

      <p className="text-[11px] text-slate-500">
        Cancellation and reschedule fees (if any) are applied according to the
        policy shown at booking time. Contact Secret Finish if you need to make
        changes.
      </p>
    </div>
  );
}
