"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { gemsApi } from "@/services/gems";
import { Gem } from "@/lib/validations/gems-Schema";

interface GemImageProps {
    gem: Gem;
}

const GemImage = ({ gem }: GemImageProps) => {
    const [imageUrl, setImageUrl] = useState<string | "">(
        "/semiPreciousFeature.jpg"
    );
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchImageUrl = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await gemsApi.getFilesForGem(
                    "images",
                    gem._id
                );

                console.log("Full response for gem", gem._id, ":", response);

                if (isMounted) {
                    // Check if response has the expected structure
                    if (
                        response?.data?.imagesUrls &&
                        Array.isArray(response.data.imagesUrls)
                    ) {
                        const urls = response.data.imagesUrls;
                        console.log(
                            "Found",
                            urls.length,
                            "URLs for gem",
                            gem._id
                        );

                        if (urls.length > 0) {
                            const firstUrl = urls[0];
                            console.log("Using URL:", firstUrl);
                            setImageUrl(firstUrl);
                        } else {
                            console.log("No URLs found, using fallback");
                            setImageUrl("/semiPreciousFeature.jpg");
                        }
                    } else {
                        console.log("Unexpected response structure:", response);
                        setImageUrl("/semiPreciousFeature.jpg");
                    }
                }
            } catch (error) {
                console.error(
                    "Failed to fetch gem image for",
                    gem._id,
                    ":",
                    error
                );
                setError(
                    error instanceof Error ? error.message : "Unknown error"
                );
                if (isMounted) {
                    setImageUrl("/semiPreciousFeature.jpg");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchImageUrl();

        return () => {
            isMounted = false;
        };
    }, [gem._id]);

    if (isLoading) {
        return <div className="w-full h-full bg-gray-200 animate-pulse" />;
    }

    if (error) {
        console.warn("Image error for gem", gem._id, ":", error);
    }

    return (
        <Image
            src={imageUrl}
            alt={`${gem.stoneType} Gem`}
            width={300}
            height={300}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
                console.error(
                    "Image failed to load:",
                    imageUrl,
                    "for gem:",
                    gem._id
                );
                setImageUrl("/semiPreciousFeature.jpg");
            }}
            onLoad={() => {
                console.log(
                    "Image loaded successfully:",
                    imageUrl,
                    "for gem:",
                    gem._id
                );
            }}
        />
    );
};

export default GemImage;
