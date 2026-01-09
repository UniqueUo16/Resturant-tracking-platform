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
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center py-12 px-4 sm:px-8 md:px-16 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto bg-black/60 rounded-2xl p-6 sm:p-10 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">
          {/* Left Content */}
          <div className="flex flex-col justify-center text-center lg:text-left flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold text-amber-400 mb-4">
              Reserve Your Seat
            </h1>
            <p className="text-gray-300 mb-2 leading-relaxed">
              Step into an atmosphere where flavor, craft, and elegance meet.
            </p>
            <p className="text-gray-300 mb-2 leading-relaxed">
              Each reservation is carefully curated.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Our kitchen operates with precision and passion.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="self-center lg:self-start bg-amber-500 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-amber-400 transition"
            >
              Explore Our Menu
            </motion.button>
          </div>

          {/* Reservation Form */}
          <section className="flex-1 w-full max-w-md lg:max-w-full bg-[#0b0b0b] border border-amber-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <header className="mb-6 text-center lg:text-left">
              <h2 className="text-2xl font-serif text-amber-400 mb-1">Reserve a Table</h2>
              <p className="text-sm text-gray-400">
                Select your preferred date and time.
              </p>
            </header>

            {/* Reservation Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col">
                <label className="text-xs text-gray-400 mb-1">Date</label>
                <input
                  type="date"
                  value={form.Date}
                  onChange={e => setForm({ ...form, Date: e.target.value })}
                  className="input px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-gray-400 mb-1">Time</label>
                <input
                  type="time"
                  value={form.Time}
                  onChange={e => setForm({ ...form, Time: e.target.value })}
                  className="input px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-gray-400 mb-1">Guests</label>
                <select
                  value={form.Guests}
                  onChange={e => setForm({ ...form, Guests: parseInt(e.target.value) })}
                  className="input px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-amber-400"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guest Info */}
            <div className="space-y-4 mb-6">
              <input
                type="text"
                value={form.FullName}
                onChange={e => setForm({ ...form, FullName: e.target.value })}
                placeholder="Full Name"
                className="input w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-amber-400"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={form.Phone}
                onChange={e => setForm({ ...form, Phone: e.target.value })}
                className="input w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-amber-400"
              />

              <input
                type="email"
                placeholder="Email"
                value={form.Email}
                onChange={e => setForm({ ...form, Email: e.target.value })}
                className="input w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-amber-400"
                required
              />

              <textarea
                placeholder="Special requests"
                value={form.SpecialRequests}
                onChange={e => setForm({ ...form, SpecialRequests: e.target.value })}
                rows={3}
                className="input resize-none w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Submit */}
            <motion.button
              disabled={submitting}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleReserve}
              className={`w-full py-3 rounded-full font-semibold tracking-wide transition
                ${submitting ? "bg-gray-600 cursor-not-allowed" : "bg-amber-500 hover:bg-amber-400 text-black"}`}
            >
              {submitting ? "Sending..." : "Confirm Reservation"}
            </motion.button>

            <p className="text-xs text-gray-500 text-center mt-4">
              We’ll contact you shortly to confirm availability.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
