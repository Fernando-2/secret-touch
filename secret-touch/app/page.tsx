// app/page.tsx
import Link from "next/link";

const services = [
  {
    id: "interior-detail",
    name: "Interior Detail",
    short: "Deep vacuum, stain treatment, plastics cleaned and dressed.",
    price: "Starting at $120",
  },
  {
    id: "exterior-detail",
    name: "Exterior Detail",
    short: "Hand wash, clay bar, wax, wheels & tires cleaned and dressed.",
    price: "Starting at $100",
  },
  {
    id: "full-detail",
    name: "Full Detail",
    short: "Complete interior & exterior refresh for your vehicle.",
    price: "Starting at $200",
  },
];

function ServiceSection({
  id,
  name,
  price,
  intro,
  bullets,
  process,
  addOns,
  notes,
}: {
  id: string;
  name: string;
  price: string;
  intro: string;
  bullets: string[];
  process: string[];
  addOns: string[];
  notes: string[];
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-widest text-[#BFFB00]">
            SERVICE
          </p>
          <h3 className="text-2xl md:text-3xl font-semibold">{name}</h3>
          <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
            {intro}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-[#BFFB00]/30 bg-[#BFFB00]/10 px-3 py-1 text-sm font-semibold text-[#BFFB00]">
            {price}
          </span>
          <Link
            href="/booking"
            className="rounded-xl bg-[#BFFB00] px-4 py-2 text-sm font-semibold text-black hover:opacity-90 transition"
          >
            Book this service
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Placeholder image */}
        <div className="h-64 rounded-2xl border border-dashed border-white/15 bg-black/30 flex items-center justify-center text-white/50 text-sm">
          Add a service photo / before & after image here.
        </div>

        {/* What’s included */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">What’s included</h4>
          <ul className="grid gap-2 text-sm text-white/70">
            {bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-1 text-[#BFFB00]">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-sm font-semibold text-white">Pricing</p>
            <p className="mt-1 text-sm text-white/70">
              {price}. Final total may vary by vehicle size/condition and add-ons.
              (You can replace this with exact tier pricing later.)
            </p>

            {/* Optional placeholder pricing tiers */}
            <div className="mt-3 grid gap-2 text-sm">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <span className="text-white/70">Sedan / Coupe</span>
                <span className="font-semibold text-white">$___</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <span className="text-white/70">SUV / Crossover</span>
                <span className="font-semibold text-white">$___</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <span className="text-white/70">Truck / Van / 3-row</span>
                <span className="font-semibold text-white">$___</span>
              </div>
            </div>

            <p className="mt-3 text-xs text-white/50">
              Tip: Replace the $___ values once you finalize your pricing tiers.
            </p>
          </div>
        </div>
      </div>

      {/* Process + Add-ons */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <h4 className="text-lg font-semibold">How it works</h4>
          <ol className="mt-3 space-y-2 text-sm text-white/70">
            {process.map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs text-[#BFFB00]">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <h4 className="text-lg font-semibold">Popular add-ons</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {addOns.map((a) => (
              <li key={a} className="flex gap-2">
                <span className="mt-1 text-[#BFFB00]">•</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-white/50">
            Add-on pricing can be listed here once finalized (e.g., $___).
          </p>
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h4 className="text-lg font-semibold">Good to know</h4>
        <ul className="mt-3 space-y-2 text-sm text-white/70">
          {notes.map((n) => (
            <li key={n} className="flex gap-2">
              <span className="mt-1 text-[#BFFB00]">•</span>
              <span>{n}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/booking"
            className="rounded-xl bg-[#BFFB00] px-4 py-2 text-sm font-semibold text-black hover:opacity-90 transition"
          >
            Book now
          </Link>
          <Link
            href="/terms"
            className="rounded-xl border border-white/15 bg-black/30 px-4 py-2 text-sm font-semibold text-white/80 hover:border-[#BFFB00]/40 hover:bg-white/10 transition"
          >
            View policies
          </Link>
          <a
            href="#top"
            className="rounded-xl border border-white/15 bg-black/30 px-4 py-2 text-sm font-semibold text-white/80 hover:border-[#BFFB00]/40 hover:bg-white/10 transition"
          >
            Back to top
          </a>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main id="top" className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 space-y-12">
        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#BFFB00]">
              Mobile Detailing • Philadelphia
            </p>

            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              Premium mobile detailing{" "}
              <span className="text-[#BFFB00]">at your doorstep.</span>
            </h1>

            <p className="text-white/70 text-sm md:text-base">
              Secret Finish brings showroom-level detailing directly to your home
              or office. Choose a package, pick a time, and we’ll handle the rest.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/booking"
                className="px-5 py-2.5 rounded-xl bg-[#BFFB00] text-black text-sm font-semibold hover:opacity-90 transition"
              >
                Book an Appointment
              </Link>

              <Link
                href="/about"
                className="px-5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 hover:border-[#BFFB00]/40 transition"
              >
                Learn More
              </Link>
            </div>

            <p className="text-xs text-white/50 pt-2">
              Fully insured • Professional products • 100% mobile service
            </p>
          </div>

          {/* Placeholder “image” block */}
          <div className="h-64 md:h-80 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-white/60 text-sm">
            Add a hero image of a freshly detailed car here.
          </div>
        </section>

        {/* Services dropdown */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-semibold">Popular services</h2>

            <Link href="/booking" className="text-xs text-[#BFFB00] hover:underline">
              View all & book →
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* Dropdown menu */}
            <details className="group rounded-2xl border border-white/10 bg-white/5 p-5">
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Choose a service
                    </p>
                    <p className="text-xs text-white/60">
                      Jump to detailed pricing & descriptions below.
                    </p>
                  </div>
                  <span className="text-[#BFFB00] transition group-open:rotate-180">
                    ▼
                  </span>
                </div>
              </summary>

              <div className="mt-4 space-y-2">
                {services.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block rounded-xl border border-white/10 bg-black/30 px-4 py-3 hover:border-[#BFFB00]/40 hover:bg-white/10 transition"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold">{s.name}</p>
                        <p className="text-xs text-white/60">{s.short}</p>
                      </div>
                      <span className="text-sm font-semibold text-[#BFFB00]">
                        {s.price}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </details>

            {/* Quick help / CTA panel */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold">Not sure which to choose?</h3>
              <p className="mt-2 text-sm text-white/70">
                Pick a service from the dropdown to see what’s included, how long it
                takes, and pricing details. If you’re unsure, Full Detail is the best
                “reset” package for most vehicles.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/booking"
                  className="rounded-xl bg-[#BFFB00] px-4 py-2 text-sm font-semibold text-black hover:opacity-90 transition"
                >
                  Book now
                </Link>
                <Link
                  href="/terms"
                  className="rounded-xl border border-white/15 bg-black/30 px-4 py-2 text-sm font-semibold text-white/80 hover:border-[#BFFB00]/40 hover:bg-white/10 transition"
                >
                  Policies
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed service sections */}
        <section className="space-y-6">
          <ServiceSection
            id="interior-detail"
            name="Interior Detail"
            price="Starting at $120"
            intro="Perfect for restoring the cabin: dust, crumbs, stains, and odors. Designed to make your interior feel fresh, clean, and comfortable again."
            bullets={[
              "Thorough vacuum (seats, carpets, mats, cracks & crevices)",
              "Wipe-down + cleaning of dash, console, door panels, and trim",
              "Light stain treatment where applicable (spot cleaning)",
              "Interior glass cleaning for a streak-free finish",
              "Plastics/trim cleaned and dressed (non-greasy finish)",
              "Final inspection + touch-ups before we leave",
            ]}
            process={[
              "We arrive, confirm the service, and do a quick walkaround with you.",
              "We deep-vacuum and remove loose debris from all interior surfaces.",
              "We clean/dress plastics and perform spot stain treatment as needed.",
              "We finish with glass, final touch-ups, and a clean presentation.",
            ]}
            addOns={[
              "Pet hair removal (price varies by severity) — $___",
              "Deep shampoo extraction (seats/carpets) — $___",
              "Odor neutralizer / deodorizing — $___",
              "Leather conditioning — $___",
            ]}
            notes={[
              "Remove personal items if possible to speed up the appointment.",
              "Excessively soiled interiors may require additional time/charges.",
              "Exact pricing tiers can be placed in the Pricing box above once finalized.",
            ]}
          />

          <ServiceSection
            id="exterior-detail"
            name="Exterior Detail"
            price="Starting at $100"
            intro="A safe, professional wash designed to protect your paint and leave a clean, glossy finish. Great for maintenance or getting your car photo-ready."
            bullets={[
              "Hand wash using safe methods (reduces swirl risk)",
              "Wheel & tire cleaning (faces + visible barrels)",
              "Tire dressing for a deep, clean look",
              "Clay bar treatment (as needed / package dependent)",
              "Wax/sealant option (as needed / package dependent)",
              "Final wipe-down and inspection for a crisp finish",
            ]}
            process={[
              "We inspect the paint/wheels and confirm what you want done today.",
              "We wash safely, focusing on high-contact areas and proper rinse technique.",
              "We clean wheels/tires and apply dressing for a finished appearance.",
              "We dry thoroughly and do final touch-ups/inspection.",
            ]}
            addOns={[
              "Wax / paint sealant upgrade — $___",
              "Clay bar decontamination — $___",
              "Headlight restoration — $___",
              "Bug/tar removal — $___",
            ]}
            notes={[
              "Shade/garage access is helpful but not required in most cases.",
              "Weather may require rescheduling for the best results.",
              "If you want ceramic protection later, this is a great prep step.",
            ]}
          />

          <ServiceSection
            id="full-detail"
            name="Full Detail"
            price="Starting at $200"
            intro="The complete reset. Interior + exterior detailing designed to transform the entire vehicle. Best for first-time customers or vehicles that need a full refresh."
            bullets={[
              "Everything included in Interior Detail",
              "Everything included in Exterior Detail",
              "Extra attention to high-touch and high-traffic areas",
              "Enhanced finishing touches (trim, edges, details)",
              "Final walkaround and photo-ready finish",
              "Recommended for seasonal resets or special events",
            ]}
            process={[
              "We confirm priorities and walkaround the vehicle with you.",
              "We complete the interior first (vacuum, wipe-down, stains, glass).",
              "We wash and finish the exterior (wheels, paint, drying, touch-ups).",
              "We complete a final inspection and confirm you’re happy before leaving.",
            ]}
            addOns={[
              "Seat/carpets deep extraction — $___",
              "Wax / sealant upgrade — $___",
              "Engine bay cleaning — $___",
              "Pet hair + odor bundle — $___",
            ]}
            notes={[
              "Plan for a longer appointment window (varies by condition).",
              "This package gives the best overall transformation and results.",
              "If your vehicle has heavy pet hair or staining, ask about add-ons.",
            ]}
          />
        </section>

        {/* Policies teaser */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-7">
          <h2 className="text-lg font-semibold mb-2">
            Clear policies, no surprises.
          </h2>

          <p className="text-white/70 mb-2 text-sm leading-relaxed">
            We respect your time and your vehicle. Cancellations, rescheduling,
            and weather interruptions are all handled through simple, transparent
            policies so you know exactly what to expect.
          </p>

          <p className="text-xs text-white/50">
            Full details will appear on your booking confirmation and policy pages.
          </p>

          <div className="mt-4">
            <Link
              href="/terms"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-black/30 px-4 py-2 text-sm font-semibold text-white/80 hover:border-[#BFFB00]/40 hover:bg-white/10 transition"
            >
              View policies →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
