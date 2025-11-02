"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Floater from "./Floater";
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

      {/* Reservation Section */}
      <div className="p-4 sm:p-8 max-w-7xl mx-auto bg-[#070707] rounded-2xl mt-10">
        <div className="flex flex-col md:flex-row items-center shadow-md rounded-2xl p-6 md:p-8 gap-6">
          <Image
            src="/imgs/about-banner.jpg"
            alt="Reservation section"
            width={500}
            height={300}
            className="w-full md:w-1/2 h-auto object-cover rounded-md"
          />

          <motion.div
            className="flex flex-col md:ml-6 w-full md:w-1/2"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ ease: "easeInOut", duration: 0.8 }}
          >
            <span className="text-2xl sm:text-3xl font-bold mb-2">Reservation</span>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Our Reservation Books</h2>
            <p className="text-gray-400 text-sm sm:text-base mb-4">
              Book a plan that fits your needs. Enjoy perks and free one-offs available in selected tiers.
            </p>
            <span className="rounded-md p-2 px-6 bg-white text-black text-center w-fit cursor-pointer hover:bg-amber-500 transition">
              Continue
            </span>
          </motion.div>
        </div>

        <Reservation />
      </div>

      {/* Events Header */}
      <div className="flex flex-col justify-center items-center p-4 text-center mt-16">
        <span className="text-amber-600 text-xs sm:text-sm uppercase font-mono">Why follow us</span>
        <span className="text-amber-500 text-3xl sm:text-4xl font-serif mt-4">Our Events</span>
      </div>

      {/* Event Cards */}
      <div className="flex flex-wrap justify-center items-center gap-6 p-6 sm:p-8">
        {[
          { img: "event-1.jpg", title: "Food Flavour", text: "Flavour so good you’ll eat with your eyes" },
          { img: "event-2.jpg", title: "Healthy Food", text: "Healthy bites that taste divine" },
          { img: "event-3.jpg", title: "Hygienic", text: "Book a plan that fits your lifestyle" },
        ].map((event, i) => (
          <div key={i} className="relative w-full sm:w-[80%] md:w-[30%] bg-[#080808] rounded-md overflow-hidden shadow-lg">
            <Image
              src={`/imgs/${event.img}`}
              alt={event.title}
              width={400}
              height={250}
              className="w-full h-auto object-cover"
            />
            <span className="absolute top-3 left-3 bg-amber-700 text-xs p-1 px-2 rounded-sm">
              Time: 2/10/2026
            </span>
            <motion.div
              className="absolute bottom-4 left-0 right-0 text-center"
              animate={{ x: [-5, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <h1 className="uppercase text-sm sm:text-base text-amber-400">{event.title}</h1>
              <p className="text-xs sm:text-sm text-gray-200 mt-1">{event.text}</p>
            </motion.div>
          </div>
        ))}
      </div>

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
