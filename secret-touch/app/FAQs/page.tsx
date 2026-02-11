export const metadata = {
  title: "FAQs | Secret Finish",
  description: "Frequently asked questions about Secret Finish mobile detailing.",
};

const faqs = [
  {
    q: "Do you come to my home or workplace?",
    a: "Yes. We’re 100% mobile — we come to your home, office, or wherever your vehicle is parked (within our service area).",
  },
  {
    q: "What do I need to provide (water, electricity)?",
    a: "In most cases, access to a water spigot and an outdoor outlet is helpful. If you don’t have access, contact us and we’ll confirm options based on your location and service.",
  },
  {
    q: "How long does a detail take?",
    a: "Most appointments take 1–3 hours depending on vehicle size, condition, and the package you choose. Heavier soil or pet hair can take longer.",
  },
  {
    q: "What’s included in an Interior Detail?",
    a: "Interior vacuuming, wipe-down of surfaces, light stain treatment (where applicable), cleaning of plastics/trim, windows, and finishing touches.",
  },
  {
    q: "What’s included in an Exterior Detail?",
    a: "Hand wash, wheel & tire cleaning, drying, and a shine finish. Add-ons like wax/sealant or clay bar may be available depending on your packages.",
  },
  {
    q: "Do you offer same-day or next-day appointments?",
    a: "Sometimes, depending on availability. The booking page shows the soonest times we can offer. If you need something urgent, contact us.",
  },
  {
    q: "What is your cancellation / reschedule policy?",
    a: "Free cancellation up to 48 hours. Cancellations within 24 hours may be charged 50%. One free reschedule within 7 days; additional reschedules may incur a fee.",
  },
  {
    q: "What happens if the weather is bad?",
    a: "For rain, snow, or extreme temperatures, we may reschedule for safety and quality. We’ll reach out to coordinate a new time.",
  },
  {
    q: "Do you handle pet hair and heavy stains?",
    a: "Yes, but heavy pet hair and deep stains can require extra time and may be priced as an add-on depending on severity.",
  },
  {
    q: "How do I pay?",
    a: "Payment options depend on what you’ve enabled (card, invoice, etc.). If you’re unsure, book your appointment and we’ll confirm payment details before service.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-10">
        <p className="text-[#BFFB00] tracking-widest text-xs font-semibold">
          HELP CENTER
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-white/70 max-w-2xl">
          Quick answers about our mobile detailing services, booking, policies,
          and what to expect on appointment day.
        </p>

        {/* Quick CTA */}
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/booking"
            className="inline-flex items-center justify-center rounded-xl bg-[#BFFB00] px-5 py-3 font-semibold text-black hover:opacity-90"
          >
            Book an Appointment
          </a>
        </div>
      </section>

      {/* FAQ List */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-4">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-lg font-semibold">{item.q}</span>

                {/* plus/minus icon */}
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/30">
                  <span className="text-[#BFFB00] text-xl leading-none group-open:hidden">
                    +
                  </span>
                  <span className="text-[#BFFB00] text-xl leading-none hidden group-open:block">
                    –
                  </span>
                </span>
              </summary>

              <p className="mt-3 text-white/70 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="/booking"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 font-semibold text-white hover:bg-white/5"
            >
              View Availability
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}