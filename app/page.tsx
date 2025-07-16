"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants, easeInOut } from "framer-motion";
import BuildOnCraft from "./components/BuildOnCraft";
import Categories from "./components/Categories";
import Connect from "./components/Connect";
import FinestDiamonds from "./components/FinestDiamonds";
import Testimonial from "./components/Testimonial";
import Collections from "./components/Collections";
import ShowGems from "./components/ShowGems";
import BestGradeSection from "./components/BestGradeSection";
import DiamondCards from "./components/DiamondCards";
import Popup from "./components/popup";
import InstagramSection from "./components/InstagramSection";

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
    const [showPopup, setShowPopup] = useState<boolean>(false);

    useEffect(() => {
        // Get the last popup timestamp from localStorage
        const lastPopupTimestamp = localStorage.getItem("lastPopupTimestamp");
        const sessionSeen = sessionStorage.getItem("popupSeenThisSession");
        const now = Date.now();

        // 2 hours in milliseconds
        const TWO_HOURS = 2 * 60 * 60 * 1000;

        // Show popup if:
        // 1. No timestamp exists, or 2. More than 2 hours have passed since last popup
        // 3. Not already shown in this session
        if (
            (!lastPopupTimestamp ||
                now - Number(lastPopupTimestamp) > TWO_HOURS) &&
            !sessionSeen
        ) {
            const timer = setTimeout(() => {
                setShowPopup(true);

                // Update localStorage with the current timestamp
                localStorage.setItem("lastPopupTimestamp", now.toString());

                // Mark that popup has been shown in this session
                sessionStorage.setItem("popupSeenThisSession", "true");
            }, 1000); // 1 second delay

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            {/* Conditionally render the Popup component */}
            {showPopup && <Popup onClose={handleClosePopup} />}

            {/* Each section with its own independent animation */}

            <BestGradeSection />

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={variants}
            >
                <FinestDiamonds />
            </motion.div>

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
                <Categories />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={variants}
            >
                <BuildOnCraft />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={variants}
            >
                <Collections />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={variants}
            >
                <DiamondCards />
            </motion.div>

            <motion.div
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
            </motion.div>
        </div>
    );
}
