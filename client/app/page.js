// page.js
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import End from "./components/Ending";
import HeroCarousel from "./components/HeroCarousel";
import Newsletter from "./components/Service";
import Sidebar from "./components/Sidebar";
import Story from './components/Story';
import Menu from "./components/menu";

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
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black">
          <motion.div
            className="w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
          <p className="mt-4 text-white text-lg sm:text-xl font-semibold">
            Loading... Oh you stayed’s 🍴
          </p>
        </div>
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
