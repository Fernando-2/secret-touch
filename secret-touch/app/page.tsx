// app/page.tsx
import Link from "next/link";

const services = [
  {
    name: "Interior Detail",
    description: "Deep vacuum, stain treatment, plastics cleaned and dressed.",
    price: "From $120",
  },
  {
    name: "Exterior Detail",
    description: "Hand wash, clay bar, wax, wheels & tires cleaned and dressed.",
    price: "From $100",
  },
  {
    name: "Full Detail",
    description: "Complete interior & exterior refresh for your vehicle.",
    price: "From $200",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-10 items-center mt-6">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-sky-400">
            Mobile Detailing • [Your City]
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Premium mobile detailing{" "}
            <span className="text-sky-400">at your doorstep.</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base">
            Secret Touch brings showroom-level detailing directly to your home
            or office. Choose a package, pick a time, and we’ll handle the rest.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/booking"
              className="px-5 py-2.5 rounded-md bg-sky-500 text-slate-950 text-sm font-medium hover:bg-sky-400 transition-colors"
            >
              Book an Appointment
            </Link>
            <Link
              href="/about"
              className="px-5 py-2.5 rounded-md border border-slate-700 text-sm hover:border-sky-500 transition-colors"
            >
              Learn More
            </Link>
          </div>

          <p className="text-xs text-slate-400 pt-2">
            Fully insured • Professional products • 100% mobile service
          </p>
        </div>

        {/* Placeholder “image” block */}
        <div className="h-64 md:h-80 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-800 to-sky-950 flex items-center justify-center text-slate-300 text-sm">
          Add a hero image of a freshly detailed car here.
        </div>
      </section>

      {/* Services preview */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Popular services</h2>
          <Link
            href="/booking"
            className="text-xs text-sky-400 hover:underline"
          >
            View all & book →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.name}
              className="border border-slate-800 rounded-xl p-4 flex flex-col justify-between bg-slate-900/40"
            >
              <div>
                <h3 className="font-medium mb-1">{service.name}</h3>
                <p className="text-xs text-slate-300 mb-3">
                  {service.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-sky-400">
                  {service.price}
                </span>
                <Link
                  href="/booking"
                  className="text-xs border border-slate-700 rounded-md px-2 py-1 hover:border-sky-500"
                >
                  Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Policies teaser */}
      <section className="border border-slate-800 rounded-2xl p-4 md:p-6 bg-slate-900/40 text-sm">
        <h2 className="text-lg font-semibold mb-2">Clear policies, no surprises.</h2>
        <p className="text-slate-300 mb-2">
          We respect your time and your vehicle. Cancellations, rescheduling,
          and weather interruptions are all handled through simple, transparent
          policies so you know exactly what to expect.
        </p>
        <p className="text-xs text-slate-400">
          Full details will appear on your booking confirmation and policy
          pages.
        </p>
      </section>
    </div>
  );
}
