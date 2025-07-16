"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Catgem1 from "../../assets/Catgem1.png";
import Catgem2 from "../../assets/Catgem2.png";
import Catgem3 from "../../assets/Catgem3.png";
import Catgem4 from "../../assets/Catgem4.png";
import Catgem5 from "../../assets/Catgem5.png";
import Catgem6 from "../../assets/Catgem6.png";
import { Open_Sans } from "next/font/google";
import {
    HiOutlineFilter,
    HiOutlineHeart,
    HiChevronDown,
    HiX,
} from "react-icons/hi";

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

// Sample jewelry data with imported images
const jewelryItems = [
    {
        id: 1,
        name: "Emerald Necklace",
        image: Catgem1,
        price: 25000,
        category: "necklace",
        isFavorite: false,
    },
    {
        id: 2,
        name: "Diamond Ring",
        image: Catgem2,
        price: 45000,
        category: "ring",
        isFavorite: false,
    },
    {
        id: 3,
        name: "Ruby Pendant",
        image: Catgem3,
        price: 38000,
        category: "pendant",
        isFavorite: false,
    },
    {
        id: 4,
        name: "Sapphire Earrings",
        image: Catgem4,
        price: 52000,
        category: "earrings",
        isFavorite: false,
    },
    {
        id: 5,
        name: "Gold Bracelet",
        image: Catgem5,
        price: 42000,
        category: "bracelet",
        isFavorite: false,
    },
    {
        id: 6,
        name: "Pearl Necklace",
        image: Catgem6,
        price: 48000,
        category: "necklace",
        isFavorite: false,
    },
];

// Dropdown options
const filterOptions = {
    price: ["$10,000", "$25,000", "$50,000", "$75,000", "$100,000+"],
    gender: ["Women", "Men", "Unisex"],
    material: ["Diamond", "Ruby", "Emerald", "Sapphire", "Gold", "Silver"],
    category: ["Rings", "Necklaces", "Bracelets", "Earrings", "Pendants"],
};

const sortOptions = [
    "Best Matches",
    "Price: Low to High",
    "Price: High to Low",
    "Newest First",
    "Oldest First",
];

