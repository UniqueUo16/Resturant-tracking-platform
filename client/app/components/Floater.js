"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Airplay, Globe } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Pricing() {
  const [form, setForm] = useState({ name: "", email: "", date: "", slot: "" });
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false); // toggle form visibility
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert("Booking Submitted redirecting...", form);
    setTimeout(() => {
      router.push("/Ex_pages/Booking")
    }, 1000);
  };

  const shippingOptions = [
    { title: "Standard", icon: <Truck size={24} />, time: "3–5 business days", price: "Free" },
    { title: "Express", icon: <Airplay size={24} />, time: "1–2 business days", price: "$12.99" },
    { title: "International", icon: <Globe size={24} />, time: "5–10 business days", price: "From $19.99" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto bg-black sm:bg-amber-50 relative">
      {/* Hero, Pricing Cards, Shipping Sections here... */}

      {/* Floating Circular Booking Button / Form */}
      <div className="fixed bottom-8 right-8 z-50">
        {open ? (
          <div className="w-80 bg-white text-black p-4 rounded-2xl shadow-lg relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-3 -right-3 bg-amber-600  rounded-full w-6 h-6 flex items-center justify-center hover:bg-amber-700 transition"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-3 text-center">Fill The field to Book a slot <br /><span className="text-[0.8rem]">You would be redirected to <br /> the Booking form</span></h3>
            {submitted ? (
              <p className="text-green-600 text-center font-semibold">✅ Booking Confirmed!</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
                <select
                  name="slot"
                  value={form.slot}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                >
                  <option value="">Select Service Type</option>
                  <option value="Standard">📦 Standard (3-5 days)</option>
                  <option value="Express">⚡ Express (1-2 days)</option>
                  <option value="Same-Day"> Same-Day Delivery</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-amber-600 text-white font-semibold py-2 rounded-xl hover:bg-amber-700 transition"
                >
                  Book Now
                </button>
              </form>
            )}
          </div>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="w-14 h-14 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-lg hover:bg-amber-700 transition"
          >
            📅
          </button>
        )}
      </div>
    </div>
  );
}
