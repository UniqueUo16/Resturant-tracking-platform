"use client";

import { SendIcon, Network, LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Reservation() {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
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

  useEffect(() => {
    if (imageUpload) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(imageUpload);
    }
  }, [imageUpload]);

  const handleImageChange = (e) => setImageUpload(e.target.files[0]);

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
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-black/60 backdrop-blur-xl rounded-2xl shadow-lg p-1 flex flex-col"
        >
          <div className="flex justify-between items-center text-lg font-light text-gray-200 mb-6">
            <span>Book a Table</span>
            <Network className="text-amber-400 animate-spin-slow" />
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 rounded-md bg-[#1e1e1e] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="p-3 rounded-md bg-[#1e1e1e] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="p-3 rounded-md bg-[#1e1e1e] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <div className="flex gap-2">
              <input
                type="date"
                className="w-1/2 p-3 rounded-md bg-[#1e1e1e] text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="time"
                className="w-1/2 p-3 rounded-md bg-[#1e1e1e] text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Upload */}
          <div className="mt-5 flex flex-col items-center">
            <label className="cursor-pointer bg-[#252525] hover:bg-[#2e2e2e] text-amber-400 rounded-full px-6 py-3 flex items-center gap-3 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              Upload Image
            </label>

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 rounded-full mt-3 border-2 border-amber-500 object-cover"
              />
            )}
          </div>

          {/* Message */}
          <textarea
            placeholder="Additional message (optional)"
            className="mt-6 p-3 rounded-md bg-[#1e1e1e] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            rows={3}
          ></textarea>

          {/* Buttons */}
          <div className="mt-6 flex justify-between gap-3">
            <button
              type="reset"
              className="w-1/3 py-3 rounded-md bg-gray-600 text-white hover:bg-gray-500 transition"
            >
              Reset
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="flex-1 py-3 flex justify-center items-center gap-2 rounded-md bg-amber-500 text-black font-semibold hover:bg-amber-400 transition"
            >
              Send <SendIcon size={18} />
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
