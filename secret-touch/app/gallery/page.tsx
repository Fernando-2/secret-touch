export const metadata = {
  title: "Before & After Gallery | Secret Finish",
  description: "See real before & after results from our mobile detailing services.",
};

type GalleryItem = {
  id: string;
  title: string;
  service?: string;
  beforeUrl?: string;
  afterUrl?: string;
  note?: string;
};

// Empty for now — fill later
const galleryItems: GalleryItem[] = [];

function EmptyState() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/30">
        <span className="text-[#BFFB00] text-2xl">★</span>
      </div>

      <h2 className="mt-4 text-2xl font-semibold">Gallery coming soon</h2>
      <p className="mt-2 text-white/70 max-w-xl mx-auto">
        We’re building this page with real before & after transformations. Check
        back soon, or book an appointment to be featured.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a
          href="/book"
          className="inline-flex items-center justify-center rounded-xl bg-[#BFFB00] px-5 py-3 font-semibold text-black hover:opacity-90"
        >
          Book an Appointment
        </a>
      </div>

      {/* Placeholder grid */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-left">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-black/30 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold">Future transformation</p>
              <span className="text-xs text-white/60">Slot {i + 1}</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-dashed border-white/15 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white/80">Before</p>
                <p className="mt-2 text-xs text-white/60">
                  Add photo here later
                </p>
              </div>

              <div className="rounded-xl border border-dashed border-white/15 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white/80">After</p>
                <p className="mt-2 text-xs text-white/60">
                  Add photo here later
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-white/60">
              Example: Full Detail • Sedan • 2–3 hours
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-white/60">{item.service ?? ""}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
              {item.beforeUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.beforeUrl}
                  alt={`${item.title} - Before`}
                  className="h-40 w-full object-cover"
                />
              ) : (
                <div className="flex h-40 items-center justify-center text-sm text-white/60">
                  Before image
                </div>
              )}
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
              {item.afterUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.afterUrl}
                  alt={`${item.title} - After`}
                  className="h-40 w-full object-cover"
                />
              ) : (
                <div className="flex h-40 items-center justify-center text-sm text-white/60">
                  After image
                </div>
              )}
            </div>
          </div>

          {item.note ? (
            <p className="mt-4 text-sm text-white/70">{item.note}</p>
          ) : (
            <p className="mt-4 text-sm text-white/60">
              Tap to see details (coming soon).
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

export default function GalleryPage() {
  const hasItems = galleryItems.length > 0;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <p className="text-[#BFFB00] tracking-widest text-xs font-semibold">
          RESULTS
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold">
          Before & After Gallery
        </h1>
        <p className="mt-4 text-white/70 max-w-2xl">
          Real transformations from our mobile detailing services. Browse our
          work and see the difference a professional detail can make.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/booking"
            className="inline-flex items-center justify-center rounded-xl bg-[#BFFB00] px-5 py-3 font-semibold text-black hover:opacity-90"
          >
            Book Now
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 font-semibold text-white hover:bg-white/5"
          >
            View Services
          </a>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        {hasItems ? <GalleryGrid items={galleryItems} /> : <EmptyState />}
      </section>
    </main>
  );
}
