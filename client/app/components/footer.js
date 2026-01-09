"use client";
import { Youtube, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const socials = [
    { name: "YouTube", Icon: Youtube },
    { name: "Twitter", Icon: Twitter },
    { name: "LinkedIn", Icon: Linkedin },
  ];

  return (
    <footer className="relative bg-black text-gray-300 pt-16 pb-10 px-6 overflow-hidden">
      {/* Soft background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/5 to-transparent pointer-events-none"></div>

      {/* Main container */}
      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 text-center md:text-left">
        
        {/* LEFT — Brand & Description */}
        <div className="flex-1 space-y-4">
          <h2 className="text-amber-500 text-3xl font-serif tracking-wide">
            Unique Uo’s Restaurant
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Experience world-class dining with an atmosphere that blends luxury,
            comfort, and culinary passion. Join us for unforgettable flavors and memories.
          </p>
        </div>

        {/* CENTER — Newsletter */}
        <div className="flex-1 flex flex-col items-center md:items-start space-y-4">
          <h3 className="text-lg text-white font-semibold font-serif">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-sm text-gray-400 italic">
            Be the first to know about events, seasonal menus, and exclusive offers.
          </p>
          <div className="relative w-full max-w-sm">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full py-3 px-5 rounded-full bg-transparent border border-gray-600 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
            />
            <button className="absolute right-1 top-1 bottom-1 bg-amber-500 hover:bg-amber-400 text-black px-5 rounded-full text-sm font-semibold transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* RIGHT — Links & Socials */}
        <div className="flex-1 flex flex-col md:items-end space-y-6">
          <ul className="space-y-2 text-sm uppercase tracking-wider font-medium">
            <li className="hover:text-amber-500 cursor-pointer transition">Home</li>
            <li className="hover:text-amber-500 cursor-pointer transition">Reservation</li>
            <li className="hover:text-amber-500 cursor-pointer transition">Menu</li>
            <li className="hover:text-amber-500 cursor-pointer transition">Events</li>
            <li className="hover:text-amber-500 cursor-pointer transition">About</li>
          </ul>

          <div className="flex justify-center md:justify-end gap-4 mt-4">
            {socials.map(({ name, Icon }) => (
              <span
                key={name}
                className="w-9 h-9 flex justify-center items-center rounded-full bg-[#1a1a1a] hover:bg-amber-500 hover:text-black transition transform hover:scale-105 cursor-pointer"
                title={name}
              >
                <Icon size={18} />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative mt-12 pt-6 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="text-amber-500">Unique Uo’s</span> Restaurant.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
