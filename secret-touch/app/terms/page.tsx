// app/terms/page.tsx
export const metadata = {
  title: "Terms of Service | Secret Finish",
  description: "Terms of service and policies for booking with Secret Finish.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-16">
        <p className="text-[#BFFB00] tracking-widest text-xs font-semibold">
          POLICIES
        </p>

        <h1 className="mt-3 text-4xl md:text-5xl font-bold">
          Terms of Service & Policies
        </h1>

        <p className="mt-4 text-sm text-white/70 max-w-2xl">
          By booking an appointment with Secret Finish, you agree to the
          following terms and conditions.
        </p>

        <div className="mt-10 space-y-5">
          {/* Cancellation Policy */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Cancellation Policy</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-white/70">
              <li>
                <span className="font-semibold text-white">
                  Free cancellation
                </span>{" "}
                is available up to{" "}
                <span className="font-semibold text-white">48 hours</span> before
                your scheduled appointment time.
              </li>
              <li>
                Cancellations made{" "}
                <span className="font-semibold text-white">
                  less than 24 hours
                </span>{" "}
                before the appointment may be subject to a{" "}
                <span className="font-semibold text-white">50% charge</span> of
                the scheduled service price.
              </li>
            </ul>
          </section>

          {/* Reschedule Policy */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Reschedule Policy</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-white/70">
              <li>
                You are entitled to{" "}
                <span className="font-semibold text-white">
                  one free reschedule
                </span>{" "}
                within <span className="font-semibold text-white">7 days</span>{" "}
                of the original appointment date, subject to availability.
              </li>
              <li>
                Additional or frequent reschedules may incur a fee at the
                discretion of Secret Finish.
              </li>
            </ul>
          </section>

          {/* Weather Policy */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Weather Policy</h2>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Appointments may be rescheduled by Secret Finish due to rain,
              snow, or extreme temperatures that prevent safe or effective
              service. We will contact you as early as possible to arrange a new
              time.
            </p>
          </section>

          {/* Vehicle Condition */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Vehicle Condition</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-white/70">
              <li>
                Secret Finish is{" "}
                <span className="font-semibold text-white">
                  not responsible
                </span>{" "}
                for any{" "}
                <span className="font-semibold text-white">
                  preexisting damage
                </span>{" "}
                to your vehicle&apos;s interior or exterior.
              </li>
              <li>
                Excessively soiled vehicles (including biohazards, mold, or
                infestation) may be subject to additional charges or refusal of
                service.
              </li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Limitation of Liability</h2>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Secret Finish is not liable for any indirect, incidental, or
              consequential damages, including but not limited to loss of use,
              time, or profits, arising from or related to the services
              provided.
            </p>
          </section>

          {/* Service Agreement */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Service Agreement</h2>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              By booking, you confirm that you have read and agree to these
              terms and policies. You are responsible for providing access to
              the vehicle at the scheduled time and for informing us of any
              special conditions or concerns related to your vehicle.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/book"
                className="inline-flex items-center justify-center rounded-xl bg-[#BFFB00] px-5 py-3 font-semibold text-black hover:opacity-90"
              >
                Book an Appointment
              </a>
            </div>

            <p className="mt-4 text-xs text-white/50">
              Last updated: {new Date().getFullYear()}
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
