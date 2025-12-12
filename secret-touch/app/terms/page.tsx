// app/terms/page.tsx
export default function TermsPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-semibold">Terms of Service & Policies</h1>
      <p className="text-sm text-slate-300">
        By booking an appointment with Secret Finish, you agree to the
        following terms and conditions.
      </p>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold">Cancellation Policy</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-semibold">Free cancellation</span> is
            available up to <span className="font-semibold">48 hours</span>{" "}
            before your scheduled appointment time.
          </li>
          <li>
            Cancellations made{" "}
            <span className="font-semibold">less than 24 hours</span> before the
            appointment may be subject to a{" "}
            <span className="font-semibold">50% charge</span> of the scheduled
            service price.
          </li>
        </ul>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold">Reschedule Policy</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            You are entitled to <span className="font-semibold">
              one free reschedule
            </span>{" "}
            within <span className="font-semibold">7 days</span> of the original
            appointment date, subject to availability.
          </li>
          <li>
            Additional or frequent reschedules may incur a fee at the discretion
            of Secret Finish.
          </li>
        </ul>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold">Weather Policy</h2>
        <p>
          Appointments may be rescheduled by Secret Finish due to rain, snow, or
          extreme temperatures that prevent safe or effective service. We will
          contact you as early as possible to arrange a new time.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold">Vehicle Condition</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Secret Finish is <span className="font-semibold">not responsible</span>{" "}
            for any <span className="font-semibold">preexisting damage</span> to
            your vehicle&apos;s interior or exterior.
          </li>
          <li>
            Excessively soiled vehicles (including biohazards, mold, or
            infestation) may be subject to additional charges or refusal of
            service.
          </li>
        </ul>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold">Limitation of Liability</h2>
        <p>
          Secret Finish is not liable for any indirect, incidental, or
          consequential damages, including but not limited to loss of use, time,
          or profits, arising from or related to the services provided.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold">Service Agreement</h2>
        <p>
          By booking, you confirm that you have read and agree to these terms
          and policies. You are responsible for providing access to the vehicle
          at the scheduled time and for informing us of any special conditions
          or concerns related to your vehicle.
        </p>
      </section>
    </div>
  );
}
