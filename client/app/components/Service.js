"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowBigRightDashIcon, LoaderCircle } from "lucide-react"
import { useEffect, useState } from "react"

export default function Newsletter() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://resturant-tracking-platform-2.onrender.com/services")
        if (!res.ok) throw new Error("Failed to fetch service data")
        const result = await res.json()
        setData(result)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <motion.div
        animate={{ y: [0, -19, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="flex flex-col items-center justify-center min-h-[50vh]"
      >
        <LoaderCircle className="text-[#ecd71c] animate-spin" size={60} />
        <p className="mt-4 text-lg font-medium text-gray-300">
          Loading Section...
        </p>
      </motion.div>
    )
  }

  if (!data)
    return <p className="text-white text-center py-10">No data found</p>

  return (
    <div className="service-homepage bg-center relative text-white px-4 py-6 sm:py-10">
      {/* Divider */}
      <div className="flex justify-center items-center mb-4 sm:mb-6">
        <Image src="/imgs/separator.svg" alt="liner" height={1} width={300} />
      </div>

      {/* Heading Section */}
      <div className="text-center uppercase flex flex-col items-center">
        <span className="text-sm sm:text-base font-mono text-orange-400">
          {data.headingSmall}
        </span>
        <span className="relative font-sans text-2xl sm:text-3xl before:content-['|'] before:absolute before:-left-2 before:animate-pulse">
          {data.headingBig}
        </span>
        <p
          className="mt-2 sm:mt-4 text-xs sm:text-sm md:text-base text-gray-300 max-w-xl mx-auto font-mono"
          style={{ fontVariant: "small-caps" }}
        >
          {data.Description1}
          <br />
          {data.Description2}
        </p>
      </div>

      {/* Service Cards */}
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-stretch gap-6">
        {[
          { title: "Main dish", img: "/imgs/service-1.jpg" },
          { title: "Warm Ups", img: "/imgs/service-3.jpg" },
          { title: "Appetizers", img: "/imgs/service-2.jpg" },
        ].map((item, idx) => (
          <motion.div
            key={item.title}
            className="w-full sm:w-[300px] p-4 rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300 font-sans bg-[#0b0b0b]"
            initial={{ x: idx === 0 ? 10 : idx === 2 ? -10 : 0, opacity: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h3 className="text-center font-light uppercase mb-2 font-mono">
              {item.title}
            </h3>
            <Image
              src={item.img}
              alt={item.title}
              height={200}
              width={300}
              className="rounded-md mx-auto"
            />
            <p className="text-center mt-3 text-sm">Content Lorem30</p>
            <div className="flex justify-center items-center gap-2 mt-3">
              <ArrowBigRightDashIcon className="text-orange-400" />
              <button className="text-orange-400 hover:text-orange-300">
                See Dish
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
