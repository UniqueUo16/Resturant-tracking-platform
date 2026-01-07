"use client";

import { SendIcon, Network, LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Reservation() {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reserve`);
        if (!res.ok) throw new Error("Failed to fetch service data");
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
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="flex flex-col items-center justify-center mt-10"
      >
        <LoaderCircle className="text-amber-400 animate-spin" size={60} />
        <p className="mt-4 text-lg font-medium text-gray-300">
          Loading Reservation...
        </p>
      </motion.div>
    );
  }

  if (!data)
    return (
      <p className="text-gray-300 text-center py-10">No data available.</p>
    );

  return (
    <div className="max-w-6xl mx-auto  sm:px-10 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start bg-gradient-to-b from-[#0a0a0a] to-[#161616] rounded-3xl  sm:p-10 shadow-2xl ">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center text-center md:text-left"
        >
          <h2 className="text-3xl sm:text-4xl font-serif text-amber-400 mb-3">
            {data.header}
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            {data.text1}
            <br />
            <br />
            {data.text2}
            <br />
            <br />
            {data.text3}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mx-auto md:mx-0 px-6 py-3 bg-amber-500 text-black rounded-full font-semibold shadow-md hover:bg-amber-400 transition"
          >
            Navigate Our Menu
          </motion.button>
        </motion.div>

        {/* RIGHT SIDE (FORM) */}
          <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-lg mx-auto bg-black/70 backdrop-blur-xl rounded-2xl shadow-lg p-6 flex flex-col gap-5 mt-10"
    >
      <h2 className="text-2xl font-semibold text-amber-400 mb-4">
        Reserve a Table
      </h2>

      <input
        type="text"
        placeholder="Full Name"
        className="p-3 rounded-lg bg-[#1e1e1e] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />

      <input
        type="tel"
        placeholder="Phone Number"
        className="p-3 rounded-lg bg-[#1e1e1e] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />

      <div className="flex gap-3">
        <input
          type="date"
          className="flex-1 p-3 rounded-lg bg-[#1e1e1e] text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <input
          type="time"
          className="flex-1 p-3 rounded-lg bg-[#1e1e1e] text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <input
        type="number"
        placeholder="Number of Guests"
        min={1}
        className="p-3 rounded-lg bg-[#1e1e1e] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />

      <textarea
        placeholder="Special Requests / Message (optional)"
        rows={3}
        className="p-3 rounded-lg bg-[#1e1e1e] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
      ></textarea>

      <div className="flex gap-3 mt-4">
        <button
          type="reset"
          className="flex-1 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition"
        >
          Reset
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="flex-1 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition"
        >
          Reserve
        </motion.button>
      </div>
    </motion.form>
      </div>
    </div>
  );
}
