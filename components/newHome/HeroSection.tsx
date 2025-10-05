"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Playfair_Display, Inter } from "next/font/google";
import HeroBanner from "@/public/newHome/WelcomeSection/banner-gold.jpg";
import HeroBanner2 from "@/public/newHome/WelcomeSection/banner-2.jpg";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const HeroSection = () => {
    return (
        <>
            <Carousel
                plugins={[Autoplay({ delay: 6000 })]}
                opts={{ loop: true }}
            >
                <CarouselContent className="p-0 m-0">
                    <CarouselItem className="p-0 m-0">
                        <section className="relative min-h-[90vh] flex items-center justify-start overflow-hidden">
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={HeroBanner}
                                    alt="Gemstone Hero Background"
                                    fill
                                    className="object-cover"
                                    priority
                                    quality={95}
                                />
                                {/* Overlay for better text readability */}
                                <div className="absolute inset-0 bg-black opacity-10 " />
                            </div>

                            {/* Content Container */}
                            {/* <div className="relative bg-red-400  mx-auto px-6 py-24"> */}
                            <div className="absolute top-20 left-30  ">
                                {/* Text Content */}
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="text-white"
                                    style={{ marginTop: "100px" }}
                                >
                                    <motion.span
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.2,
                                        }}
                                        className={`text-3xl md:text-3xl lg:text-4xl max-w-xl font-normal leading-tight mb-6 text-black  ${playfair.className}`}
                                    >
                                        Where Gems Meet
                                        <br />
                                        <h1 className="text-[100px] my-0 leading-25 capitalize">
                                            ELEGANCE
                                        </h1>
                                    </motion.span>

                                    {/* <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className={`text-md leading-relaxed mb-8 max-w-md font-light text-black ${inter.className}`}
                    >
                        Discover timeless diamonds and rare gemstones, crafted
                        to perfection and designed to define your legacy.
                    </motion.p> */}

                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.6,
                                        }}
                                    >
                                        <Link href="/gemstones">
                                            <button className="group cursor-pointer relative overflow-hidden bg-[#927650]  px-5 py-2 text-white hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] transition-all duration-300 ease-in-out">
                                                <span className="relative text-sm  font-medium tracking-wide">
                                                    EXPLORE MORE
                                                </span>
                                                {/* Button hover effect */}
                                            </button>
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>
                            {/* </div> */}
                        </section>
                    </CarouselItem>
                    <CarouselItem className="p-0 m-0">
                        <section className="relative min-h-[90vh] flex items-center justify-start overflow-hidden">
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={HeroBanner2}
                                    alt="Gemstone Hero Background"
                                    fill
                                    className="object-cover"
                                    priority
                                    quality={95}
                                />
                                {/* Overlay for better text readability */}
                                <div className="absolute inset-0 bg-black opacity-10 " />
                            </div>

                            {/* Content Container */}
                            {/* <div className="relative bg-red-400  mx-auto px-6 py-24"> */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3">
                                {/* Text Content */}
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="text-white"
                                    style={{ marginTop: "100px" }}
                                >
                                    {" "}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.6,
                                        }}
                                        className="text-center mb-10 "
                                    >
                                        <span
                                            className={`font-playfair text-[40px] italic text-black font-light`}
                                        >
                                            {" "}
                                            Donai Gems
                                        </span>
                                        <br />
                                        <span
                                            className={`${playfair.className} text-sm text-center italic text-black font-light`}
                                        >
                                            Precious Gems
                                        </span>
                                    </motion.div>
                                    <motion.span
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.2,
                                        }}
                                        className={`text-3xl md:text-3xl lg:text-5xl max-w-xl font-normal leading-tight mb-6 text-black  ${playfair.className}`}
                                    >
                                        Where Every Facet Reflects
                                        <br />
                                        <h1 className="text-[100px] my-0 leading-25 capitalize">
                                            PERFECTION
                                        </h1>
                                    </motion.span>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.6,
                                        }}
                                        className="text-center mt-10"
                                    >
                                        <Link href="/gemstones">
                                            <button className="group cursor-pointer rounded-2xl relative overflow-hidden bg-black px-5 py-2 text-white hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] transition-all duration-300 ease-in-out">
                                                <span className="relative text-sm  font-medium tracking-wide">
                                                    EXPLORE OUR COLLECTION
                                                </span>
                                                {/* Button hover effect */}
                                            </button>
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>
                            {/* </div> */}
                        </section>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </>
    );
};

export default HeroSection;
