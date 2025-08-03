"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RequestQuoteModal } from "@/components/modals/RequestQuoteModal";
import { Heart, Share2, Star, FileCheck2, Gem } from "lucide-react";
import { Gem as GemType } from "@/lib/validations/gems-Schema";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import GemImage from "../client/GemImage";

export interface ProductPageProps {
    productId: string;
}

export function ProductPage({ productId }: ProductPageProps) {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    useEffect(() => {
        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            setError(null);

            // Using search endpoint with stockId filter
            const response = await axios.get(
                `https://api-gems-inventory.onrender.com/api/gems/search?stockId=${productId}&limit=1`
            );

            if (response.data.success && response.data.data.length > 0) {
                setProduct(response.data.data[0]);
            } else {
                setError("Product not found");
            }
        } catch (err) {
            console.error("Error fetching product:", err);
            setError("Failed to load product details");
        } finally {
            setLoading(false);
        }
    };

    const getProductDescription = (product: GemType) => {
        if (product.productType.toLowerCase().includes("gem")) {
            return `A timeless symbol of love and passion, this elegant ${product.stoneType.toLowerCase()} features a vivid ${product.shape.toLowerCase()}-cut natural ${product.stoneType.toLowerCase()} flanked by brilliant details. Set with striking contrast, and mounted with a high-polish finish. Perfect for engagements, anniversaries, or meaningful milestones — classic, romantic, and unforgettable.`;
        } else {
            return `An exquisite piece of fine jewelry featuring premium ${product.stoneType.toLowerCase()} craftsmanship. This stunning ${product.category.toLowerCase()} showcases exceptional artistry with its ${product.shape.toLowerCase()} design and ${product.color.toLowerCase()} finish. Crafted with attention to detail and quality, making it perfect for special occasions or as a treasured addition to any jewelry collection.`;
        }
    };

    const handleFavoriteToggle = () => {
        // TODO: Implement favorite functionality with backend
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `${product?.stoneType} - ${product?.stockId}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <Skeleton className="aspect-square w-full rounded-lg" />
                        <div className="grid grid-cols-4 gap-2">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton
                                    key={i}
                                    className="aspect-square rounded-lg"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-12 w-1/2" />
                        <Skeleton className="h-20 w-full" />
                        <div className="space-y-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="h-6 w-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <Alert variant="destructive">
                    <AlertDescription>
                        {error || "Product not found"}
                        <Button
                            onClick={fetchProduct}
                            variant="outline"
                            size="sm"
                            className="ml-4"
                        >
                            Retry
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                        {/* Main product image placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <GemImage gem={product} />
                        </div>

                        {/* Action buttons */}
                        <div className="absolute top-4 right-4 flex gap-2">
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={handleShare}
                                className="bg-white/80 hover:bg-white"
                            >
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Thumbnail images */}
                    <div className="grid grid-cols-4 gap-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            >
                                <div className="h-full flex items-center justify-center">
                                    <Gem className="w-6 h-6 text-[#C49A6C]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge
                                variant="outline"
                                className="text-[#C49A6C] border-[#C49A6C]"
                            >
                                {product.productType}
                            </Badge>
                            <Badge variant="outline">{product.category}</Badge>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Center Stone
                        </h1>
                        <h2 className="text-4xl font-light text-gray-800 mb-4">
                            Natural {product.stoneType}
                        </h2>

                        {/* Stock ID */}
                        <p className="text-sm text-gray-600">
                            Stock ID:{" "}
                            <span className="font-medium">
                                {product.stockId}
                            </span>
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <p className="text-gray-600 leading-relaxed">
                            {getProductDescription(product)}
                        </p>
                    </div>

                    {/* Specifications */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Cut:</span>
                                    <span className="font-medium">
                                        {product.shape}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Color:
                                    </span>
                                    <span className="font-medium">
                                        {product.color}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Carat:
                                    </span>
                                    <span className="font-medium text-[#C49A6C]">
                                        {product.carat} ct
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Origin:
                                    </span>
                                    <span className="font-medium">
                                        {product.origin}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Treatment:
                                    </span>
                                    <span className="font-medium">
                                        {product.treatment}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Certificate:
                                    </span>
                                    <span className="font-medium">
                                        {product.certificate}
                                    </span>
                                </div>
                                <div className="flex justify-start gap-5 sm:col-span-2">
                                    <span className="text-gray-600">
                                        Measurement:
                                    </span>
                                    <span className="font-medium">
                                        {product.measurement}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <Button
                                className="flex-1 bg-[#C49A6C] hover:bg-[#B8956A] text-white"
                                size="lg"
                                onClick={() => setIsQuoteModalOpen(true)}
                            >
                                Request Quote
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 border-[#C49A6C] text-[#C49A6C] hover:bg-[#C49A6C] hover:text-white"
                                size="lg"
                            >
                                Contact Us
                            </Button>
                        </div>

                        {/* Availability Status */}
                        <div className="flex items-center justify-center">
                            <Badge
                                variant={
                                    product.availability
                                        ? "default"
                                        : "secondary"
                                }
                                className={`${
                                    product.availability
                                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                                        : "bg-red-100 text-red-800 hover:bg-red-200"
                                }`}
                            >
                                {product.availability
                                    ? "Available"
                                    : "Sold Out"}
                            </Badge>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="text-center text-sm text-gray-500 space-y-1">
                        <p>✓ Certified by {product.certificate}</p>
                        <p>✓ Ethically sourced from {product.origin}</p>
                        <p>✓ Professional grading and authentication</p>
                    </div>
                </div>
            </div>
            <RequestQuoteModal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
                productId={productId}
            />
        </div>
    );
}
