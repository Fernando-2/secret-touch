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
  const past = mine.filter((b) => parseBookingDateTime(b.date, b.time) < now);

  const statusOrDefault = (b: BookingRecord) => b.status || "confirmed";

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-4 py-12 space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-widest text-[#BFFB00]">
            ACCOUNT
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">Your bookings</h1>
          <p className="text-sm text-white/70">
            Signed in as{" "}
            <span className="font-mono text-white/90">{userEmail}</span>.
          </p>
        </div>

        {/* Upcoming */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Upcoming</h2>

          {upcoming.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/60">
                You don&apos;t have any upcoming bookings.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming
                .sort(
                  (a, b) =>
                    parseBookingDateTime(a.date, a.time).getTime() -
                    parseBookingDateTime(b.date, b.time).getTime()
                )
                .map((b) => (
                  <div
                    key={b.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">
                          {b.service.toUpperCase()} detail
                        </p>
                        <p className="text-white/70">
                          {b.date} at {b.time}
                        </p>
                        <p className="text-xs text-white/55">
                          Vehicle: {b.vehicle}
                        </p>
                      </div>

                      <span className="text-[11px] px-2 py-0.5 rounded-full border border-[#BFFB00]/30 bg-[#BFFB00]/10 text-[#BFFB00] font-semibold">
                        {statusOrDefault(b)}
                      </span>
                    </div>

                    {b.notes && (
                      <p className="text-xs text-white/55 mt-2">
                        <span className="text-white/70 font-semibold">
                          Notes:
                        </span>{" "}
                        {b.notes}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          )}
        </section>

        {/* Past */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Past</h2>

          {past.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/60">
                You don&apos;t have any past bookings yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {past
                .sort(
                  (a, b) =>
                    parseBookingDateTime(b.date, b.time).getTime() -
                    parseBookingDateTime(a.date, a.time).getTime()
                )
                .map((b) => (
                  <div
                    key={b.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">
                          {b.service.toUpperCase()} detail
                        </p>
                        <p className="text-white/70">
                          {b.date} at {b.time}
                        </p>
                        <p className="text-xs text-white/55">
                          Vehicle: {b.vehicle}
                        </p>
                        <p className="text-xs text-white/45 mt-1">
                          Status: {statusOrDefault(b)}
                        </p>
                      </div>

                      <span className="text-[11px] px-2 py-0.5 rounded-full border border-white/15 bg-black/30 text-white/70">
                        Past
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>

        <p className="text-[11px] text-white/45">
          Cancellation and reschedule fees (if any) are applied according to the
          policy shown at booking time. Contact Secret Finish if you need to make
          changes.
        </p>
      </div>
    </main>
  );
}
