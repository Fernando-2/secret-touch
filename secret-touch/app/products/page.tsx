// app/products/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Products | Secret Finish",
  description: "Shop products and memberships from Secret Finish (coming soon).",
};

type Membership = {
  id: string;
  name: string;
  price: string; // "$__ / month"
  highlight?: boolean;
  description: string;
  includes: string[];
  notes: string[];
};

type Product = {
  id: string;
  name: string;
  price?: string;
  category: "Interior" | "Exterior" | "Accessories";
  description?: string;
  imageUrl?: string; // later: "/products/item.jpg"
  inStock?: boolean;
};

// Empty for now — fill later
const products: Product[] = [];

// Memberships (edit these later with exact details)
const memberships: Membership[] = [
  {
    id: "membership-basic",
    name: "Maintenance",
    price: "$__ / month",
    description:
      "Perfect for keeping your vehicle consistently clean with scheduled maintenance visits.",
    includes: [
      "1 maintenance wash per month",
      "Light interior wipe-down + vacuum",
      "Wheel & tire clean + shine",
      "Priority scheduling",
    ],
    notes: [
      "Replace $__ with your real price.",
      "Add any limits (vehicle size, condition, travel radius).",
    ],
  },
  {
    id: "membership-plus",
    name: "Premium",
    price: "$__ / month",
    highlight: true,
    description:
      "Best value for most customers — a deeper clean more often, with extra interior attention.",
    includes: [
      "2 maintenance visits per month",
      "Interior detail touch-up each visit",
      "Spray sealant / protection boost",
      "Priority scheduling + member support",
    ],
    notes: [
      "Mark this as your “most popular” plan.",
      "Add add-on discounts if you want (e.g., 10% off).",
    ],
  },
  {
    id: "membership-elite",
    name: "Elite",
    price: "$__ / month",
    description:
      "For enthusiasts and busy professionals who want maximum consistency and top-tier care.",
    includes: [
      "Weekly or bi-weekly options (set your rule)",
      "Deep interior refresh (monthly)",
      "Exterior protection boost (monthly)",
      "Top priority scheduling",
    ],
    notes: [
      "Define what 'deep refresh' includes.",
      "Add any exclusions for heavily soiled vehicles.",
    ],
  },
];

function PlaceholderImage() {
  return (
    <div className="h-36 rounded-xl border border-dashed border-white/15 bg-black/30 flex items-center justify-center">
      <span className="text-xs text-white/50">Image placeholder</span>
    </div>
  );
}

