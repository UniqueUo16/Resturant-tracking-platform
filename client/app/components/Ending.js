"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Floater from "./Floater";
import Link from "next/link";
import Reservation from "./reservation";

export default function End() {
  return (
    <div className="bg-black text-white">
      {/* Section Header */}
      <div className="flex flex-col justify-center items-center p-4 text-center">
        <span className="text-amber-600 text-sm sm:text-base uppercase">Why choose Us</span>
        <span className="text-amber-500 text-3xl sm:text-4xl font-serif mt-4">Our Strength</span>
      </div>

      {/* Strength Cards */}
      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 p-6 sm:p-8">
        {[
          { img: "features-icon-1.png", title: "Hygienic Food" },
          { img: "features-icon-2.png", title: "Fresh Environment" },
          { img: "features-icon-3.png", title: "Skilled Cook" },
          { img: "features-icon-4.png", title: "Events & Party" },
        ].map((item, i) => (
          <div
            key={i}
            className="w-full sm:w-[45%] md:w-[22%] p-6 flex flex-col justify-center items-center bg-[#080808] rounded-md hover:bg-[#111] transition-colors"
          >
            <Image
              src={`/imgs/${item.img}`}
              alt={item.title}
              height={100}
              width={100}
              className="rounded-md"
            />
            <h3 className="text-orange-300 mt-3 text-sm sm:text-base font-semibold" style={{ fontVariant: "small-caps" }}>
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm mt-3 text-center text-gray-300">
              Tender steak grilled to perfection <br /> with pepper sauce.
            </p>
          </div>
        ))}
      </div>


    <section className="px-4 sm:px-8 py-10 md:py-16 bg-[#050505] text-white overflow-x-hidden">
      {/* 🌟 Reservation Section */}
      <div className="max-w-6xl mx-auto bg-gradient-to-b from-[#0c0c0c] to-[#141414] rounded-3xl shadow-xl overflow-hidden backdrop-blur-lg border border-gray-800 p-4 sm:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full md:w-1/2"
          >
            <Image
              src="/imgs/about-banner.jpg"
              alt="Reservation section"
              width={500}
              height={300}
              className="rounded-2xl shadow-lg w-full h-auto object-cover"
            />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col justify-center w-full md:w-1/2 text-center md:text-left"
          >
            <span className="uppercase text-amber-500 text-sm font-semibold tracking-wider mb-2">
              Make a Reservation
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-3">
              Dine With Elegance
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mb-6 leading-relaxed">
              Choose your perfect table, and let us take care of every detail.
              Enjoy handcrafted dishes and personalized service, made for your
              special moments.
            </p>

            <motion.a
              href="/Ex/Reservations"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block bg-amber-500 text-black px-6 py-3 rounded-full font-semibold shadow-md hover:bg-amber-400 transition"
            >
              Reserve Now
            </motion.a>
          </motion.div>
        </div>

        {/* Embedded Reservation Component */}
        <div className="mt-10">
          <Reservation />
        </div>
      </div>

      {/* 🌿 Events Header */}
      <div className="flex flex-col items-center text-center mt-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-amber-600 text-xs sm:text-sm uppercase font-mono tracking-widest"
        >
          Why Follow Us
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-serif text-amber-500 mt-3"
        >
          Our Upcoming Events
        </motion.h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-md mt-3">
          Join our exclusive culinary and social events — where great taste meets
          unforgettable moments.
        </p>
      </div>

      {/* 🍽️ Event Cards */}
      <div className="mt-10 flex flex-wrap justify-center gap-8">
        {[
          {
            img: "event-1.jpg",
            title: "Food Flavour",
            text: "Flavour so good you’ll eat with your eyes",
          },
          {
            img: "event-2.jpg",
            title: "Healthy Food",
            text: "Healthy bites that taste divine",
          },
          {
            img: "event-3.jpg",
            title: "Hygienic",
            text: "Book a plan that fits your lifestyle",
          },
        ].map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="relative w-full sm:w-[85%] md:w-[30%] bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] rounded-2xl shadow-lg overflow-hidden hover:shadow-amber-600/20 transition-all duration-500 group"
          >
            {/* Event Image */}
            <Image
              src={`/imgs/${event.img}`}
              alt={event.title}
              width={400}
              height={250}
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay Badge */}
            <span className="absolute top-4 left-4 bg-amber-600/80 text-[0.7rem] uppercase font-semibold px-3 py-1 rounded-full tracking-wider">
              Feb 10, 2026
            </span>

            {/* Event Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-center">
              <motion.h3
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-lg sm:text-xl font-serif text-amber-400"
              >
                {event.title}
              </motion.h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                {event.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>


      {/* Blog Button */}
      <Link
        href="/"
        className="border border-white py-3 px-6 w-[60%] sm:w-[40%] md:w-[20%] flex justify-center items-center mx-auto uppercase font-mono mt-6 hover:bg-white hover:text-black transition"
      >
        View our blogs
      </Link>

      <Floater />
    </div>
  );
}
