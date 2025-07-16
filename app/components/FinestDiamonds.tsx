import React from "react";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import gem1 from "../assets/gem1.jpg";
import gem2 from "../assets/gem2.jpg";
import gem3 from "../assets/gem3.jpg";
import gem4 from "../assets/gem4.jpg";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const Gems = [
    {
        src1: gem1,
        alt: "GEM 4",
        title: "Emerald Collection",
    },
    {
        src1: gem2,
        alt: "GEM 5",
        title: "Diamond Series",
    },
    {
        src1: gem3,
        alt: "GEM 6",
        title: "Ruby Selection",
    },
    {
        src1: gem4,
        alt: "GEM 7",
        title: "Sapphire Line",
    },
];

const Collections = () => {
    return (
        <div className="max-w-7xl mx-auto mt-25 w-full bg-[#FAF8F2] ">
            <h1
                className={`py-10 ${playFair.className} text-center text-4xl`}
                style={{
                    background: "linear-gradient(to right, #FFDCBB, #54330C)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                Finest Gems Across The City
            </h1>

                

            <div className="flex flex-col md:flex-row items-center">
            <Image src="Arrow1.svg" alt="Arrow" width={30} height={30} className="ml-2 mb-8 cursor-pointer" />
                {Gems.map((gem, index) => (
                    <div key={index} className="w-1/2 mb-10 px-5">
                        <div className="relative overflow-hidden rounded-lg group cursor-pointer">
                            <Image
                                src={gem.src1}
                                alt={gem.alt}
                                width={300}
                                height={300}
                                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    </div>
                ))}
                <Image src="Arrow2.svg" alt="Arrow" width={30} height={30} className="mr-2 mb-8 cursor-pointer" />
            </div>

            <div className="flex justify-center mt-5">
                <button className="border border-[#C49A6C] text-[#C49A6C] font-light hover:bg-[#C49A6C] hover:text-[#FFFFFF] duration-300 px-6 py-1 mb-10">
                BROWSE MASTERPIECES
                </button>
            </div>
        </div>
    );
};

export default Collections;
