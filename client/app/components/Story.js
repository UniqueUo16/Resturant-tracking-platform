"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

export default function Story() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/story`);
        if (!res.ok) throw new Error("Failed to fetch story data");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <motion.div
        animate={{ y: [0, -19, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="flex flex-col items-center justify-center mt-20"
      >
        <LoaderCircle className="text-[#ecd71c] animate-spin" size={60} />
        <p className="mt-4 text-lg font-medium text-gray-300">
          Loading Section...
        </p>
      </motion.div>
    );
  }

  if (!data) return <p className="text-white text-center py-10">No data found</p>;

  return (
    <div className="story-bg text-white px-4 py-12 sm:px-8 lg:px-20">
      {/* Decorative Separator */}
      <div className="flex justify-center items-center pb-10">
        <Image
          src="/imgs/separator.svg"
          alt="Separator"
          height={400}
          width={600}
          className="w-2/3 sm:w-1/2 h-auto"
        />
      </div>

      {/* SECTION 1 */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-16 relative">
        <div className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 flex flex-col items-center md:static md:translate-x-0">
          <Image
            src="/imgs/badge-1.png"
            alt="Badge"
            width={80}
            height={80}
            className="animate-pulse"
          />
          <h1 className="mt-1 text-xs uppercase text-orange-400 tracking-widest">
            Our Story
          </h1>
        </div>

        <Image
          src="/imgs/about-banner.jpg"
          alt="About Banner"
          height={400}
          width={600}
          className="rounded-lg w-full md:w-1/2 h-auto shadow-lg"
        />

        <p className="text-center md:text-left md:w-1/2 text-sm sm:text-base leading-relaxed font-sans mt-6 md:mt-0">
          {data.storytxt1}
        </p>
      </div>

      {/* SECTION 2 */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-10">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <h1 className="text-xs uppercase font-mono text-orange-400 mb-3 tracking-widest">
            Beavers
          </h1>
          <Image
            src="/imgs/testimonial-bg.jpg"
            alt="Testimonial Background"
            height={400}
            width={600}
            className="rounded-lg w-full md:w-1/2 h-auto shadow-md"
          />
        </div>

        <p className="text-center md:text-left md:w-1/2 text-sm sm:text-base leading-relaxed font-sans">
          {data.storytxt2}
        </p>
      </div>
    </div>
  );
}
