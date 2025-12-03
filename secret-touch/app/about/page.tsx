// app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold mb-2">About Secret Touch</h1>

      <p className="text-sm text-slate-300">
        Secret Touch is a mobile detailing service dedicated to making your car
        look, feel, and smell brand new—without you ever leaving your driveway.
        We focus on quality, consistency, and clear communication so you always
        know what you&apos;re getting.
      </p>

      <p className="text-sm text-slate-300">
        Whether it&apos;s a quick refresh or a full interior and exterior
        detail, we treat every vehicle like it&apos;s our own. Our goal is to
        build long-term relationships with customers who care about their
        vehicles and want a detailer they can trust.
      </p>

      <div className="grid md:grid-cols-3 gap-4 text-sm">
        <div className="border border-slate-800 rounded-xl p-4 bg-slate-900/40">
          <h2 className="font-medium mb-1">Mobile convenience</h2>
          <p className="text-slate-300">
            We come to your home or workplace with everything needed to get the
            job done.
          </p>
        </div>
        <div className="border border-slate-800 rounded-xl p-4 bg-slate-900/40">
          <h2 className="font-medium mb-1">Premium products</h2>
          <p className="text-slate-300">
            We use professional-grade products and tools to protect your
            interior and exterior.
          </p>
        </div>
        <div className="border border-slate-800 rounded-xl p-4 bg-slate-900/40">
          <h2 className="font-medium mb-1">Clear policies</h2>
          <p className="text-slate-300">
            Transparent cancellation, rescheduling, and weather policies so
            there are no surprises.
          </p>
        </div>
      </div>
    </div>
  );
}
