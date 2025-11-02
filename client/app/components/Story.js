"use client"
import Image from "next/image"
import {useEffect, useState } from "react"
import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

export default function Story() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null)
  

   useEffect(() => {
      async function fetchData() {
        try {
          const res = await fetch("https://resturant-tracking-platform-2.onrender.com/story")
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
        className="flex flex-col items-center justify-center mt-9">
          <LoaderCircle className="text-[#ecd71c] animate-spin" size={60} />
          <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-200">
            Loading Section...
          </p>
        </motion.div> 
      );
    }
      if (!data) return <p className="text-white text-center py-10">No data found</p>

    
  return (
    <div className="story-bg  text-white px-4 py-8">
      <span className="justify-center flex items-center pb-6">
       <Image
          src="/imgs/separator.svg"
          alt="storyimg"
          height={400}
          width={600}
          className=" w-full md:w-1/2 h-auto "
        />
        </span>


      {/* SECTION 1 */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
        <div className="flex absolute mt-[-46rem] justify-center items-center sm:mt-[-23rem] ml-[6rem]"><Image src="/imgs/badge-1.png" alt="storyimg" height={400} width={600} className=" w-full md:w-1/2 h-auto m-9"/>  <h1 className="absolute text-[0.7rem] flex justify-center items-center  sm:ml-[7rem] animate-bounce uppercase text-[orange]">Our Story</h1> </div>
        <Image
          src="/imgs/about-banner.jpg"
          alt="storyimg"
          height={400}
          width={600}
          className=" w-full md:w-1/2 h-auto"
        />
        <p className="text-center md:text-left md:w-1/2 text-sm sm:text-base leading-relaxed font-sans">
          {data.storytxt1}
        </p>
      </div>

      {/* SECTION 2 */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-6">
        <h1 className="absolute sm:mt-[-23rem] sm:ml-[-14rem] uppercase font-mono text-[0.6rem] text-[orange]" >Beavers</h1>
        <Image
          src="/imgs/testimonial-bg.jpg"
          alt="storyimg"
          height={400}
          width={600}
          className="rounded-md w-full md:w-1/2 h-auto"
        />
        <p className="text-center md:text-left md:w-1/2 text-sm sm:text-base leading-relaxed font-sans">
          {data.storytxt2}
        </p>
      </div>

    </div>
  )
}
