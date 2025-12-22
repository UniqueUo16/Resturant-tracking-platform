"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Baloo_Bhaijaan_2 } from "next/font/google";

const baloo2 = Baloo_Bhaijaan_2({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menujs`);
        if (!res.ok) throw new Error("Failed to fetch menu");
        const data = await res.json();
        setMenuItems(data);
      } catch (err) {
        console.error("Error fetching menu:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  if (loading)
    return <p className="text-center text-white mt-10">Loading menu...</p>;

  return (
    <div className="menu-bg bg-contain bg-center text-white px-4 sm:px-8 py-8">
      {/* Divider */}
      <div className="flex justify-center pb-6">
        <Image
          src="/imgs/separator.svg"
          alt="separator"
          height={400}
          width={600}
          className="w-full md:w-1/2 h-auto"
        />
      </div>

      {/* Title */}
      <h2 className={`${baloo2.className} text-2xl sm:text-3xl text-center mb-8`}>
        Our Delicious Menu
      </h2>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center bg-black/20 p-4 rounded-xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={item.img}
              alt={item.name}
              height={150}
              width={150}
              className="w-full h-auto object-cover rounded-xl"
            />
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full mt-2">
              <span className="font-bold">{item.name}</span>
              <span className="ml-0 sm:ml-2 mt-1 sm:mt-0 p-1 text-black bg-orange-500 rounded-full">
                {item.category}
              </span>
              <span className="py-[0.2rem] mt-1 sm:mt-0">${item.price.toFixed(2)}</span>
            </div>
            <p className="text-sm mt-2 text-center sm:text-left">{item.description}</p>
          </motion.div>
        ))}
      </div>

      {/* View Menu Button */}
      <div className="flex justify-center mt-10">
        <Link
          href="/Ex/Menu"
          className="border rounded-full border-orange-300 px-6 py-3 text-white hover:bg-orange-500"
        >
          View Our Menu
        </Link>
      </div>
    </div>
  );
}
