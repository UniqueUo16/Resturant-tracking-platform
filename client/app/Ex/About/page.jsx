"use client"

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="relative bg-[#0c0b09] text-gray-300 overflow-hidden font-sans">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('/imgs/shape-4.png')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-16">
        {/* LEFT — Image */}
        <motion.div
          className="flex-1"
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src="/imgs/about-banner.jpg"
            alt="Our Chef"
            width={600}
            height={600}
            className="rounded-3xl object-cover shadow-[0_0_25px_rgba(255,193,7,0.2)]"
          />
        </motion.div>

        {/* RIGHT — Text Content */}
        <motion.div
          className="flex-1 space-y-6"
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-amber-500 text-4xl font-serif tracking-wide">
            About Our Restaurant
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Nestled in the heart of the city, <span className="text-white font-semibold">Unique Uo’s Restaurant</span> 
            brings together culinary artistry and timeless elegance. Each dish we serve is 
            crafted from the finest locally sourced ingredients, prepared with passion and 
            presented with flair.
          </p>

          <p className="text-gray-400 leading-relaxed">
            Founded in 2010, our restaurant has been celebrated for its innovative approach 
            to fine dining. From the subtle notes of truffle in our main courses to the 
            handpicked wines that complement each meal, we promise a dining experience 
            that delights every sense.
          </p>

          <div className="flex items-center gap-6 pt-6">
            <Image
              src="/imgs/chef-signature.png"
              alt="Chef signature"
              width={150}
              height={60}
              className="opacity-80"
            />
            <div>
              <h4 className="text-white text-lg font-semibold">Chef Lorenzo De Luca</h4>
              <p className="text-gray-500 text-sm">Executive Head Chef</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Divider Section */}
      <motion.div
        className="relative text-center py-16 border-t border-gray-800 mt-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl text-amber-500 font-serif mb-4">“Where every meal tells a story.”</h3>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          At Unique Uo’s, we believe in the art of slow dining — where conversation, 
          comfort, and cuisine come together in perfect harmony.
        </p>
      </motion.div>
    </section>
  );
}
