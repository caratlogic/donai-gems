"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Jost } from "next/font/google";
import ReactLenis from "lenis/react";
import { useRouter } from "next/navigation";
interface Section {
    title: string;
    content: string;
    image: string;
    align: "left" | "right";
}

const jost = Jost({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});
const page = () => {
    const sections: Section[] = [
        {
            title: "Emeralds in Belgium: Timeless Green Treasures",
            content:
                "Emeralds, celebrated for their rich green hues, have been treasured since ancient times as symbols of harmony, renewal, and prosperity. As members of the beryl family, emeralds rank among the worlds most iconic gemstones. At Donai Gems, we offer finely sourced emeralds in Belgium, handpicked for their brilliance, clarity, and rarity. These collectible green gemstones are perfect for bespoke jewellery, heirloom pieces, or sophisticated collector displays",
            image: "/images/Emerald.jpg",
            align: "right",
        },
        {
            title: "Rubies in Belgium: The King of Gems",
            content:
                "Rubies, with their fiery red tones, are prized as symbols of passion, protection, and vitality. Belonging to the corundum family, rubies are admired worldwide for their hardness, vivid color, and historical significance. At Donai Gems, we present a curated selection of premium rubies in Belgium, showcasing authentic red gemstones ideal for fine jewellery, heirloom-quality rings, and investment collections.",
            image: "/images/Ruby.jpg",
            align: "left",
        },
        {
            title: "Sapphires in Belgium: Elegance in Every Hue",
            content:
                "Sapphires, famous for their exceptional durability and stunning spectrum of colors, are among the most sought-after premium gemstones in Belgium. Beyond the classic deep blue, sapphires appear in pink, yellow, and even rare green varieties. These artisan-crafted gemstones blend timeless elegance with European craftsmanship, making them a favourite for bespoke necklaces, rings, and collectible jewellery.",
            image: "/images/sapphire.jpg",
            align: "right",
        },
        {
            title: "Semi-Precious Gems in Belgium: Diversity and Beauty",
            content:
                'Semi-precious gemstones provide endless variety and creativity for collectors and jewellery enthusiasts. While traditionally more abundant than the "Big Four," stones like amethyst, citrine, garnet, and topaz rival precious gems in beauty and character. At Donai Gems, we source high-quality semi-precious stones in Belgium, celebrating their color, patterns, and durability. Each piece in our rare semi-precious collection is perfect for custom jewellery or unique heirloom-quality creations.',
            image: "/images/semi-precious.jpg",
            align: "left",
        },
    ];
    const router = useRouter();
    return (
        <div>
            <ReactLenis />

            <section>
                <div className="relative w-full h-64 md:h-80 lg:h-70 overflow-hidden">
                    <Image
                        src="/images/bannerForGem.png"
                        alt="Banner background"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/40 "></div>
                    <div className="relative  flex items-center justify-center h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <h1
                                className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-4 font-playfair`}
                            >
                                Gems Knowledge
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section>
                <div className=" py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16 bg-gradient-to-r from-[#fff5ec] to-[#fff5ec]">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 md:gap-12 lg:gap-20 xl:gap-24">
                            <div className="w-full lg:w-5/12 relative mb-16 sm:mb-20 md:mb-24 lg:mb-0 mr-5">
                                {/* Main Image - Animated */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm">
                                        <img
                                            src="/images/about2.jpg"
                                            alt="Colorful gemstones"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    className="absolute bottom-[-40px] right-[-40px] sm:bottom-[-50px] sm:right-[-50px] md:bottom-[-60px] md:right-[-60px] lg:right-[-80px] w-[45%] sm:w-[48%] md:w-[50%] aspect-square"
                                >
                                    <div className="relative w-full h-full overflow-hidden shadow-2xl rounded-sm">
                                        <img
                                            src="/images/about.png"
                                            alt="Sapphire ring"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right Side - Content */}
                            <div className="w-full lg:w-7/12 mt-0 lg:mt-0">
                                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.1,
                                        }}
                                        viewport={{ once: true, amount: 0.5 }}
                                    >
                                        <p
                                            className={`text-xs sm:text-sm font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-gray-600 uppercase font-playfair`}
                                        >
                                            About Us
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.3,
                                        }}
                                        viewport={{ once: true, amount: 0.5 }}
                                    >
                                        <h2
                                            className={`text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-normal leading-tight text-gray-900 font-playfair`}
                                        >
                                            Crafting Timeless Elegance With
                                            Passion
                                        </h2>
                                    </motion.div>

                                    <div
                                        className={`space-y-4 sm:space-y-5 text-[#606060] leading-relaxed font-normal font-`}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 0.4,
                                            }}
                                            viewport={{
                                                once: true,
                                                amount: 0.5,
                                            }}
                                        >
                                            <p className="text-sm sm:text-base md:text-base">
                                                At Donai Gems, we are more than
                                                a jewellery house — we are
                                                artisans of beauty, passion, and
                                                timeless craftsmanship. Nestled
                                                in the historic heart of
                                                Belgium, the world's gemstone
                                                capital, we dedicate ourselves
                                                to sourcing the rarest and most
                                                brilliant treasures, offering
                                                clients access to Premium Gems
                                                in Belgium that embody elegance
                                                and distinction.
                                            </p>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 0.5,
                                            }}
                                            viewport={{
                                                once: true,
                                                amount: 0.5,
                                            }}
                                        >
                                            <p className="text-sm sm:text-base md:text-base">
                                                Each gemstone — from radiant
                                                rubies and sapphires to
                                                exquisite emeralds and timeless
                                                diamonds — is carefully chosen
                                                for its integrity, rarity, and
                                                brilliance. Our commitment
                                                ensures that every client
                                                receives creations of unmatched
                                                quality and authenticity. With
                                                every piece, our master
                                                jewellers unite European
                                                craftsmanship with modern
                                                sophistication, transforming
                                                nature's wonders into
                                                extraordinary works of art.
                                            </p>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 0.6,
                                            }}
                                            viewport={{
                                                once: true,
                                                amount: 0.5,
                                            }}
                                        >
                                            <p className="text-sm sm:text-base md:text-base">
                                                Our philosophy is rooted in
                                                crafting jewellery that
                                                transcends fleeting trends,
                                                celebrating individuality, love,
                                                and legacy. Every creation,
                                                whether a bespoke ring or a
                                                statement necklace, is designed
                                                to be more than adornment — it
                                                is destined to become a
                                                cherished heirloom, carrying
                                                stories across generations.
                                            </p>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 0.7,
                                            }}
                                            viewport={{
                                                once: true,
                                                amount: 0.5,
                                            }}
                                        >
                                            <p className="text-sm sm:text-base md:text-base">
                                                At Donai Gems, artistry,
                                                authenticity, and heritage
                                                converge to deliver luxury
                                                gemstones in Belgium that
                                                inspire, captivate, and endure.
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#A68A6A] px-6 py-16 md:py-24">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <p className="font-openSans text-white text-sm md:text-base tracking-[0.2em] uppercase mb-4 font-medium">
                            Why Choose Donai Gems for Your Gemstone Collection
                        </p>
                        <h2
                            className={`text-white text-4xl md:text-5xl lg:text-6xl font-normal leading-tight font-playfair`}
                        >
                            Experience the Donai Difference
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 lg:gap-y-16">
                        {/* Exceptional Quality */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <h3
                                className={`text-white text-xl md:text-2xl font-normal mb-4 font-playfair`}
                            >
                                Exceptional Quality
                            </h3>
                            <p className="font-openSans text-white/90 text-sm md:text-base leading-relaxed font-light">
                                Every gemstone is handpicked for brilliance,
                                rarity, and integrity, ensuring that our clients
                                receive nothing but the highest quality
                                creations.
                            </p>
                        </motion.div>
                        {/* Master Craftsmanship */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <h3
                                className={`text-white text-xl md:text-2xl font-normal mb-4 font-playfair`}
                            >
                                Master Craftsmanship
                            </h3>
                            <p className="font-openSans text-white/90 text-sm md:text-base leading-relaxed font-light">
                                Our skilled artisans combine traditional
                                techniques with modern design to create jewelry
                                that reflects artistry and authenticity.
                            </p>
                        </motion.div>
                        {/* Timeless Design */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <h3
                                className={`text-white text-xl md:text-2xl font-normal mb-4 font-playfair`}
                            >
                                Timeless Design
                            </h3>
                            <p className="font-openSans text-white/90 text-sm md:text-base leading-relaxed font-light">
                                We craft pieces that transcend trends, blending
                                elegance with sophistication to be cherished
                                across generations.
                            </p>
                        </motion.div>
                        {/* Personalized Creations */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <h3
                                className={`text-white text-xl md:text-2xl font-normal mb-4 font-playfair`}
                            >
                                Personalized Creations
                            </h3>
                            <p className="font-openSans text-white/90 text-sm md:text-base leading-relaxed font-light">
                                From bespoke jewels to unique statement pieces,
                                we design jewelry tailored to your individual
                                taste and story.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <h3
                                className={`text-white text-xl md:text-2xl font-normal mb-4 font-playfair`}
                            >
                                Heritage & Legacy
                            </h3>
                            <p className="font-openSans text-white/90 text-sm md:text-base leading-relaxed font-light">
                                Rooted in Antwerp's rich history of fine
                                jewelry, our pieces carry the legacy of European
                                craftsmanship to you.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <h3
                                className={`text-white text-xl md:text-2xl font-normal mb-4 font-playfair`}
                            >
                                Passion & Integrity
                            </h3>
                            <p className="font-openSans text-white/90 text-sm md:text-base leading-relaxed font-light">
                                We operate with a deep respect for nature's
                                treasures, ensuring ethical sourcing and genuine
                                care in every creation.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section>
                <div className="">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className=" flex items-center bg-gradient-to-r from-orange-50 to-gray-100"
                        >
                            <div className="w-full">
                                <div
                                    className={`flex flex-col ${
                                        section.align === "left"
                                            ? "lg:flex-row-reverse"
                                            : "lg:flex-row"
                                    } items-stretch lg:items-center`}
                                >
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            x:
                                                section.align === "left"
                                                    ? 100
                                                    : -100,
                                        }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16  "
                                    >
                                        <div className="max-w-xl w-full">
                                            <h2
                                                className={`text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-normal leading-tight mb-4 sm:mb-5 md:mb-6 text-gray-800 font-playfair`}
                                            >
                                                {section.title}
                                            </h2>
                                            <p
                                                className={`text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-7 md:mb-8 text-gray-800 font-normal ${jost.className}`}
                                            >
                                                {section.content}
                                            </p>
                                            <button
                                                className={`text-white cursor-pointer px-6 sm:px-8 py-2.5 sm:py-3 transition-all duration-300 font-medium uppercase text-xs sm:text-sm hover:opacity-90 hover:shadow-2xl w-full sm:w-auto ${jost.className} mb-1 `}
                                                style={{
                                                    background: "#aa8765",
                                                }}
                                                onClick={() =>
                                                    router.push("/gemstones")
                                                }
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            x:
                                                section.align === "left"
                                                    ? -100
                                                    : 100,
                                        }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        className="w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-auto"
                                    >
                                        <div className="relative w-full h-full">
                                            <img
                                                src={section.image}
                                                alt={section.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default page;