const Page = () => {
    const [selectedFilters, setSelectedFilters] = useState<{
        [key: string]: string[];
    }>({
        price: [],
        gender: [],
        material: [],
        category: [],
    });
    const [sortBy, setSortBy] = useState("Best Matches");
    const [favorites, setFavorites] = useState<number[]>([]);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    const filterRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                filterRef.current &&
                !filterRef.current.contains(event.target as Node)
            ) {
                setShowFilterDropdown(false);
            }
            if (
                sortRef.current &&
                !sortRef.current.contains(event.target as Node)
            ) {
                setShowSortDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleFavorite = (itemId: number) => {
        setFavorites((prev) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId]
        );
    };

    const addFilter = (type: string, value: string) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [type]: prev[type].includes(value)
                ? prev[type].filter((item) => item !== value)
                : [...prev[type], value],
        }));
    };

    const removeFilter = (type: string, value: string) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [type]: prev[type].filter((item) => item !== value),
        }));
    };

    const getAllActiveFilters = () => {
        const active: { type: string; value: string }[] = [];
        Object.entries(selectedFilters).forEach(([type, values]) => {
            values.forEach((value) => {
                active.push({ type, value });
            });
        });
        return active;
    };

    return (
        <div className={`w-full min-h-screen bg-white ${openSans.className}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    {/* Left Filters */}
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Main Filter Dropdown */}
                        <div className="relative" ref={filterRef}>
                            <button
                                onClick={() =>
                                    setShowFilterDropdown(!showFilterDropdown)
                                }
                                className="h-10 px-7 py-2.5 rounded-full border border-black/40 flex items-center gap-2 hover:bg-gray-50 transition-colors"
                            >
                                <HiOutlineFilter className="w-5 h-5" />
                                <span className="text-[#2E2B28] text-base font-normal">
                                    Filter
                                </span>
                                <HiChevronDown
                                    className={`w-4 h-4 transition-transform ${
                                        showFilterDropdown ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {/* Filter Dropdown */}
                            {showFilterDropdown && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                    <div className="p-4 space-y-4">
                                        {Object.entries(filterOptions).map(
                                            ([type, options]) => (
                                                <div key={type}>
                                                    <h4 className="font-medium text-gray-700 mb-2 capitalize">
                                                        {type}
                                                    </h4>
                                                    <div className="space-y-1">
                                                        {options.map(
                                                            (option) => (
                                                                <label
                                                                    key={option}
                                                                    className="flex items-center space-x-2 cursor-pointer"
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedFilters[
                                                                            type
                                                                        ].includes(
                                                                            option
                                                                        )}
                                                                        onChange={() =>
                                                                            addFilter(
                                                                                type,
                                                                                option
                                                                            )
                                                                        }
                                                                        className="w-4 h-4 text-[#D6C5A0] border-gray-300 rounded focus:ring-[#D6C5A0]"
                                                                    />
                                                                    <span className="text-sm text-gray-700">
                                                                        {option}
                                                                    </span>
                                                                </label>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative" ref={sortRef}>
                        <button
                            onClick={() =>
                                setShowSortDropdown(!showSortDropdown)
                            }
                            className="h-10 px-3 py-2.5 rounded-full border border-black/40 flex items-center gap-2 hover:bg-gray-50 transition-colors"
                        >
                            <span className="text-[#2E2B28]/60 text-base font-normal">
                                Sort By:
                            </span>
                            <span className="text-[#2E2B28] text-base font-normal">
                                {sortBy}
                            </span>
                            <HiChevronDown
                                className={`w-4 h-4 transition-transform ${
                                    showSortDropdown ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {/* Sort Dropdown */}
                        {showSortDropdown && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                <div className="p-2">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setSortBy(option);
                                                setShowSortDropdown(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded hover:bg-gray-50 transition-colors ${
                                                sortBy === option
                                                    ? "bg-[#D6C5A0]/10 text-[#2E2B28]"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Active Filters */}
                {getAllActiveFilters().length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                        <span className="text-sm text-gray-600 font-medium">
                            Active Filters:
                        </span>
                        {getAllActiveFilters().map(({ type, value }, index) => (
                            <div
                                key={`${type}-${value}-${index}`}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-[#D6C5A0]/20 text-[#2E2B28] rounded-full text-sm"
                            >
                                <span className="capitalize text-xs text-gray-500">
                                    {type}:
                                </span>
                                <span>{value}</span>
                                <button
                                    onClick={() => removeFilter(type, value)}
                                    className="ml-1 hover:bg-[#D6C5A0]/30 rounded-full p-0.5 transition-colors"
                                >
                                    <HiX className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() =>
                                setSelectedFilters({
                                    price: [],
                                    gender: [],
                                    material: [],
                                    category: [],
                                })
                            }
                            className="text-sm text-red-600 hover:text-red-800 font-medium"
                        >
                            Clear All
                        </button>
                    </div>
                )}

                {/* Jewelry Grid - Responsive */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
                    {jewelryItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col items-center gap-4 lg:gap-6"
                        >
                            <div className="w-full max-w-96 aspect-square relative bg-gray-100 rounded-lg overflow-hidden group">
                                {/* Actual jewelry image */}
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />

                                {/* Heart Icon */}
                                <button
                                    onClick={() => toggleFavorite(item.id)}
                                    className="absolute top-3 right-3 lg:top-5 lg:right-5 w-6 h-6 bg-white/80 backdrop-blur-sm rounded-sm shadow-sm flex items-center justify-center hover:bg-white transition-colors z-10"
                                >
                                    <HiOutlineHeart
                                        className={`w-4 h-4 lg:w-5 lg:h-5 ${
                                            favorites.includes(item.id)
                                                ? "text-red-500 fill-red-500"
                                                : "text-black"
                                        }`}
                                    />
                                </button>
                            </div>

                            {/* Item Name */}
                            <h3 className="text-center text-black text-xl lg:text-2xl font-normal">
                                {item.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
