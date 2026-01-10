// page.js
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import End from "./components/Ending";
import HeroCarousel from "./components/HeroCarousel";
import Newsletter from "./components/Service";
import Sidebar from "./components/Sidebar";
import Story from './components/Story';
import Menu from "./components/menu";
import Image from "next/image";

const montrasset = Montserrat({
  subsets:["latin"],
  weight:["300", "500", "700"]
})

export default function Home() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Preloader visible for 1.5 seconds
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="sm:w-[300px] sticky sm:block ">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full">



    <>
     {/* Full-page Preloader */}
{loading && (
  <motion.div
    className={`${montrasset.className} fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0b0b]`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {/* Logo / Loader */}
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex items-center justify-center"
    >
      {/* Gold ring */}
      <motion.div
        className="absolute w-28 h-28 rounded-full border border-amber-500/40"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      />

      {/* Inner pulse */}
      <motion.div
        className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 shadow-[0_0_40px_rgba(255,193,7,0.35)]"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      />
    </motion.div>

    {/* Text */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-10 text-center"
    >
      <p className="text-sm tracking-widest text-gray-400 uppercase">
        Preparing your experience
      </p>
      <p className="mt-2 text-lg sm:text-xl font-serif text-amber-400">
        Please take a seat 🍷
      </p>
    </motion.div>
  </motion.div>
)}


      {/* Main content */}
      <div className={`${loading ? "hidden" : "block"}`}>
        <HeroCarousel />
      </div>
    </>

        <Newsletter />
        <Story/>
        <Menu/>
        <End/>
      </main>
    </div>
  );
}
