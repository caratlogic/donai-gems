"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RequestQuoteModal } from "@/components/modals/RequestQuoteModal";
import {
    Heart,
    Share2,
    Star,
    FileCheck2,
    Gem,
    Trash2,
    Eye,
    Video,
    FileText,
} from "lucide-react";
import { Gem as GemType } from "@/lib/validations/gems-Schema";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import GemImage from "../client/GemImage";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface ProductPageProps {
    productId: string;
}

interface FileUrls {
    images: string[];
    videos: string[];
    certificates: string[];
}

export function ProductPage({ productId }: ProductPageProps) {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [fileUrls, setFileUrls] = useState<FileUrls>({
        images: [],
        videos: [],
        certificates: [],
    });
    const [fileLoading, setFileLoading] = useState<Record<string, boolean>>({});
    const [previewFile, setPreviewFile] = useState<{
        url: string;
        type: string;
    } | null>(null);

    const { isAdmin } = useAuth();

    useEffect(() => {
        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    useEffect(() => {
        if (product && isAdmin) {
            fetchAllFiles();
        }
    }, [product, isAdmin]);

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

    const fetchAllFiles = async () => {
        if (!product?._id) return;

        const fileTypes = ["images", "videos", "certificates"] as const;

        for (const fileType of fileTypes) {
            try {
                setFileLoading((prev) => ({ ...prev, [fileType]: true }));

                const response = await axios.get(
                    `https://api-gems-inventory.onrender.com/api/gems/S3Bucket/${fileType}/${product._id}`
                );

                if (response.data.status === 200) {
                    const urls = response.data.data[`${fileType}Urls`] || [];
                    setFileUrls((prev) => ({
                        ...prev,
                        [fileType]: urls,
                    }));
                }
            } catch (error) {
                console.error(`Error fetching ${fileType}:`, error);
                // Don't show error toast for file fetching as it's expected that some gems might not have files
            } finally {
                setFileLoading((prev) => ({ ...prev, [fileType]: false }));
            }
        }
    };

    const deleteFile = async (fileType: string, fileUrl: string) => {
        if (!product?._id) return;

        try {
            const response = await axios.post(
                `https://api-gems-inventory.onrender.com/api/gems/S3Bucket/delete/${fileType}/${product._id}`,
                {
                    urls: [fileUrl],
                }
            );

            if (response.data.status === 200) {
                // Remove the deleted file from the state
                setFileUrls((prev) => ({
                    ...prev,
                    [fileType]: prev[fileType as keyof FileUrls].filter(
                        (url) => url !== fileUrl
                    ),
                }));
                toast.success(`${fileType.slice(0, -1)} deleted successfully`);
            } else {
                throw new Error(`Failed to delete ${fileType.slice(0, -1)}`);
            }
        } catch (error) {
            console.error(`Error deleting ${fileType}:`, error);
            toast.error(`Failed to delete ${fileType.slice(0, -1)}`);
        }
    };

    const openPreview = (url: string, type: string) => {
        setPreviewFile({ url, type });
    };

    const closePreview = () => {
        setPreviewFile(null);
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

    const renderFileList = (
        files: string[],
        fileType: string,
        icon: React.ReactNode
    ) => {
        return (
            <Card className="mt-4">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        {icon}
                        {fileType.charAt(0).toUpperCase() + fileType.slice(1)} (
                        {files.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {fileLoading[fileType] ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : files.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">
                            No {fileType} available
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {files.map((url, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        {icon}
                                        <span className="text-sm font-medium truncate max-w-[200px]">
                                            {fileType.slice(0, -1)} {index + 1}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                openPreview(url, fileType)
                                            }
                                            className="h-8 w-8 p-0"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() =>
                                                deleteFile(fileType, url)
                                            }
                                            className="h-8 w-8 p-0"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        );
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
                                className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg cursor-pointer "
                            >
                                <GemImage gem={product} index={index + 1} />
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

            {/* Admin File Management Panel */}
            {isAdmin && (
                <div className="mt-12">
                    <Separator className="mb-8" />
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Badge
                                variant="destructive"
                                className="bg-red-100 text-red-800"
                            >
                                ADMIN PANEL
                            </Badge>
                            <h3 className="text-2xl font-bold text-gray-900">
                                File Management
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                {renderFileList(
                                    fileUrls.images,
                                    "images",
                                    <Gem className="h-5 w-5 text-blue-500" />
                                )}
                            </div>
                            <div>
                                {renderFileList(
                                    fileUrls.videos,
                                    "videos",
                                    <Video className="h-5 w-5 text-green-500" />
                                )}
                            </div>
                            <div>
                                {renderFileList(
                                    fileUrls.certificates,
                                    "certificates",
                                    <FileText className="h-5 w-5 text-purple-500" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* File Preview Modal */}
            {previewFile && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={closePreview}
                >
                    <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
                        <button
                            onClick={closePreview}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-60"
                            aria-label="Close preview"
                        >
                            <span className="text-2xl">✕</span>
                        </button>

                        <div onClick={(e) => e.stopPropagation()}>
                            {previewFile.type === "images" && (
                                <Image
                                    src={previewFile.url}
                                    alt="Preview"
                                    width={800}
                                    height={800}
                                    className="object-contain w-full h-full max-w-full max-h-full"
                                />
                            )}
                            {previewFile.type === "videos" && (
                                <video
                                    src={previewFile.url}
                                    controls
                                    className="max-w-full max-h-full"
                                    style={{
                                        maxWidth: "800px",
                                        maxHeight: "600px",
                                    }}
                                />
                            )}
                            {previewFile.type === "certificates" && (
                                <iframe
                                    src={previewFile.url}
                                    className="w-full h-full border-0"
                                    style={{
                                        minWidth: "600px",
                                        minHeight: "800px",
                                    }}
                                    title="Certificate Preview"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}

            <RequestQuoteModal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
                productId={productId}
            />
        </div>
    );
}