function MembershipCard({ m }: { m: Membership }) {
  return (
    <div
      className={
        "rounded-2xl border bg-white/5 p-6 " +
        (m.highlight
          ? "border-[#BFFB00]/40 shadow-[0_0_0_1px_rgba(191,251,0,0.25)]"
          : "border-white/10")
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-widest text-[#BFFB00]">
            MEMBERSHIP
          </p>
          <h3 className="mt-2 text-2xl font-semibold">{m.name}</h3>
          <p className="mt-2 text-sm text-white/70">{m.description}</p>
        </div>

        {m.highlight && (
          <span className="rounded-full border border-[#BFFB00]/30 bg-[#BFFB00]/10 px-3 py-1 text-[11px] font-semibold text-[#BFFB00]">
            Most popular
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-lg font-semibold text-[#BFFB00]">{m.price}</span>
        <button
          disabled
          className="rounded-xl bg-[#BFFB00] px-4 py-2 text-sm font-semibold text-black opacity-60 cursor-not-allowed"
        >
          Join (coming soon)
        </button>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold">What’s included</p>
        <ul className="mt-2 space-y-2 text-sm text-white/70">
          {m.includes.map((x) => (
            <li key={x} className="flex gap-2">
              <span className="mt-1 text-[#BFFB00]">•</span>
              <span>{x}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
        <p className="text-xs font-semibold text-white/80">Notes</p>
        <ul className="mt-2 space-y-1 text-xs text-white/60">
          {m.notes.map((n) => (
            <li key={n}>• {n}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProductSkeletonCard({ idx }: { idx: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-white">Product slot</p>
        <span className="text-xs text-white/50">#{idx}</span>
      </div>

      <div className="mt-3">
        <PlaceholderImage />
      </div>

      <div className="mt-3 space-y-2">
        <div className="h-3 w-2/3 rounded bg-white/10" />
        <div className="h-3 w-1/2 rounded bg-white/10" />
        <div className="mt-2 inline-flex rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[11px] text-white/60">
          Coming soon
        </div>
      </div>

      <button
        disabled
        className="mt-4 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm font-semibold text-white/50 cursor-not-allowed"
      >
        Add to cart
      </button>
    </div>
  );
}

export default function ProductsPage() {
  const hasProducts = products.length > 0;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <p className="text-xs font-semibold tracking-widest text-[#BFFB00]">
          SHOP
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold">Products</h1>
        <p className="mt-4 text-white/70 max-w-2xl">
          Shop premium products and memberships from Secret Finish. Checkout is
          coming soon — for now, you can browse what we offer and contact us with
          questions.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/booking"
            className="rounded-xl bg-[#BFFB00] px-5 py-3 font-semibold text-black hover:opacity-90 transition"
          >
            Book a Detail
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-white/15 bg-black/30 px-5 py-3 font-semibold text-white/80 hover:border-[#BFFB00]/40 hover:bg-white/10 transition"
          >
            Ask a question
          </Link>
        </div>
      </section>

      {/* Memberships */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold">Membership packages</h2>
          <span className="text-xs text-white/60">
            (Edit pricing & details anytime)
          </span>
        </div>

        <p className="mt-3 text-sm text-white/70 max-w-3xl">
          Memberships are designed to keep your vehicle consistently clean at a
          predictable monthly cost. Pick a plan and we’ll schedule recurring
          visits that fit your routine.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {memberships.map((m) => (
            <MembershipCard key={m.id} m={m} />
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold">Membership terms (placeholder)</h3>
          <p className="mt-2 text-sm text-white/70">
            Add your real membership rules here (billing date, cancellations,
            missed appointments, service area, vehicle condition limits, etc.).
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/terms"
              className="rounded-xl border border-white/15 bg-black/30 px-5 py-3 font-semibold text-white/80 hover:border-[#BFFB00]/40 hover:bg-white/10 transition"
            >
              View policies
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/15 bg-black/30 px-5 py-3 font-semibold text-white/80 hover:border-[#BFFB00]/40 hover:bg-white/10 transition"
            >
              Contact for membership
            </Link>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-semibold">Products</h2>
        <p className="mt-3 text-sm text-white/70 max-w-3xl">
          Detailing chemicals, tools, and accessories will appear here once
          inventory and checkout are enabled.
        </p>

        {!hasProducts ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-semibold">Store launching soon</h3>
            <p className="mt-2 text-white/70 max-w-2xl">
              We’re preparing inventory, photos, and checkout. Check back soon,
              or contact us to ask about product availability.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductSkeletonCard key={i} idx={i + 1} />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="text-sm text-white/60">{p.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-[#BFFB00]">
                    {p.price ?? ""}
                  </span>
                </div>

                <div className="mt-3 h-36 rounded-xl border border-white/10 bg-black/30 overflow-hidden flex items-center justify-center">
                  {p.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-white/50">No image</span>
                  )}
                </div>

                {p.description && (
                  <p className="mt-3 text-sm text-white/70">{p.description}</p>
                )}

                <button
                  className="mt-4 w-full rounded-xl bg-[#BFFB00] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
                  disabled={p.inStock === false}
                >
                  {p.inStock === false ? "Out of stock" : "Add to cart"}
                </button>

                <p className="mt-2 text-[11px] text-white/50">
                  Checkout coming soon.
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
