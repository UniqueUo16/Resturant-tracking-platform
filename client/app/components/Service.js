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
        const res = await fetch("http://localhost:5000/services")
        if (!res.ok) throw new Error("Failed to fetch service data")
        const result = await res.json()
        setData(result) // backend returns an array
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
    animate={{y:[0,-19,0]}}
    transition={{repeat: Infinity, duration: 6,  ease:"easeInOut"}}
    className="flex flex-col items-center justify-center ">
      <LoaderCircle className="text-[#ecd71c] animate-spin" size={60} />
      <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-200">
        Loading Section...
      </p>
    </motion.div> 
  );
}
  if (!data) return <p className="text-white text-center py-10">No data found</p>

  return (
    <div className="service-homepage bg-center relative text-white px-4 py-10">
      {/* Divider */}
      <div className="flex justify-center items-center mb-7">
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
          className="mt-4 text-xs sm:text-sm md:text-base text-gray-300 max-w-2xl font-mono"
          style={{ fontVariant: "small-caps" }}
        >
          {data.Description1}
          <br />
          {data.Description2}
        </p>
      </div>

      {/* Service Cards */}
      <div className="mt-10 flex flex-col sm:flex-row justify-center items-center sm:items-stretch gap-6">
        {/* Card 1 */}
        <motion.div
          className="w-full sm:w-[300px] p-4 rounded-sm shadow-lg hover:shadow-2xl transition-shadow duration-300"
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h3 className="text-center font-light uppercase mb-2 font-mono">Main dish</h3>
          <Image
            src="/imgs/service-1.jpg"
            alt="service 1"
            height={200}
            width={300}
            className="rounded-md mx-auto"
          />
          <p className="text-center mt-3 text-sm">Content Lorem30</p>
          <div className="flex justify-center items-center gap-2 mt-3">
            <ArrowBigRightDashIcon className="text-orange-400" />
            <button className="text-orange-400 hover:text-orange-300">See Dish</button>
          </div>
        </motion.div>

        {/* Card 2 */}
        <div className="w-full sm:w-[300px] p-4 rounded-sm shadow-lg hover:shadow-2xl transition-shadow duration-300 font-sans">
          <h3 className="text-center font-light font-mono uppercase mb-2">Warm Ups</h3>
          <Image
            src="/imgs/service-3.jpg"
            alt="service 2"
            height={200}
            width={300}
            className="rounded-md mx-auto"
          />
          <p className="text-center mt-3 text-sm">Content Lorem30</p>
          <div className="flex justify-center items-center gap-2 mt-3">
            <ArrowBigRightDashIcon className="text-orange-400" />
            <button className="text-orange-400 hover:text-orange-300">See Dish</button>
          </div>
        </div>

        {/* Card 3 */}
        <motion.div
          className="w-full sm:w-[300px] p-4 rounded-sm shadow-lg hover:shadow-2xl transition-shadow duration-300 font-sans"
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h3 className="text-center font-light font-mono uppercase mb-2">Appetizers</h3>
          <Image
            src="/imgs/service-2.jpg"
            alt="service 3"
            height={200}
            width={300}
            className="rounded-md mx-auto"
          />
          <p className="text-center mt-3 text-sm">Content Lorem30</p>
          <div className="flex justify-center items-center gap-2 mt-3">
            <ArrowBigRightDashIcon className="text-orange-400" />
            <button className="text-orange-400 hover:text-orange-300">See Dish</button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
