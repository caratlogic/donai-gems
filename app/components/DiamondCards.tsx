
// import { useState } from "react";
import Image from "next/image";
import React from "react";
import cert1 from "../assets/cert1.jpg";
// import cert2 from "../assets/cert2.jpg";
// import cert3 from "../assets/cert3.jpg";
import { Playfair_Display, Open_Sans } from "next/font/google";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

// Certificate data array
// const certificateData = [
//     {
//         id: 1,
//         image: cert1,
//         title: "GIA CERTIFICATE",
//         description:
//             "When purchasing a gems, we pay close attention to its grading. The grading certificate serves as the gems identity card and to a...",
//         alt: "GIA Certificate",
//     },
//     {
//         id: 2,
//         image: cert2,
//         title: "IGI-CERTIFICATE",
//         description:
//             "The most authoritative gems grading institution in the world is the Gemological Institute of America (GIA). In addition to GIA, there are...",
//         alt: "IGI Certificate",
//     },
//     {
//         id: 3,
//         image: cert3,
//         title: "HRD-CERTIFICATE",
//         description:
//             "The HRD certificate is a gems grade certificate issued by the Belgian Gems High Council. What is the Belgian Gems High Council? As...",
//         alt: "HRD Certificate",
//     },
// ];

const DiamondCards = () => {
    // const [isSwapped, setIsSwapped] = useState(false);

    return (
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 bg-[#FAF8F2] mt-20 lg:mt-30">
        {/* <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-560 left-10" />
  <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-590 left-160" />
  <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-650 left-60" /> */}
        {/* Info Section */}
        <div className="max-w-xl mx-auto mt-20 text-center md:text-left">
            <h1
                className={`${playfair.className} text-[#2E2B28] text-5xl text-center md:text-left`}
                style={{
                    background:
                        "linear-gradient(to right, #D6BFA6, #8B6C4A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                Certified by the World’s Finest Gem Labs
            </h1>
            <p
                className={`${openSans.className} text-xl text-[#2E2B28CC] font-light mt-8 mb-8 text-center md:text-left`}
            >
                Every gemstone is accompanied by certifications from globally recognised laboratories, including GIA, SSEF, GRS, HRD, and Gübelin, ensuring authenticity and quality.
            </p>
            <p
                className={`${openSans.className} text-xl text-[#2E2B28CC] font-light mt-8 mb-8 text-center md:text-left`}
            >
                Evaluated under rigorous industry standards in Antwerp, the heart of the gem trade, our gems meet the highest benchmarks of excellence.
            </p>
        </div>

        {/* Image Section */}
        <div className="flex items-center justify-center">
            <Image
                src={cert1}
                alt="Commitment Gem"
                width={500}
                height={500}
                className="h-full"
            />
        </div>
    </div>
    );
};

export default DiamondCards;
