"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Menu() {
    const [menujs, setMenujsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMenujs() {
            try {
                const res = await fetch("https://resturant-tracking-platform-2.onrender.com/menujs");
                if (!res.ok) throw new Error("Failed To Fetch Menu");
                const data = await res.json();
                setMenujsData(data);
            } catch (err) {
                console.error("Error fetching menu:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchMenujs();
    }, []);

    if (loading) return <p className="text-center text-white">Loading menu...</p>;

    // Grab items individually (handcrafted layout, no map)
    const item1 = menujs[0];
    const item2 = menujs[1];
    const item3 = menujs[2];
    const item4 = menujs[3];
    const item5 = menujs[4];
    const item6 = menujs[5];

    return (
        <div className="menu-bg bg-contain bg-center text-white">
            {/* Divider */}
            <div className="justify-center flex items-center pb-6">
                <Image
                    src="/imgs/separator.svg"
                    alt="storyimg"
                    height={400}
                    width={600}
                    className="w-full md:w-1/2 h-auto"
                />
            </div>

            {/* Title */}
            <h2 className="sm:text-3xl flex justify-center mb-6">
                Our Delicious Menu
            </h2>

            {/* MAIN FLEX WRAPPER */}
            <div className="flex flex-col sm:flex-row justify-center">
                {/* LEFT COLUMN */}
                <div className="flex-1">
                    {/* ITEM 1 */}
                    {item1 && (
                        <div className="m-7 sm:ml-[5rem] flex items-start gap-4 text-[0.9rem]">
                            <Image
                                src={item1.img}
                                alt={item1.name}
                                height={100}
                                width={100}
                            />
                            <div className="m-2 flex flex-wrap items-center">
                                <span>{item1.name}</span>
                                <span className="ml-2 text-[0.9rem] p-1 text-black bg-[orange]">
                                    {item1.category}
                                </span>
                                <div className="flex flex-col space-y-1 w-10 py-2 mx-4">
                                    <hr className="border-gray-400 border-t" />
                                    <hr className="border-gray-400 border-t" />
                                </div>
                                <span className="py-[0.2rem]">${item1.price.toFixed(2)}</span>
                                <p className="text-[0.84rem] font-sans w-full mt-2">
                                    {item1.description}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* ITEM 2 */}
                    {item2 && (
                        <motion.div
                            className="m-7 sm:ml-[5rem] flex items-start gap-4 text-[0.9rem]"
                            animate={{ y: [0, -7, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Image src={item2.img} alt={item2.name} height={100} width={100} />
                            <div className="m-2 flex flex-wrap items-center">
                                <span>{item2.name}</span>
                                <span className="ml-2 text-[0.9rem] p-1 text-black bg-[orange]">
                                    {item2.category}
                                </span>
                                <div className="flex flex-col space-y-1 w-10 py-2 mx-4">
                                    <hr className="border-gray-400 border-t" />
                                    <hr className="border-gray-400 border-t" />
                                </div>
                                <span className="py-[0.2rem]">${item2.price.toFixed(2)}</span>
                                <p className="text-[0.84rem] font-sans w-full mt-2">
                                    {item2.description}
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* ITEM 3 */}
                    {item3 && (
                        <div className="m-7 sm:ml-[5rem] flex items-start gap-4 text-[0.9rem]">
                            <Image src={item3.img} alt={item3.name} height={100} width={100} />
                            <div className="m-2 flex flex-wrap items-center">
                                <span>{item3.name}</span>
                                <span className="ml-2 text-[0.9rem] p-1 text-black bg-[orange]">
                                    {item3.category}
                                </span>
                                <div className="flex flex-col space-y-1 w-10 py-2 mx-4">
                                    <hr className="border-gray-400 border-t" />
                                    <hr className="border-gray-400 border-t" />
                                </div>
                                <span className="py-[0.2rem]">${item3.price.toFixed(2)}</span>
                                <p className="text-[0.84rem] font-sans w-full mt-2">
                                    {item3.description}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* MIDDLE DIVIDER */}
                <div className="hidden sm:block border-r border-white h-[70vh] mx-8"></div>

                {/* RIGHT COLUMN */}
                <div className="flex-1">
                    {/* ITEM 4 */}
                    {item4 && (
                        <motion.div
                            className="m-7 sm:ml-[5rem] flex items-start gap-4"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Image src={item4.img} alt={item4.name} height={100} width={100} />
                            <div className="m-2 flex flex-wrap items-center text-[0.9rem]">
                                <span>{item4.name}</span>
                                <span className="ml-2 text-[0.9rem] p-1 text-black bg-[orange]">
                                    {item4.category}
                                </span>
                                <div className="flex flex-col space-y-1 w-10 py-2 mx-4">
                                    <hr className="border-gray-400 border-t" />
                                    <hr className="border-gray-400 border-t" />
                                </div>
                                <span className="py-[0.2rem]">${item4.price.toFixed(2)}</span>
                                <p className="text-[0.84rem] font-sans w-full mt-2">
                                    {item4.description}
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* ITEM 5 */}
                    {item5 && (
                        <div className="m-7 sm:ml-[5rem] flex items-start gap-4 text-[0.9rem]">
                            <Image src={item5.img} alt={item5.name} height={100} width={100} />
                            <div className="m-2 flex flex-wrap items-center">
                                <span>{item5.name}</span>
                                <span className="ml-2 text-[0.9rem] p-1 text-black bg-[orange]">
                                    {item5.category}
                                </span>
                                <div className="flex flex-col space-y-1 w-10 py-2 mx-4">
                                    <hr className="border-gray-400 border-t" />
                                    <hr className="border-gray-400 border-t" />
                                </div>
                                <span className="py-[0.2rem]">${item5.price.toFixed(2)}</span>
                                <p className="text-[0.84rem] font-sans w-full mt-2">
                                    {item5.description}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* ITEM 6 */}
                    {item6 && (
                        <motion.div
                            className="m-7 sm:ml-[5rem] flex items-start gap-4 text-[0.9rem]"
                            animate={{ y: [0, 4, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Image src={item6.img} alt={item6.name} height={100} width={100} />
                            <div className="m-2 flex flex-wrap items-center">
                                <span>{item6.name}</span>
                                <span className="ml-2 text-[0.9rem] p-1 text-black bg-[orange]">
                                    {item6.category}
                                </span>
                                <div className="flex flex-col space-y-1 w-10 py-2 mx-4">
                                    <hr className="border-gray-400 border-t" />
                                    <hr className="border-gray-400 border-t" />
                                </div>
                                <span className="py-[0.2rem]">${item6.price.toFixed(2)}</span>
                                <p className="text-[0.84rem] font-sans w-full mt-2">
                                    {item6.description}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <Link
                    href="/"
                    className="border border-orange-300 px-6 py-3 text-white hover:bg-orange-500"
                >
                    View Our Menu
                </Link>
            </div>

        </div>
    );
}
