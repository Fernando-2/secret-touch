"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [index, setIndex] = useState(0);

  const services = [
    {
      title: "Web Development",
      desc: "Responsive, scalable websites built with modern tech.",
      img: "https://via.placeholder.com/600x400?text=Web+Development",
    },
    {
      title: "UI/UX Design",
      desc: "Crafting intuitive and beautiful user experiences.",
      img: "https://via.placeholder.com/600x400?text=UI+UX+Design",
    },
    {
      title: "SEO Optimization",
      desc: "Boost your visibility and reach more customers online.",
      img: "https://via.placeholder.com/600x400?text=SEO+Optimization",
    },
  ];

  const nextService = () => setIndex((i) => (i + 1) % services.length);
  const prevService = () =>
    setIndex((i) => (i - 1 + services.length) % services.length);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-blue-600 to-blue-500 text-white">
        <h1 className="text-5xl font-bold mb-4">Your Company Name</h1>
        <p className="text-lg mb-8 max-w-xl">
          Delivering top-notch web solutions and creative digital services to help your business grow.
        </p>
        <Link
          href="/booking"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        >
          Book a Service
        </Link>
      </section>

      {/* Services Carousel */}
      <section id="services" className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>

        <div className="relative max-w-3xl mx-auto overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <img
                src={services[index].img}
                alt={services[index].title}
                className="mx-auto rounded-2xl shadow-lg w-full h-64 object-cover"
              />
              <h3 className="text-2xl font-semibold mt-6">
                {services[index].title}
              </h3>
              <p className="text-gray-600 mt-2">{services[index].desc}</p>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={prevService}
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
            >
              ◀ Prev
            </button>
            <div className="flex space-x-2">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-3 h-3 rounded-full ${
                    i === index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextService}
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
            >
              Next ▶
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-blue-600 text-white">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </footer>
    </main>
  );
}
