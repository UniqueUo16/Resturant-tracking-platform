"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Reservation() {
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    FullName: "",
    Email: "",
    Phone: "",
    Date: "",
    Time: "",
    Guests: 1,
    SpecialRequests: ""
  });

  const handleReserve = async () => {
    if (!form.FullName.trim() || !form.Email.trim()) {
      alert("Please provide your name and email.");
      return;
    }

    setSubmitting(true);
try {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reserve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => null);
    throw new Error(errData?.message || "Reservation failed");
  }

  alert("Reservation sent successfully!");
  setForm({
    FullName: "",
    Email: "",
    Phone: "",
    Date: "",
    Time: "",
    Guests: 1,
    SpecialRequests: "",
  });
} catch (err) {   // <-- remove ": any"
  console.error(err);
  alert(err.message || "Something went wrong");
} finally {
  setSubmitting(false);
}


  return (
    <div className="full-reserve bg-center bg-contain min-h-screen flex flex-col">
      <div className="px-4 sm:px-8 lg:px-16 py-12 max-w-7xl mx-auto bg-black/50 rounded-lg">
        <span className="font-mono text-sm sm:text-base" style={{ fontVariant: "small-caps" }}>
          Full Reservation Page
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-start mt-12">
          {/* Left Content */}
          <div className="flex flex-col justify-center text-center lg:text-left space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Reserve Your Seat at the Table
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Step into an atmosphere where flavor, craft, and elegance meet.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Each reservation is carefully curated.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Our kitchen operates with precision and passion.
            </p>

            <button className="mt-4 sm:mt-6 px-6 py-3 bg-white text-black shadow-md hover:bg-gray-100 rounded-sm w-full lg:w-auto">
              Navigate Our Menu
            </button>
          </div>

          {/* Reservation Form */}
          <section className="w-full max-w-lg sm:max-w-xl mx-auto lg:mx-0 bg-[#0b0b0b] border border-amber-500/20 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
            <header className="mb-4 sm:mb-6 text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl lg:text-2xl font-serif text-amber-400">Reserve a Table</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Select your preferred date and time.
              </p>
            </header>

            {/* Reservation Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div>
                <label className="text-xs text-gray-400">Date</label>
                <input
                  type="date"
                  value={form.Date}
                  onChange={e => setForm({ ...form, Date: e.target.value })}
                  className="input mt-1 w-full"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400">Time</label>
                <input
                  type="time"
                  value={form.Time}
                  onChange={e => setForm({ ...form, Time: e.target.value })}
                  className="input mt-1 w-full"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400">Guests</label>
                <select
                  className="input mt-1 w-full"
                  value={form.Guests}
                  onChange={e => setForm({ ...form, Guests: parseInt(e.target.value) })}
                >
                  {[1,2,3,4,5,6,7,8].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guest Info */}
            <div className="space-y-3 sm:space-y-4">
              <input
                type="text"
                value={form.FullName}
                onChange={e => setForm({ ...form, FullName: e.target.value })}
                placeholder="Full Name"
                className="input w-full"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={form.Phone}
                onChange={e => setForm({ ...form, Phone: e.target.value })}
                className="input w-full"
              />

              <input
                type="email"
                placeholder="Email"
                value={form.Email}
                onChange={e => setForm({ ...form, Email: e.target.value })}
                className="input w-full"
                required
              />

              <textarea
                placeholder="Special requests"
                value={form.SpecialRequests}
                onChange={e => setForm({ ...form, SpecialRequests: e.target.value })}
                rows={3}
                className="input resize-none w-full"
              />
            </div>

            {/* CTA */}
            <motion.button
              disabled={submitting}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleReserve}
              className="mt-4 sm:mt-6 w-full rounded-full bg-amber-500 py-3 text-black font-semibold tracking-wide hover:bg-amber-400 transition"
            >
              {submitting ? "Sending..." : "Confirm Reservation"}
            </motion.button>

            <p className="text-xs sm:text-sm text-gray-500 text-center mt-3 sm:mt-4">
              We’ll contact you shortly to confirm availability.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}}
