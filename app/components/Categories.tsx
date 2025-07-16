import React from "react";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
// import StarIcon from "../assets/star.png";
import fig1 from "../assets/fig1.jpg";
import fig2 from "../assets/fig2.jpg";
import fig3 from "../assets/fig3.jpg";
import fig4 from "../assets/fig4.jpg";

const playFair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Gems = [
  {
    src: fig1,
    alt: "GEM 4",
    desc: "Ruby Gemstone",
  },
  {
    src: fig2,
    alt: "GEM 5",
    desc: "Emerald",
  },
  {
    src: fig3,
    alt: "GE4 6",
    desc: "Sapphire",
  },
  {
    src: fig4,
    alt: "GEM 7",
    desc: "Semi Precious",
  },
];

const Categories = () => {
  return (
    <div className="max-w-5xl mx-auto mt-25 w-full">
      <h1
        className={`py-10 ${playFair.className} text-center text-4xl`}
        style={{
          background: "linear-gradient(to right, #FFDCBB, #54330C)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Explore by Stylish Jewels{" "}
      </h1>
      <div className="flex flex-col md:flex-row items-center">
      <Image src="Arrow1.svg" alt="Arrow" width={30} height={30} className="mb-18 cursor-pointer" />
        {Gems.map((gem, index) => (
          <div key={index} className="w-1/2 mb-10 px-5">
            <div className="overflow-hidden rounded-lg relative cursor-pointer group">
              <div className="relative">
                <Image
                  src={gem.src}
                  alt={gem.alt}
                  width={300}
                  height={300}
                  className="w-full object-cover transition-all duration-300 ease-out 
                                    group-hover:scale-105 group-hover:shadow-lg"
                />
                {/* Overlay that appears on hover */}
                {/* <div
                                    className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 
                                    transition-opacity duration-300 flex items-center justify-center"
                                >
                                    <a
                                        href="/categories/all-jewelry"
                                        className="text-white font-medium px-4 py-2 bg-black/30 rounded-md 
                                        translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                                    >
                                        View Collection
                                    </a>
                                </div> */}
              </div>
            </div>
            <p className="text-center mt-4 text-xl text-[#000000] group-hover:text-[#54330C] transition-colors duration-300">
              {gem.desc}
            </p>
            
          </div>
          
        ))}
        <Image src="Arrow2.svg" alt="Arrow" width={30} height={30} className="mb-18 cursor-pointer" />
      </div>
      <div className="flex flex-row justify-center">
          <button className="border px-4 py-1 border-[#2E2B28] font-light hover:bg-[#2E2B28] hover:text-white transition-all duration-300 cursor-pointer">VIEW ALL STYLES</button>
        </div>
    </div>
  );
};

export default Categories;
