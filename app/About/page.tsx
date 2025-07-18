import React from "react";
import OurStory from "../components/OurStory";
import WhatSetUsApart from "../components/WhatSetUsApart";
import FAQSection from "../components/FAQSection";
import DianoBanner from "../components/DianoBanner";
import Image from "next/image";
import ringImage from "../assets/ring-gem.jpg";
import ringHand2 from "../../public/ringHand2.png";
import { Mulish, Playfair_Display } from "next/font/google";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
const mulish = Mulish({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const page = () => {
    return (
        <div>
            <div className="w-full min-h-[600px] bg-gray-50 flex items-center justify-center my-10 mb-30">
                <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-6 py-12">
                    {/* Left Side - Image */}
                    <div className="flex-1 relative">
                        <div className="relative w-full h-[560px] rounded-lg overflow-hidden translate-x-10 ">
                            <Image
                                src={ringImage} // Add this image to your public folder
                                alt="Hand wearing ruby ring"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="flex-1 flex flex-col justify-center items-start gap-8 pl-8 bg-white -translate-x-15 translate-y-15 shadow-2xl py-10">
                        <div className="space-y-6">
                            <h1
                                className={`text-4xl lg:text-5xl font-light text-[#C49A6C] leading-tight ${playFair.className}`}
                            >
                                Our Legacy is in Every Gem
                            </h1>

                            <div className="space-y-4 text-gray-600">
                                <p
                                    className={`text-lg font-light leading-relaxed ${mulish.className}`}
                                >
                                    Founded in 2018, DONAI stands as one of
                                    Antwerp&apos;s premier gemstone suppliers,
                                    trusted by jewellers, collectors, and
                                    connoisseurs across the globe.
                                </p>

                                <p
                                    className={`text-lg font-light leading-relaxed ${mulish.className}`}
                                >
                                    But our story didn&apos;t begin there. With
                                    over two decades of experience in the gem
                                    industry since 2001, our foundation is built
                                    on generations of knowledge, discipline, and
                                    precision.
                                </p>

                                <p
                                    className={`text-lg font-light leading-relaxed ${mulish.className}`}
                                >
                                    Today, we&apos;re not just another gem
                                    dealer. We are a global source of certified,
                                    investment-grade gemstones — each handpicked
                                    for brilliance, rarity, and value.
                                </p>
                            </div>

                            <button
                                className={`mt-8 px-8 py-3 border border-gray-400 text-gray-700 font-light bg-transparent hover:bg-gray-100 transition-all duration-300 ${mulish.className}`}
                            >
                                SCHEDULE AN APPOINTMENT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <OurStory />
            <div className="w-full min-h-[600px] bg-gray-50 flex items-center justify-center my-10">
                <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-6 py-12">
                    {/* Left Side - Image */}
                    <div className="flex-1 relative">
                        <div className="relative w-full h-[560px] rounded-lg overflow-hidden translate-x-10 ">
                            <Image
                                src={ringHand2} // Add this image to your public folder
                                alt="Hand wearing ruby ring"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="flex-1 flex flex-col justify-center items-start gap-8 pl-8 bg-white -translate-x-15 translate-y-15 shadow-2xl py-10">
                        <div className="space-y-6">
                            <h1
                                className={`text-4xl lg:text-5xl font-light text-[#C49A6C] leading-tight ${playFair.className}`}
                            >
                                What We Truly Do
                            </h1>

                            <div className="space-y-4 text-gray-600">
                                <p
                                    className={`text-lg font-light leading-relaxed ${mulish.className}`}
                                >
                                    At DONAI, gemstones are our identity. We
                                    specialise in natural, premium-grade gems
                                    sourced from around the world and evaluated
                                    under the strictest international labs. We
                                    are known for:
                                </p>

                                <p
                                    className={`text-lg font-light leading-relaxed ${mulish.className}`}
                                >
                                    • Loose Gemstones: Rubies, Sapphires,
                                    Emeralds, Spinels, Tourmalines & more
                                    <br></br>• Certified Inventory: GIA, IGI,
                                    and HRD-certified pieces <br></br>• B2B
                                    First: Serving jewellers, designers, and
                                    bulk buyers <br></br>• Limited Jewellery
                                    Offerings: Only 20% of our stock is
                                    converted into high-end jewellery — a
                                    reflection of what our gems deserve to
                                    become
                                </p>
                            </div>

                            <button
                                className={`mt-8 px-8 py-3 border border-gray-400 text-gray-700 font-light bg-transparent hover:bg-gray-100 transition-all duration-300 ${mulish.className}`}
                            >
                                SCHEDULE AN APPOINTMENT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <WhatSetUsApart />
            <FAQSection />
            <DianoBanner />
        </div>
    );
};

export default page;
