"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGemSchema, CreateGem, Gem } from "@/lib/validations/gems-Schema";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { gemsApi } from "@/services/gems";
import { FileUploader } from "@/components/ui/FileUploader";

interface AddGemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function AddGemModal({ isOpen, onClose, onSuccess }: AddGemModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createdGem, setCreatedGem] = useState<Gem | null>(null);

    const form = useForm<CreateGem>({
        resolver: zodResolver(createGemSchema),
        defaultValues: {
            stockId: "",
            productType: "Gem",
            category: "loose stone",
            stoneType: "",
            color: "red",
            shape: "oval",
            carat: 2,
            origin: "",
            treatment: "no heat",
            availability: true,
            certificate: "GIA",
            measurement: "",
        },
    });

    const onSubmit = async (data: CreateGem) => {
        try {
            setIsSubmitting(true);
            const response = await gemsApi.createGem(data);

            if (response.success) {
                toast.success(
                    "Step 1: Gem created successfully! Now upload files."
                );
                setCreatedGem(response.data); // Move to step 2
                onSuccess(); // Refresh the main table in the background
            } else {
                toast.error(response.message || "Failed to create gem");
            }
        } catch (error) {
            console.error("Error creating gem:", error);
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message ||
                        error.response?.data?.error ||
                        "Failed to create gem"
                );
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            form.reset();
            setCreatedGem(null); // Reset to step 1
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                {!createdGem ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>Add New Gem (Step 1 of 2)</DialogTitle>
                            <DialogDescription>
                                Fill in the details to add a new gem to the
                                inventory.
                            </DialogDescription>
                        </DialogHeader>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                {/* All your existing FormField components go here... */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Stock ID */}
                                    <FormField
                                        control={form.control}
                                        name="stockId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Stock ID *
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="GEM001"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Product Type */}
                                    <FormField
                                        control={form.control}
                                        name="productType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Product Type *
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select product type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="GEM">
                                                            GEM
                                                        </SelectItem>
                                                        <SelectItem value="Gem">
                                                            Gem
                                                        </SelectItem>
                                                        <SelectItem value="Jewelry">
                                                            Jewelry
                                                        </SelectItem>
                                                        <SelectItem value="jewelry">
                                                            jewelry
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Category */}
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Category *
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Necklace">
                                                            Necklace
                                                        </SelectItem>
                                                        <SelectItem value="Ring">
                                                            Ring
                                                        </SelectItem>
                                                        <SelectItem value="bracelet">
                                                            Bracelet
                                                        </SelectItem>
                                                        <SelectItem value="earrings">
                                                            Earrings
                                                        </SelectItem>
                                                        <SelectItem value="loose stone">
                                                            Loose Stone
                                                        </SelectItem>
                                                        <SelectItem value="ring">
                                                            ring
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Stone Type */}
                                    <FormField
                                        control={form.control}
                                        name="stoneType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Stone Type *
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Ruby, Sapphire, Emerald..."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Color */}
                                    <FormField
                                        control={form.control}
                                        name="color"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Color *</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select color" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Light Bleu">
                                                            Light Bleu
                                                        </SelectItem>
                                                        <SelectItem value="Orange Pink">
                                                            Orange Pink
                                                        </SelectItem>
                                                        <SelectItem value="bleu">
                                                            Bleu
                                                        </SelectItem>
                                                        <SelectItem value="bluish green">
                                                            Bluish Green
                                                        </SelectItem>
                                                        <SelectItem value="green">
                                                            Green
                                                        </SelectItem>
                                                        <SelectItem value="orange">
                                                            Orange
                                                        </SelectItem>
                                                        <SelectItem value="purple">
                                                            Purple
                                                        </SelectItem>
                                                        <SelectItem value="red">
                                                            Red
                                                        </SelectItem>
                                                        <SelectItem value="royal Bleu">
                                                            Royal Bleu
                                                        </SelectItem>
                                                        <SelectItem value="royal blue">
                                                            Royal Blue
                                                        </SelectItem>
                                                        <SelectItem value="violetish bleu">
                                                            Violetish Bleu
                                                        </SelectItem>
                                                        <SelectItem value="vivid green">
                                                            Vivid Green
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Shape */}
                                    <FormField
                                        control={form.control}
                                        name="shape"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Shape *</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select shape" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Oval">
                                                            Oval
                                                        </SelectItem>
                                                        <SelectItem value="antique cushion">
                                                            Antique Cushion
                                                        </SelectItem>
                                                        <SelectItem value="cushion">
                                                            Cushion
                                                        </SelectItem>
                                                        <SelectItem value="heart shape">
                                                            Heart Shape
                                                        </SelectItem>
                                                        <SelectItem value="octagonal">
                                                            Octagonal
                                                        </SelectItem>
                                                        <SelectItem value="oval">
                                                            oval
                                                        </SelectItem>
                                                        <SelectItem value="pear shape">
                                                            Pear Shape
                                                        </SelectItem>
                                                        <SelectItem value="rectangular">
                                                            Rectangular
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Carat */}
                                    <FormField
                                        control={form.control}
                                        name="carat"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Carat Weight *
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        min="2"
                                                        max="153.47"
                                                        placeholder="2.50"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                parseFloat(
                                                                    e.target
                                                                        .value
                                                                ) || 2
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Origin */}
                                    <FormField
                                        control={form.control}
                                        name="origin"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Origin *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Myanmar, Sri Lanka, Thailand..."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Treatment */}
                                    <FormField
                                        control={form.control}
                                        name="treatment"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Treatment *
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select treatment" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="CE(O) MINOR">
                                                            CE(O) MINOR
                                                        </SelectItem>
                                                        <SelectItem value="heated">
                                                            Heated
                                                        </SelectItem>
                                                        <SelectItem value="indication of heating (TE)">
                                                            Indication of
                                                            heating (TE)
                                                        </SelectItem>
                                                        <SelectItem value="may be">
                                                            May be
                                                        </SelectItem>
                                                        <SelectItem value="no heat">
                                                            No heat
                                                        </SelectItem>
                                                        <SelectItem value="no indication">
                                                            No indication
                                                        </SelectItem>
                                                        <SelectItem value="treated to change the color">
                                                            Treated to change
                                                            the color
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Certificate */}
                                    <FormField
                                        control={form.control}
                                        name="certificate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Certificate *
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select certificate" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="GIA">
                                                            GIA
                                                        </SelectItem>
                                                        <SelectItem value="GRS">
                                                            GRS
                                                        </SelectItem>
                                                        <SelectItem value="GUBELIN">
                                                            GUBELIN
                                                        </SelectItem>
                                                        <SelectItem value="SSEF">
                                                            SSEF
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Measurement - Full width */}
                                <FormField
                                    control={form.control}
                                    name="measurement"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Measurement *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="8.0x8.0x5.0mm"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Availability */}
                                <FormField
                                    control={form.control}
                                    name="availability"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">
                                                    Availability
                                                </FormLabel>
                                                <div className="text-sm text-muted-foreground">
                                                    Mark if this gem is
                                                    available for sale
                                                </div>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleClose}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        {isSubmitting
                                            ? "Creating..."
                                            : "Create and Continue"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>
                                Upload Files for {createdGem.stockId} (Step 2 of
                                2)
                            </DialogTitle>
                            <DialogDescription>
                                Upload images, videos, and certificates for the
                                new gem.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                            <FileUploader
                                fileType="images"
                                stockId={createdGem._id}
                                onUploadSuccess={onSuccess}
                            />
                            <FileUploader
                                fileType="videos"
                                stockId={createdGem._id}
                                onUploadSuccess={onSuccess}
                            />
                            <FileUploader
                                fileType="certificates"
                                stockId={createdGem._id}
                                onUploadSuccess={onSuccess}
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="default"
                                onClick={handleClose}
                            >
                                Finish
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
