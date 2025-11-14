"use client";
import Link from "next/link";
export default function AboutPage() {
return (
<main className="min-h-screen bg-gray-50 p-8 flex flex-col gap-12">
{/* Company Story Section */}
<section className="max-w-4xl mx-auto text-center">
<h1 className="text-4xl font-bold mb-4">Our Story</h1>
<p className="text-lg leading-relaxed text-gray-700">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae
nisl a elit dictum ultricies. Praesent non gravida urna. Aliquam eu
interdum justo. Sed vel sem sed arcu fermentum consequat. In hac
habitasse platea dictumst. Nulla facilisi. Maecenas dapibus quis nisl
eget blandit. Donec varius eu erat vitae tincidunt.
</p>
</section>


{/* Meet the Team Section */}
<section className="max-w-5xl mx-auto text-center">
<h2 className="text-3xl font-bold mb-8">Meet the Team</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
{/* Team Member Card */}
<div className="bg-white shadow-md rounded-2xl p-6 text-center">
<div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
<h3 className="text-xl font-semibold">John Doe</h3>
<p className="text-gray-600">Founder & CEO</p>
<p className="text-gray-700 mt-2">
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</p>
</div>


<div className="bg-white shadow-md rounded-2xl p-6 text-center">
<div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
<h3 className="text-xl font-semibold">Jane Smith</h3>
<p className="text-gray-600">Lead Developer</p>
<p className="text-gray-700 mt-2">
Integer vitae justo eget magna fermentum iaculis.
</p>
</div>


<div className="bg-white shadow-md rounded-2xl p-6 text-center">
<div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
<h3 className="text-xl font-semibold">Sarah Lee</h3>
<p className="text-gray-600">Design Director</p>
<p className="text-gray-700 mt-2">
Vivamus blandit dolor sit amet neque suscipit, non consequat nunc luctus.
</p>
</div>
</div>
</section>
      <footer className="text-center py-6 bg-blue-600 text-white">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        <Link href="/" className="block text-blue-200 hover:text-white mt-2">
          ← Back to Home
        </Link>
      </footer>
</main>
);
}