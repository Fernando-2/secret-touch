// app/about/page.tsx
export const metadata = {
  title: "About | Secret Finish",
  description: "Learn about Secret Finish and our mobile detailing service.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-16 space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-widest text-[#BFFB00]">
            ABOUT
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">About Secret Finish</h1>
        </div>

        <p className="text-sm text-white/70 leading-relaxed max-w-3xl">
          Secret Finish is a mobile detailing service dedicated to making your
          car look, feel, and smell brand new—without you ever leaving your
          driveway. We focus on quality, consistency, and clear communication so
          you always know what you&apos;re getting.
        </p>

        <p className="text-sm text-white/70 leading-relaxed max-w-3xl">
          Whether it&apos;s a quick refresh or a full interior and exterior
          detail, we treat every vehicle like it&apos;s our own. Our goal is to
          build long-term relationships with customers who care about their
          vehicles and want a detailer they can trust.
        </p>

        <div className="grid gap-4 md:grid-cols-3 text-sm">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold mb-2">Mobile convenience</h2>
            <p className="text-white/70">
              We come to your home or workplace with everything needed to get
              the job done.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold mb-2">Premium products</h2>
            <p className="text-white/70">
              We use professional-grade products and tools to protect your
              interior and exterior.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold mb-2">Clear policies</h2>
            <p className="text-white/70">
              Transparent cancellation, rescheduling, and weather policies so
              there are no surprises.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <a
            href="/booking"
            className="inline-flex items-center justify-center rounded-xl bg-[#BFFB00] px-5 py-3 font-semibold text-black hover:opacity-90"
          >
            Book an Appointment
          </a>
          <a
            href="/terms"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 font-semibold text-white hover:bg-white/5"
          >
            View Policies
          </a>
        </div>
      </section>
    </main>
  );
}
