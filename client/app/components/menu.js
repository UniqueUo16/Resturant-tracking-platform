"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Baloo_Bhaijaan_2 } from "next/font/google";

const baloo2 = Baloo_Bhaijaan_2({
  subsets:["latin"],
  weight:["400", "500", "700"]
})

const jk = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight:["400", "600", "700"]
})

export default function Menu() {
  const [menujs, setMenujsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenujs() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menujs`);
        if (!res.ok) throw new Error("Failed To Fetch Menu");
        const data = await res.json();
        setMenujsData(data);
      } catch (err) {
        console.error("Error fetching menu:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMenujs();
  }, []);

  if (loading) return <p className="text-center text-white">Loading menu...</p>;

  const item1 = menujs[0];
  const item2 = menujs[1];
  const item3 = menujs[2];
  const item4 = menujs[3];
  const item5 = menujs[4];
  const item6 = menujs[5];

  return (
    <div className="menu-bg bg-contain bg-center text-white px-4 sm:px-0">
      {/* Divider */}
      <div className="flex justify-center pb-6">
        <Image
          src="/imgs/separator.svg"
          alt="storyimg"
          height={400}
          width={600}
          className="w-full md:w-1/2 h-auto"
        />
      </div>

      {/* Title */}
      <h2 className={`${baloo2.className} sm:text-3xl  text-4xl  flex justify-center mb-6`}>
        Our Delicious Menu
      </h2>

      {/* MAIN FLEX WRAPPER */}
      <Link href="/Ex/Menu">
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {/* LEFT COLUMN */}
          <div className="flex-1 flex flex-col">
            {/* ITEM 1 */}
            {item1 && (
              <div className="m-4 sm:ml-[5rem] flex flex-col sm:flex-row items-start gap-4 text-[0.9rem]">
                <Image
                  src={item1.img}
                  alt={item1.name}
                  height={100}
                  width={100}
                  className="w-full sm:w-auto h-auto object-cover rounded-xl"
                />
                <div className={`${baloo2.className} flex flex-col sm:flex-row sm:items-center gap-2 w-full`}>
                  <span>{item1.name}</span>
                  <span className="ml-0 sm:ml-2 mt-1 sm:mt-0 p-1 text-black bg-orange-500 rounded-full">
                    {item1.category}
                  </span>
                  <span className="py-[0.2rem] mt-1 sm:mt-0">${item1.price.toFixed(2)}</span>
                  <p className="text-[0.84rem] font-sans mt-2 sm:mt-0">
                    {item1.description}
                  </p>
                </div>
              </div>
            )}

            {/* ITEM 2 */}
            {item2 && (
              <motion.div
                className="m-4 sm:ml-[5rem] flex flex-col sm:flex-row items-start gap-4 text-[0.9rem]"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={item2.img}
                  alt={item2.name}
                  height={100}
                  width={100}
                  className="w-full sm:w-auto h-auto object-cover rounded-xl"
                />
                <div className={`${baloo2.className} flex flex-col sm:flex-row sm:items-center gap-2 w-full`}>
                  <span>{item2.name}</span>
                  <span className="ml-0 sm:ml-2 mt-1 sm:mt-0 p-1 text-black bg-orange-500 rounded-full">
                    {item2.category}
                  </span>
                  <span className="py-[0.2rem] mt-1 sm:mt-0">${item2.price.toFixed(2)}</span>
                  <p className="text-[0.84rem] font-sans mt-2 sm:mt-0">
                    {item2.description}
                  </p>
                </div>
              </motion.div>
            )}

            {/* ITEM 3 */}
            {item3 && (
              <div className={`${baloo2.className} m-4 sm:ml-[5rem] flex flex-col sm:flex-row items-start gap-4 text-[0.9rem]`}>
                <Image
                  src={item3.img}
                  alt={item3.name}
                  height={100}
                  width={100}
                  className="w-full sm:w-auto h-auto object-cover rounded-xl"
                />
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                  <span>{item3.name}</span>
                  <span className="ml-0 sm:ml-2 mt-1 sm:mt-0 p-1 text-black bg-orange-500 rounded-full">
                    {item3.category}
                  </span>
                  <span className="py-[0.2rem] mt-1 sm:mt-0">${item3.price.toFixed(2)}</span>
                  <p className="text-[0.84rem] font-sans mt-2 sm:mt-0">
                    {item3.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* MIDDLE DIVIDER */}
          <div className="hidden sm:block border-r border-white h-auto sm:h-[70vh] mx-8"></div>

          {/* RIGHT COLUMN */}
          <div className={`${baloo2.className} flex-1 flex flex-col`}>
            {/* ITEM 4 */}
            {item4 && (
              <motion.div
                className="m-4 sm:ml-[5rem] flex flex-col sm:flex-row items-start gap-4 text-[0.9rem]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={item4.img}
                  alt={item4.name}
                  height={100}
                  width={100}
                  className="w-full sm:w-auto h-auto object-cover rounded-xl"
                />
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                  <span>{item4.name}</span>
                  <span className="ml-0 sm:ml-2 mt-1 sm:mt-0 p-1 text-black bg-orange-500 rounded-full">
                    {item4.category}
                  </span>
                  <span className="py-[0.2rem] mt-1 sm:mt-0">${item4.price.toFixed(2)}</span>
                  <p className="text-[0.84rem] font-sans mt-2 sm:mt-0">
                    {item4.description}
                  </p>
                </div>
              </motion.div>
            )}

            {/* ITEM 5 */}
            {item5 && (
              <div className={`${baloo2.className} m-4 sm:ml-[5rem] flex flex-col sm:flex-row items-start gap-4 text-[0.9rem]`}>
                <Image
                  src={item5.img}
                  alt={item5.name}
                  height={100}
                  width={100}
                  className="w-full sm:w-auto h-auto object-cover rounded-xl"
                />
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                  <span>{item5.name}</span>
                  <span className="ml-0 sm:ml-2 mt-1 sm:mt-0 p-1 text-black bg-orange-500 rounded-full">
                    {item5.category}
                  </span>
                  <span className="py-[0.2rem] mt-1 sm:mt-0">${item5.price.toFixed(2)}</span>
                  <p className="text-[0.84rem] font-sans mt-2 sm:mt-0">
                    {item5.description}
                  </p>
                </div>
              </div>
            )}

            {/* ITEM 6 */}
            {item6 && (
              <motion.div
                className={`${baloo2.className} m-4  sm:ml-[5rem] flex flex-col sm:flex-row items-center gap-4 text-[0.9rem]
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 3, repeat: Infinity }} `}
              >
                <Image
                  src={item6.img}
                  alt={item6.name}
                  height={100}
                  width={100}
                  className="w-70 h-auto  rounded-xl"
                />
                <div className={`${baloo2.className} flex flex-col sm:flex-row sm:items-center gap-2 w-full`}>
                  <span>{item6.name}</span>
                  <span className="ml-0 sm:ml-2 mt-1 sm:mt-0 p-1 text-black bg-orange-500 rounded-full">
                    {item6.category}
                  </span>
                  <span className="py-[0.2rem] mt-1 sm:mt-0">${item6.price.toFixed(2)}</span>
                  <p className="text-[0.84rem] font-sans mt-2 sm:mt-0">
                    {item6.description}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </Link>

      <div className="flex justify-center mt-10 px-4 sm:px-0">
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
