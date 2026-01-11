
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ReservationPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    FullName: "",
    Email: "",
    Phone: "",
    Date: "",
    Time: "",
    Guests: 2,
    SpecialRequests: "",
  });

  // ======================
  // Fetch Reservation Copy
  // ======================
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/reserve`)
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ======================
  // Submit Reservation
  // ======================
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reserve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Reservation failed");

      alert("✨ Reservation confirmed. Check your email.");
      setForm({
        FullName: "",
        Email: "",
        Phone: "",
        Date: "",
        Time: "",
        Guests: 2,
        SpecialRequests: "",
      });
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // ======================
  // Loading Screen
  // ======================
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-amber-400">
        <motion.div
          className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-[#0d0d0d] to-black text-white pt-32 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">

        {/* ======================
            LEFT — Story / Psychology
           ====================== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif text-amber-400 mb-6">
            {content.header}
          </h1>

          <p className="text-gray-300 mb-4 leading-relaxed">
            {content.text1}
          </p>
          <p className="text-gray-400 mb-4 leading-relaxed">
            {content.text2}
          </p>
          <p className="text-gray-500 leading-relaxed">
            {content.text3}
          </p>
        </motion.div>

        {/* ======================
            RIGHT — Reservation Form
           ====================== */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-[#0c0c0c] border border-amber-500/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(255,193,7,0.12)]"
        >
          <h2 className="text-xl font-semibold text-amber-400 mb-6">
            Secure Your Table
          </h2>

          <div className="space-y-4">
            {[
              ["FullName", "Full Name"],
              ["Email", "Email Address"],
              ["Phone", "Phone Number"],
            ].map(([key, label]) => (
              <input
                key={key}
                required
                placeholder={label}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full bg-black/40 border border-gray-700 rounded-full px-5 py-3 text-sm focus:border-amber-400 outline-none"
              />
            ))}

            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                required
                value={form.Date}
                onChange={(e) => setForm({ ...form, Date: e.target.value })}
                className="bg-black/40 border border-gray-700 rounded-full px-5 py-3 text-sm"
              />
              <input
                type="time"
                required
                value={form.Time}
                onChange={(e) => setForm({ ...form, Time: e.target.value })}
                className="bg-black/40 border border-gray-700 rounded-full px-5 py-3 text-sm"
              />
            </div>

            <input
              type="number"
              min="1"
              max="20"
              value={form.Guests}
              onChange={(e) => setForm({ ...form, Guests: +e.target.value })}
              className="w-full bg-black/40 border border-gray-700 rounded-full px-5 py-3 text-sm"
            />

            <textarea
              placeholder="Special requests (optional)"
              value={form.SpecialRequests}
              onChange={(e) =>
                setForm({ ...form, SpecialRequests: e.target.value })
              }
              className="w-full bg-black/40 border border-gray-700 rounded-2xl px-5 py-3 text-sm resize-none h-24"
            />

            <motion.button
              disabled={submitting}
              whileHover={{ scale: 1.02 }}
              className="w-full py-4 rounded-full bg-amber-500 text-black font-bold uppercase tracking-widest hover:bg-amber-400 transition"
            >
              {submitting ? "Reserving..." : "Confirm Reservation"}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
