"use client";
import { motion } from "framer-motion";
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

export default function Sidebar() {
  const navItems = [
    { name: "Home", icon: <Utensils size={18} />, link: "/" },
    { name: "Menu", icon: <Star size={18} />, link: "/Ex/Menu" },
    { name: "Reservations", icon: <CalendarDays size={18} />, link: "/reservations" },
    { name: "About", icon: <Info size={18} />, link: "/about" },
    { name: "Contact", icon: <Phone size={18} />, link: "/contact" },
  ];

  return (
    <motion.aside
      className="hidden sm:flex sm:sticky top-0 z-50 h-screen flex-col justify-between
                 bg-[#0c0b09] border-r border-gray-800 text-gray-300
                 sm:w-[18rem] p-8 shadow-[inset_0_0_40px_rgba(255,191,0,0.1)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      initial={{ x: -120, opacity: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.8 }}
      viewport={{ amount: 0.3, once: false }}
    >

      {/* HEADER / BRAND */}
      <div className="flex flex-col items-start space-y-2">
        <h1 className="text-2xl font-serif text-amber-500 tracking-wide">Unique Uo’s</h1>
        <span className="text-xs text-gray-400 italic">Fine Dining Experience</span>
        <motion.div
          className="mt-3 h-[2px] w-[50%] bg-gradient-to-r from-amber-600 to-transparent"
          initial={{ width: 0 }}
          whileInView={{ width: "50%" }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* NAVIGATION LINKS */}
      <nav className="flex flex-col space-y-5 mt-10">
        {navItems.map((item, idx) => (
          <motion.a
            key={idx}
            href={item.link}
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex items-center gap-3 text-sm uppercase tracking-wider font-medium hover:text-amber-500 transition-colors"
          >
            <span className="text-amber-600">{item.icon}</span>
            {item.name}
          </motion.a>
        ))}
      </nav>

      {/* CHEF'S QUOTE / BRAND ESSENCE */}
      <div className="mt-12 border-t border-gray-700 pt-6">
        <p className="text-sm italic text-gray-400 leading-relaxed">
          “Cooking is like love — it should be entered into with abandon, or not at all.”
        </p>
        <span className="text-xs text-amber-600 mt-2 block font-serif">— Chef Dominique L’Uo</span>
      </div>

      {/* FEATURED SPECIAL */}
      <motion.div
        className="mt-8 p-4 bg-[#111111] border border-gray-800 rounded-2xl shadow-md flex flex-col space-y-3"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-white tracking-wide">
            Today’s Special
          </span>
          <Clock size={16} className="text-amber-500" />
        </div>
        <span className="text-amber-400 font-serif text-[0.9rem]">
          Truffle Butter Filet Mignon
        </span>
        <p className="text-[0.75rem] text-gray-400">
          Aged beef, black truffle glaze, thyme-butter reduction.
        </p>
      </motion.div>

      {/* CALL TO ACTION */}
      <motion.a
        href="/reservations"
        whileHover={{ scale: 1.05 }}
        className="mt-8 w-full text-center py-3 rounded-full bg-amber-600 text-black font-semibold uppercase tracking-widest hover:bg-amber-500 transition-all"
      >
        Reserve a Table
      </motion.a>

      {/* SOCIAL LINKS */}
      <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col items-center">
        <span className="text-xs uppercase text-gray-400 tracking-widest mb-3">
          Follow Us
        </span>
        <div className="flex space-x-4">
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
      </div>
    </motion.aside>
  );
}
