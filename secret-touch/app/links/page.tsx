import Image from "next/image";

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        {/* Brand */}
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-widest text-[#BFFB00]">
            SECRET FINISH
          </p>
          <h1 className="text-3xl font-bold tracking-wide">Secret Finish</h1>
          <p className="text-white/70">Premium auto detailing</p>
        </div>

        {/* QR Image */}
        <div className="flex justify-center">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <Image
              src="/secretfinishQRcode.png"
              alt="Secret Finish QR Code"
              width={220}
              height={220}
              className="rounded-xl bg-white p-2"
              priority
            />
            <p className="mt-3 text-xs text-white/60">
              Scan to book or view links
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-3">
          <a
            href="/booking"
            className="block rounded-xl bg-[#BFFB00] px-4 py-3 font-semibold text-black hover:opacity-90 transition"
          >
            Book an Appointment
          </a>

          <a
            href="https://instagram.com/secretfinish"
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white hover:border-[#BFFB00]/50 hover:bg-white/10 transition"
          >
            Instagram
          </a>

          <a
            href="mailto:info@secretfinish.co"
            className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white hover:border-[#BFFB00]/50 hover:bg-white/10 transition"
          >
            Email Us
          </a>
        </div>

        <p className="text-xs text-white/40 pt-4">
          © {new Date().getFullYear()} Secret Finish
        </p>
      </div>
    </main>
  );
}
