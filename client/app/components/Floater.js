"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Airplay, Globe, X, MonitorPause } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const Mon = Montserrat({
  subsets:["latin"], weight:["300", "500", "700"]
})

export default function Pricing() {
  const [form, setForm] = useState({ name: "", email: "", date: "", slot: "" });
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false); // 👈 toggle bottom drawer
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert("Booking submitted — redirecting...");
    setTimeout(() => {
      router.push("/Ex_pages/Booking");
    }, 1000);
  };

  const shippingOptions = [
    { title: "Standard", icon: <Truck size={24} />, time: "3–5 business days", price: "Free" },
    { title: "Express", icon: <Airplay size={24} />, time: "1–2 business days", price: "$12.99" },
    { title: "International", icon: <Globe size={24} />, time: "5–10 business days", price: "From $19.99" },
  ];

  return (
    <div className={`${Mon.className} p-8 max-w-6xl mx-auto bg-[orange] text-white relative min-h-screen`}>
      {/* ✅ Your pricing/hero/shipping sections would go here */}
     

      {/* 🟨 Fixed Proceed Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-gray-800 px-6 py-4 flex justify-between items-center z-40">
        <p className="text-gray-300 text-sm">
          Ready to proceed with your order?
        </p>
        <button
          onClick={() => setOpen(true)}
          className="bg-amber-500 text-black font-semibold px-5 py-2 rounded-lg hover:bg-amber-400 transition"
        >
          Proceed to Checkout
        </button>
      </div>

      {/* 🧾 Bottom Slide-Up Checkout Form */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-white text-black w-full sm:w-[500px] rounded-t-3xl p-6 shadow-2xl"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-amber-600">
                  Checkout Form
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-500 hover:text-amber-500 transition"
                >
                  <X size={22} />
                </button>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <p className="text-green-600 font-semibold">
                    ✅ Booking Confirmed!
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Redirecting to Booking Page...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  <select
                    name="slot"
                    value={form.slot}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  >
                    <option value="">Select Service Type</option>
                    <option value="Standard">📦 Book Food (3–5 days)</option>
                    <option value="Express">Book Table (1–2 days)</option>
                    <option value="Same-Day">Buy Food Delivery</option>
                  </select>
                  <Link href="/Ex/Checkpage"
                    className="w-full bg-amber-600 text-white font-semibold py-2 rounded-md hover:bg-amber-700 transition"
                  >
                    Confirm & Continue
                  </Link>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
