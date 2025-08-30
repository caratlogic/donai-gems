import type { Metadata } from "next";
import {
    Geist,
    Geist_Mono,
    Playfair_Display,
    Open_Sans,
} from "next/font/google";
import {} from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import Footer from "../components/landing/footer/Footer";
import Navbar from "../components/landing/header/Navbar";
import FooterSection from "@/components/newHome/FooterSection";

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
    variable: "--font-openSans",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "DONAI Gems - Premium Natural Gemstones & Luxury Jewelry | Antwerp",
    description:
        "Discover the world's finest natural gemstones at DONAI Gems, Antwerp's premier gemstone dealer. Certified rubies, emeralds, sapphires, and custom luxury jewelry. Trusted by jewelers worldwide since decades.",
    keywords:
        "natural gemstones, certified gems, luxury jewelry, Antwerp diamonds, rubies, emeralds, sapphires, custom jewelry, GIA certified, IGI certified, gemstone dealer, precious stones",
    authors: [{ name: "DONAI Gems" }],
    creator: "DONAI Gems",
    publisher: "DONAI Gems",
    openGraph: {
        title: "DONAI Gems - Premium Natural Gemstones & Luxury Jewelry",
        description:
            "Antwerp's premier source for high-grade natural gemstones. Certified precious stones trusted by global jewelers and collectors.",
        url: "https://donaigems.com",
        siteName: "DONAI Gems",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "DONAI Gems - Premium Natural Gemstones",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "DONAI Gems - Premium Natural Gemstones",
        description:
            "Discover the world's finest certified gemstones from Antwerp's Diamond Street",
        images: ["/twitter-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "your-google-verification-code",
        yandex: "your-yandex-verification-code",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`m-0 p-0  ${openSans.variable} ${playfair.variable} antialiased`}
            >
                <AuthProvider>
                    <Navbar />
                    {children}

                    <FooterSection />
                    <Toaster />
                </AuthProvider>
            </body>
        </html>
    );
}
