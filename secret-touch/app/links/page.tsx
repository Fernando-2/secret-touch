import Image from "next/image";

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 text-center">

        {/* Logo / Brand */}
        <h1 className="text-3xl font-bold tracking-wide">
          Secret Finish
        </h1>
        <p className="text-neutral-400">
          Premium auto detailing
        </p>

        {/* QR Image */}
        <div className="flex justify-center">
          <Image
            src="/secretfinishQRcode.png"
            alt="Secret Finish QR Code"
            width={220}
            height={220}
            className="rounded-xl bg-white p-2"
            priority
          />
        </div>

        {/* Links */}
        <div className="space-y-3">
          <a
            href="/booking"
            className="block rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-black hover:bg-emerald-400 transition"
          >
            Book an Appointment
          </a>

          <a
            href="https://instagram.com/secretfinish"
            target="_blank"
            className="block rounded-xl bg-neutral-800 px-4 py-3 hover:bg-neutral-700 transition"
          >
            Instagram
          </a>

          <a
            href="mailto:info@secretfinish.co"
            className="block rounded-xl bg-neutral-800 px-4 py-3 hover:bg-neutral-700 transition"
          >
            Email Us
          </a>
        </div>

        <p className="text-xs text-neutral-500 pt-4">
          © {new Date().getFullYear()} Secret Finish
        </p>
      </div>
    </main>
  );
}
