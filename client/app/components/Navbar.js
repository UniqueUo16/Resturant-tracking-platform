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
  subsets:["latin"],weight:["300", "600"]
})

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: <Utensils size={18} />, link: "/" },
    { name: "Menu", icon: <Star size={18} />, link: "/Ex/Menu" },
    { name: "Reservations", icon: <CalendarDays size={18} />, link: "Ex/Reservations" },
    { name: "About", icon: <Info size={18} />, link: "Ex/About" },
    { name: "Contact", icon: <Phone size={18} />, link: "Ex/Contact" },
  ];

  return (
    <header className={`${font.className} absolute top-0 left-0 w-full z-50 bg-[orange] stick`}>
      {/* Top bar */}
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="text-yellow-300 text-2xl font-mono"> 🧩 logo</Link>

        <input className="p-2 rounded-full border border-white text-black bg-white" placeholder="I'm thinking of 🧩"></input>

        {/* Hamburger (mobile only) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-base font-semibold text-white">
          <Link href="/" className="hover:text-yellow-300">
            HomePage
          </Link>
          <Link href="/Ex/Menu" className="hover:text-yellow-300">
            Buy a Food
          </Link>
          <Link href="/Ex/Transactions" className="hover:text-yellow-300">
            Transactions
          </Link>
          <Link href="/Ex/About" className="hover:text-yellow-300">
            About Us
          </Link>
          <Link href="/Ex/Contact" className="hover:text-yellow-300">
            Contact
          </Link>
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
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed top-0 left-0 w-4/5 sm:w-1/2 h-screen bg-[#0c0b09] text-gray-300 z-50 p-8 shadow-lg flex flex-col justify-between overflow-y-auto"
          >
            {/* Header */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-serif text-amber-500">Unique Uo</span>
        
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-5">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.link}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="flex items-center gap-3 text-sm uppercase tracking-wider font-medium hover:text-amber-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-amber-600">{item.icon}</span>
                    {item.name}
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Footer Section */}
            <div className="pt-6 border-t border-gray-700 mt-8">
              <div className="mb-6">
                <p className="text-sm italic text-gray-400 leading-relaxed">
                  “Cooking is like love — it should be entered into with abandon, or not at all.”
                </p>
                <span className="text-xs text-amber-600 mt-2 block font-serif">
                  — Chef Dominique L’Uo
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="p-4 bg-[#111111] border border-gray-800 rounded-2xl mb-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">Today’s Special</span>
                  <Clock size={16} className="text-amber-500" />
                </div>
                <span className="text-amber-400 font-serif text-[0.9rem]">
                  Truffle Butter Filet Mignon
                </span>
                <p className="text-[0.75rem] text-gray-400">
                  Aged beef, black truffle glaze, thyme-butter reduction.
                </p>
              </motion.div>

              {/* Social Links */}
              <div className="flex justify-center space-x-4 mb-6">
                {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ scale: 1.2, y: -3 }}
                    className="w-8 h-8 flex justify-center items-center rounded-full bg-[#1a1a1a] text-gray-400 hover:bg-amber-500 hover:text-black transition-all"
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href="/Ex/Reservations"
                whileHover={{ scale: 1.05 }}
                className="block text-center py-3 rounded-full bg-amber-600 text-black font-semibold uppercase tracking-widest hover:bg-amber-500 transition-all"
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
