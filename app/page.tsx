"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants, easeInOut } from "framer-motion";
import BuildOnCraft from "../components/landing/home/BuildOnCraft";
import Categories from "../components/landing/home/Categories";
import Connect from "../components/landing/home/Connect";
import Testimonial from "../components/landing/home/Testimonial";
import Collections from "../components/landing/home/Collections";
import ShowGems from "../components/landing/home/ShowGems";
import DiamondCards from "../components/landing/home/DiamondCards";
import InstagramSection from "../components/landing/home/InstagramSection";
import HeroSection from "@/components/newHome/HeroSection";
import WelcomeSection from "@/components/newHome/WelcomSection";
import FinestGemsSection from "@/components/newHome/FinestGemsSection";
import LocomotiveScroll from "locomotive-scroll";
import CategoriesSection from "@/components/newHome/CategoriesSection";
import BuildOnCraftSection from "@/components/newHome/BuildOnCraftSection";
import CollectionsSection from "@/components/newHome/CollectionsSection";
import DiamondCertificates from "@/components/newHome/DiamondCertificates";
import TestimonialsSection from "@/components/newHome/TestimonialsSection";
import SocialSection from "@/components/newHome/SocialSection";

// Define your variants with the correct typing
const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: easeInOut, // Use the imported easing function instead of a string
        },
    },
};

export default function Home() {
    // const scroll = new LocomotiveScroll();

    return (
        <div>
            {/* Each section with its own independent animation */}

            <HeroSection />

            <WelcomeSection />
            <FinestGemsSection />
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={variants}
            >
                <ShowGems />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={variants}
            >
                <CategoriesSection />
            </motion.div>

            <BuildOnCraftSection />

            <CollectionsSection />

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={variants}
            >
                <DiamondCertificates />
            </motion.div>

            <TestimonialsSection />
            <SocialSection />

            {/* <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={variants}
            >
                <InstagramSection />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={variants}
            >
                <Testimonial />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={variants}
            >
                <Connect />
            </motion.div> */}
        </div>
    );
}
