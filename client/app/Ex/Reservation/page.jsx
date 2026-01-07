"use client"

import { SendIcon, Network, LoaderCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react";

export default function Reservation() {
const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    FullName: "",
    Email: "",
    Phone: "",
    Date: "",
    Time: "",
    Guests: 1,
    SpecialRequests: ""
  })
     
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
        <div className="full-reserve bg-center  bg-contain">

            <div className=" px-6 sm:px-16 max-w-7xl mx-auto bg-black/50 ">
                <span className="font-mono" style={{fontVariant: "small-caps"}}>full reservation page</span>
             
               
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-start ">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center mt-20">
                        <h2 className="text-3xl font-bold text-center sm:text-center">
                            <p>Reserve Your Seat at the Table</p>
                        </h2>
                        <span className="mt-4 text-gray-300 text-center sm:text-center leading-relaxed">
                          <p>Step into an atmosphere where flavor, craft, and elegance meet.</p><br/>
                            <br />
                          <p>Each reservation is carefully curated.</p> <br />
                            <br />
                          <p>Our kitchen operates with precision and passion.</p>
                        </span>
                        <button className="mt-6 rounded-sm px-6 py-3 bg-white text-black shadow-md hover:bg-gray-100 self-center sm:self-center">
                            Navigate Our Menu
                        </button>
                    </div>
                      <section className="w-full mt-4 max-w-xl mx-auto bg-[#0b0b0b] border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl">

  <header className="mb-6">
    <h2 className="text-2xl font-serif text-amber-400">
      Reserve a Table
    </h2>
    <p className="text-sm text-gray-400">
      Select your preferred date and time.
    </p>
  </header>

  {/* Reservation Details */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
    <div>
      <label className="text-xs text-gray-400">Date</label>
      <input 
      type="date" 
      value={form.Date}
      onChange={e=> setForm({ ...form, Date: e.target.value})}
      className="input mt-1" />
    </div>

    <div>
      <label className="text-xs text-gray-400">Time</label>
      <input 
      type="time" 
      value={form.Time}
      onChange={e=> setForm({ ...form, Time: e.target.value})}
      className="input mt-1" />
    </div>

    <div>
      <label className="text-xs text-gray-400">Guests</label>
<select 
  className="input mt-1"
  value={form.Guests}
  onChange={e => setForm({ ...form, Guests: parseInt(e.target.value) })}>
  {[1,2,3,4,5,6,7,8].map(n => (
    <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
  ))}
</select>


    </div>
  </div>

  {/* Guest Info */}
  <div className="space-y-4">
    <input 
    type="text" 
    value={form.FullName}
    onChange={e => setForm({ ...form, FullName: e.target.value})}
    placeholder="Full Name" className="input" />

    <input 
    type="tel"
     placeholder="PhoneNumber"
     value={form.Phone}
    onChange={e => setForm({ ...form, Phone: e.target.value})}
     className="input" />
    <input 
    type="email"
    placeholder="Email"
    value={form.Email}
    onChange={e => setForm({ ...form, Email: e.target.value})}
    className="input"
    required
/>

    <textarea
      placeholder="Special requests"
      value={form.SpecialRequests}
      onChange={e => setForm({ ...form, SpecialRequests: e.target.value})}
      rows={3}
      className="input resize-none"
    />
  </div>

  {/* CTA */}
  <motion.button
  disabled={submitting}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    onClick={handleReserve}
    className="mt-6 w-full rounded-full bg-amber-500 py-3 text-black font-semibold tracking-wide hover:bg-amber-400 transition"
  >
    {submitting ? "Sending...": "Confirm Reservation"}
  </motion.button>

  <p className="text-xs text-gray-500 text-center mt-4">
    We’ll contact you shortly to confirm availability.
  </p>
</section>
               </div>
            </div>
        </div>
    )
}