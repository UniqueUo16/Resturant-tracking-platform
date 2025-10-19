"use client";
import { useState, useEffect } from "react";
import Image from "next/image"
import {motion} from "framer-motion"




const slides = [
  {
    id: 1,
    image: "/imgs/hero-slider-1.jpg",
    title: "Welcome to Our Website",
    description: "Discover amazing things with us. From dishes to potentail Services",
  },
  {
    id: 2,
    image: "/imgs/hero-slider-2.jpg",
    title: "Our Services",
    description: "We offer top-notch solutions.",
  },
  {
    id: 3,
    image: "/imgs/hero-slider-3.jpg",
    title: "Get Started Today",
    description: "Join us and grow together.",
  },
];

export default function HeroCarousel(){
  const [current, setCurrent] = useState(0);

  const [preloader, setPreloader] = useState(true)

useEffect(()=>{
  const timer = setTimeout(() => {
    setPreloader(false)
  }, 1400);
  return ()=> clearTimeout(timer)
},[])


  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide=()=> {
    setCurrent(current === length -1 ? 0 : current + 1 )
  }
  const goToSlide = (index) => setCurrent(index);

return (
     <div className="overflow-hidden">
   



    <motion.div className="relative w-full sm:ml-[rem] h-[500px] overflow-hidden bg-center sm:rounded-l-[11rem] rounded-l-[6rem] "
      initial={{x:400, opacity:0}}
      whileInView={{opacity:1, x:0}}
      transition={{ease: "easeInOut", duration: 1}}
      viewport={{amount: 0.3, once:false}}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          
        >
          
          <img
            src={slide.image}
            alt={slide.title}
            className="object-cover w-full h-full"
          />
          <div className=" absolute  mt-[23rem] inset-0 bg-black/10 flex flex-col justify-center items-center text-white text-center p-4">
            <h2 className="text-3xl md:text-7xl font-light mb-2 font-serif mt-[2rem]">{slide.title}</h2>
            <p className="text-lg">{slide.description}</p>
                        <a href="/Ex/Reservation#book" className=" border border-white p-2 w-[20vw] rounded m-4">Book a table</a>

{/* TEST SLIDE BUTTONS */}
        <div className=" sm:ml-[55rem] mt-[-3rem]">
        <motion.div className="rotate-20 ml-[-32rem] "
        animate={{y:[0, -70, 0]}}
        transition={{duration:2, repeat: Infinity, ease:"easeInOut"}}
        >
        <button className="flex gap-[1rem] sm:mt-[14rem] sm:text-xl text-white border-2 p-3 border-[orange] bg-[darkorange] rounded-l-full">
          <Image
          src="/imgs/features-icon-1.png"
          alt=""
          height={40}
          width={40}
          className="bg-black rounded-full"
          /> spicy, i luv <br/>thier Services 😍
        </button>
        </motion.div>
        <motion.div className="rotate-20 ml-[-20rem]"
        animate={{y:[0, -96, 0]}}
        transition={{duration:2, repeat: Infinity, ease:"easeInOut"}}
        >
        <button className="flex sm:text-2xl text-white p-3 border-[orange] bg-[black] text-[0.8rem] rounded-r-full" >
          <span className="mt-[2rem]"> spicy, i luv this 😍😋🥰 </span>
           <Image
          src="/imgs/badge-2.png"
          alt="john"
          height={60}
          width={100}
          className="rounded-full p-2"
          />
        </button>
        </motion.div>
        <motion.div className="rotate-20 ml-[-2rem] "
        animate={{y:[0, -10, 0]}}
        transition={{duration:2, repeat: Infinity, ease:"easeInOut"}}
        >
        <button className="text-3xl text-white border-2 p-8 border-[orange]">
          
        </button>
        </motion.div>
        
      </div>
       <motion.div className="rotate-20  mt-[-5rem] sm:ml-[-22rem] ml-[15rem] "
        animate={{y:[0, -100, 0]}}
        transition={{duration:2, repeat: Infinity, ease:"easeInOut"}}
        >
        <button className="flex sm:text-xl sm:ml-[-28rem]  sm:mt-[-6rem] text-[0.8rem] rounded-l-full  text-white border-2 p-2 border-[orange] bg-[orange]">
          <Image
          src="/imgs/badge-2.png"
          alt="john"
          height={60}
          width={100}
          className="rounded-full p-2"
          />i rate services 100😋🥰
        </button>
     
        </motion.div>
          </div>
        </div>
        
        
      ))}
      
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "border border-white" : "border border-white"
            }`}
          >Unique Uo</button>
        ))}

    
      </div>
      </motion.div>
      
     
    </div>
  )}
