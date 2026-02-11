// app/contact/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Contact | Secret Finish",
  description: "Contact Secret Finish for questions, quotes, and support.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-16">
        {/* Header */}
        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-widest text-[#BFFB00]">
            CONTACT
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">Get in touch</h1>
          <p className="text-white/70 max-w-2xl">
            Questions about services, pricing, availability, or policies? Send a
            message and we’ll get back to you as soon as possible.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Contact form */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-xl font-semibold">Send a message</h2>
            <p className="mt-2 text-sm text-white/70">
              Fill out the form below and we’ll reply by email.
            </p>

            <form className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-white/70">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#BFFB00] focus:ring-1 focus:ring-[#BFFB00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-white/70">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#BFFB00] focus:ring-1 focus:ring-[#BFFB00]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wide text-white/70">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="What can we help with?"
                  className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#BFFB00] focus:ring-1 focus:ring-[#BFFB00]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wide text-white/70">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us about your vehicle, the service you’re interested in, and your preferred time/day."
                  className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#BFFB00] focus:ring-1 focus:ring-[#BFFB00]"
                />
              </div>

              {/* UI-only submit (wire to API later if you want) */}
              <button
                type="button"
                className="w-full rounded-full bg-[#BFFB00] px-4 py-2.5 text-sm font-semibold text-black shadow-md shadow-[#BFFB00]/20 transition hover:opacity-90"
              >
                Send message
              </button>

              <p className="text-[11px] text-white/50">
                Prefer booking instead?{" "}
                <Link href="/booking" className="text-[#BFFB00] hover:underline">
                  Book an appointment
                </Link>
                .
              </p>
            </form>
          </div>

          {/* Contact info / quick actions */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h2 className="text-xl font-semibold">Quick contact</h2>
              <p className="mt-2 text-sm text-white/70">
                Use the options below or send a message using the form.
              </p>

              <div className="mt-6 grid gap-3">
                <a
                  href="mailto:info@secretfinish.co"
                  className="rounded-2xl border border-white/10 bg-black/30 p-4 hover:border-[#BFFB00]/40 hover:bg-white/10 transition"
                >
                  <p className="text-sm font-semibold">Email</p>
                  <p className="text-sm text-white/70">info@secretfinish.co</p>
                </a>

                <a
                  href="https://instagram.com/secretfinish"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/10 bg-black/30 p-4 hover:border-[#BFFB00]/40 hover:bg-white/10 transition"
                >
                  <p className="text-sm font-semibold">Instagram</p>
                  <p className="text-sm text-white/70">@secretfinish</p>
                </a>

                {/* Placeholder phone block (fill later) */}
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-sm font-semibold">Phone / Text</p>
                  <p className="text-sm text-white/70">
                    Add phone number here
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    (Optional) Most customers contact us by email or booking.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h2 className="text-xl font-semibold">Response time</h2>
              <p className="mt-2 text-sm text-white/70">
                We typically respond within 24 hours. For time-sensitive
                requests, booking is the fastest way to reserve availability.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center rounded-xl bg-[#BFFB00] px-5 py-3 font-semibold text-black hover:opacity-90 transition"
                >
                  Book now
                </Link>
                <Link
                  href="/terms"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-black/30 px-5 py-3 font-semibold text-white/80 hover:border-[#BFFB00]/40 hover:bg-white/10 transition"
                >
                  Policies
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-xs text-white/40">
          © {new Date().getFullYear()} Secret Finish
        </p>
      </section>
    </main>
  );
}
