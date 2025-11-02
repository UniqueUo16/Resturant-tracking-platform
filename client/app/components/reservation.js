"use client"

import { SendIcon, Network, LoaderCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react";

export default function Reservation() {
    const [imagePreview, setImagePreview] = useState(null);
    const [imageUpload, setImageUpload] = useState(null);
      const [loading, setLoading] = useState(true);
      const [data, setData] = useState(null)

        useEffect(() => {
      async function fetchData() {
        try {
          const res = await fetch("https://resturant-tracking-platform-2.onrender.com/reserve")
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

    useEffect(() => {
        if (imageUpload) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };

            reader.readAsDataURL(imageUpload);
        }

    }, [imageUpload]);

    const handleImageChange = (e) => {
        setImageUpload(e.target.files[0]);
    }
       
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
        <div>

            <div className="sm:mt-12 px-6 sm:px-16 max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-start ">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center mt-20">
                        <h2 className="text-3xl font-bold text-center sm:text-center">
                            {data.header}
                        </h2>
                        <p className="mt-4 text-gray-300 text-center sm:text-center leading-relaxed">
                          {data.text1} <br/>
                            <br />
                          {data.text2} <br />
                            <br />
                          {data.text3}
                        </p>
                        <button className="mt-6 rounded-sm px-6 py-3 bg-white text-black shadow-md hover:bg-gray-100 self-center sm:self-center">
                            Navigate Our Menu
                        </button>
                    </div>



                    <motion.form
                        className="rounded-lg shadow-md p-6 flex flex-col text-black"
                        animate={{ y: [0, -10, 0] }} // combines your float animation
                        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                    >
                        <a href="#book" className="text-white"></a>


                        {/* Your form inputs here */}

                        <span className="flex justify-between items-center text-xl font-thin mb-4  text-gray-700 font-mono">
                            Send us a message <br /> and book a table <Network className="animate-spin text-gray-600" />
                        </span>

                        <label id="book" className="mb-1 text-sm font-medium">Enter Name</label>
                        <input
                            type="text"
                            placeholder="Enter Full Name"
                            className="w-full p-2 mb-4 rounded bg-[#d2d2d2] text-gray-700"
                        />

                        <label className="mb-1 text-sm font-medium">Enter Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="w-full p-2 mb-4 rounded bg-[#d2d2d2] text-gray-700"
                        />
                        <label className="mb-1 text-sm font-medium">Enter Phone</label>
                        <input
                            type="tel"
                            placeholder="Enter Phone"
                            className="w-full p-2 mb-4 rounded bg-[#d2d2d2] text-gray-700"
                        />
                        <label className="bg-[#2b1476] text-amber-50  rounded-full  p-3 w-[5vw] h-[8vh] block cursor-pointer m-3">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                placeholder="Upload a pic of you "
                            />
                            {imagePreview && (

                                <img
                                    src={imagePreview} alt="Image Preview" className=" border-3 border-[#bbbbbb] w-[5vw] h-[10vh] mt-[-3rem] absolute  object-cover rounded-full"
                                />
                            )}
                        </label>
                        <section className="flex gap-[2rem] justify-center items-center ">
                            <input
                                type="date"
                                className="bg-[#181717]  text-white w-[vw] h-[8vh] p-3"
                            />
                            <label htmlFor="time">
                                <input
                                    type="time"
                                    className="bg-[#181717]  text-white w-[vw] h-[8vh] p-3"
                                />
                            </label>
                            <input
                                type="reset"
                                className="bg-[#d1d1d1]  w-[vw] h-[8vh] p-3 rounded-full text-black font-mono text-[0.8rem]"
                                style={{ fontVariant: "small-caps" }} />

                        </section>

                        <label className="mb-1 text-sm font-medium">Enter Message</label>
                        <textarea
                            placeholder="Enter Message (Optional)"
                            className="w-full p-3 mb-4 rounded bg-[#d2d2d2] text-gray-700"
                            rows={4}
                        />

                        <button
                            type="submit"
                            className="rounded-sm p-3 flex justify-center items-center gap-2 text-white bg-black hover:bg-gray-900"
                        >
                            Send <SendIcon size={18} />
                        </button>
                    </motion.form>
                </div>
            </div>
        </div>
    )
}