"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/imgs/hero-slider-1.jpg",
    title: "Welcome to Our Website",
    description: "Discover amazing things with us — from dishes to delightful services.",
  },
  {
    id: 2,
    image: "/imgs/hero-slider-2.jpg",
    title: "Our Services",
    description: "We offer top-notch solutions tailored to your taste.",
  },
  {
    id: 3,
    image: "/imgs/hero-slider-3.jpg",
    title: "Get Started Today",
    description: "Join us and enjoy a fine dining experience.",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrent(index);

  return (
    <section className="relative w-full h-[80vh] sm:h-[90vh] overflow-hidden rounded-b-[4rem] sm:rounded-l-[11rem]">
      <AnimatePresence>
        {slides.map(
          (slide, index) =>
            index === current && (
              <motion.div
                key={slide.id}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-6">
                  <motion.h2
                    className="text-3xl sm:text-6xl font-serif mb-3"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {slide.title}
                  </motion.h2>

                  <motion.p
                    className="text-base sm:text-lg max-w-[600px]"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {slide.description}
                  </motion.p>

                  <motion.a
                    href="/Ex/Reservation#book"
                    whileHover={{ scale: 1.05 }}
                    className="mt-6 px-6 py-3 border border-white rounded-full text-sm sm:text-base uppercase tracking-wide bg-white/10 hover:bg-white/20 transition"
                  >
                    Book a Table
                  </motion.a>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Floating review bubbles (small screens optimized) */}
      <div className="absolute bottom-24 left-4 sm:left-[8rem] space-y-3 sm:space-y-6">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <button className="flex items-center gap-3 text-[0.8rem] sm:text-base bg-orange-500 text-white py-2 px-4 rounded-full shadow-lg">
            <Image
              src="/imgs/features-icon-1.png"
              alt="reviewer"
              width={35}
              height={35}
              className="rounded-full bg-black"
            />
            “I love their spicy dishes!”
          </button>
        </motion.div>

        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <button className="flex items-center gap-3 text-[0.8rem] sm:text-base bg-black text-white py-2 px-4 rounded-full border border-orange-400">
            <span>Top service — 10/10! 😋</span>
            <Image
              src="/imgs/badge-2.png"
              alt="badge"
              width={45}
              height={45}
              className="rounded-full p-1"
            />
          </button>
        </motion.div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full border border-white transition ${
              index === current ? "bg-white" : "bg-transparent"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
