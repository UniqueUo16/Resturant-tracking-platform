"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Utensils,
  CalendarDays,
  Info,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  Star,
  Clock,
} from "lucide-react";
import { Montserrat } from "next/font/google";

const font = Montserrat({
  subsets: ["latin"],
  weight: ["300", "600"],
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: <Utensils size={16} />, link: "/" },
    { name: "Menu", icon: <Star size={16} />, link: "/Ex/Menu" },
    { name: "Reservations", icon: <CalendarDays size={16} />, link: "/Ex/Reservations" },
    { name: "About", icon: <Info size={16} />, link: "/Ex/About" },
    { name: "Contact", icon: <Phone size={16} />, link: "/Ex/Contact" },
  ];

  return (
    <header
      className={`${font.className} fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[orange] `}
    >
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-amber-100 font-bold text-xl sm:text-2xl tracking-wide flex items-center gap-2"
        >
          🧩 <span className="font-serif">L’Uo Dine</span>
        </Link>

        {/* Search */}
        <input
          className="hidden sm:block px-4 py-2 rounded-full border border-gray-700 text-sm text-gray-900 placeholder-gray-500 bg-white/80 focus:ring-2 focus:ring-amber-400 outline-none w-48 md:w-60"
          placeholder="Search dishes..."
        />

        {/* Hamburger (mobile only) */}
        <button
          className="md:hidden text-amber-100 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <motion.svg
            key={isOpen ? "close" : "open"}
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </motion.svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-semibold text-gray-200 tracking-wider">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="flex items-center gap-2 hover:text-amber-400 transition-all duration-200"
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="mobile-menu"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
            className="fixed top-0 left-0 w-[80%] sm:w-[60%] h-screen bg-gradient-to-b from-black via-[#111] to-[#1a1a1a] text-gray-200 z-50 p-8 flex flex-col justify-between shadow-[0_0_30px_rgba(255,193,7,0.2)]"
          >
            {/* Header */}
            <div>
              <div className="flex justify-between items-center mb-10">
                <span className="text-2xl font-serif text-amber-500">L’Uo Dine</span>
                <button
                  className="text-gray-400 hover:text-amber-500 transition"
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col space-y-5">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.link}
                    whileHover={{ x: 8 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="flex items-center gap-3 text-base uppercase font-medium hover:text-amber-400 tracking-wide"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-amber-600">{item.icon}</span>
                    {item.name}
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-gray-700 mt-8">
              <p className="text-sm italic text-gray-400 mb-4">
                “Cooking is an art — dine like royalty.”
              </p>
              <span className="text-xs text-amber-500 font-serif mb-6 block">
                — Chef L’Uo Signature
              </span>

              {/* Daily Special */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-[#0d0d0d] border border-amber-500/20 rounded-2xl p-4 mb-6 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">Today’s Special</span>
                  <Clock size={15} className="text-amber-400" />
                </div>
                <span className="text-amber-400 font-serif text-sm">
                  Truffle Butter Filet Mignon
                </span>
                <p className="text-xs text-gray-400">
                  Aged beef with black truffle glaze and thyme reduction.
                </p>
              </motion.div>

              {/* Social Icons */}
              <div className="flex justify-center space-x-4 mb-6">
                {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ scale: 1.2, y: -3 }}
                    className="w-9 h-9 flex justify-center items-center rounded-full bg-[#1a1a1a] text-gray-400 hover:bg-amber-500 hover:text-black transition-all"
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href="/Ex/Reservations"
                whileHover={{ scale: 1.03 }}
                className="block text-center py-3 rounded-full bg-amber-500 text-black font-bold uppercase tracking-widest hover:bg-amber-400 transition-all shadow-md"
              >
                Reserve a Table
              </motion.a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}
