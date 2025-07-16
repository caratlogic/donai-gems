"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gem3 from "../assets/ring-gem.jpg";
// import StarIcon from "../assets/star.png";
import { Playfair_Display, Open_Sans } from "next/font/google";

const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const OurStory = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className=""
    >
    <div className="max-w-7xl mx-auto">
    <div className="w-full flex flex-col md:flex-row justify-between gap-10 bg-[#FAF8F2]">
      {/* <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-238 left-5" />
        <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-330 left-150" /> */}
      {/* Info Section */}
      <div className="flex flex-col px-15 py-15 mt-15 max-w-xl mx-auto items-center lg:items-start">
        <h1
          className={`${playFair.className} text-5xl text-center lg:text-left`}
          style={{
            fontWeight: 400,
            background: "linear-gradient(to right, #FFDCBB, #54330C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Our Story
        </h1>
        <div
          className={`mt-10 ${openSans.className} font-light text-md lg:text-xl`}
        >
          <p>
          True luxury lies in the details — in the precision of every cut, the brilliance of every gemstone and the craftsmanship behind each creation. At DIANO, we invite you to discover a world where refinement meets rarity and where every detail tells a story of elegance and excellence.
          </p>
        </div>

        <button
          className={`mt-10 ${openSans.className} h-10 text-[#2E2B28] font-normal px-3 border-1 border-[#2E2B28] hover:bg-[#2E2B28] hover:text-[#FFFFFF] transition-all duration-300`}
        >
          SCHEDULE AN APPOINTMENT
        </button>
      </div>

      {/* Image Section */}
      <div className="flex items-center justify-center">
        <Image
          src={gem3}
          alt="Diano Apart"
          width={500}
          height={500}
          className="h-full object-cover"
        />
      </div>
    </div>
    </div>
    </motion.section>
  );
};

export default OurStory;
