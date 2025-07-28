"use client";

import React, { useState, useEffect } from "react";
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
import { gemsApi } from "@/services/gems";

interface EditGemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    gem: Gem;
}

export function EditGemModal({
    isOpen,
    onClose,
    onSuccess,
    gem,
}: EditGemModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Update form values when gem prop changes
    useEffect(() => {
        if (gem && isOpen) {
            form.reset({
                stockId: gem.stockId,
                productType: gem.productType as any,
                category: gem.category,
                stoneType: gem.stoneType,
                color: gem.color,
                shape: gem.shape,
                carat: gem.carat,
                origin: gem.origin,
                treatment: gem.treatment,
                availability: gem.availability,
                certificate: gem.certificate,
                measurement: gem.measurement,
            });
        }
    }, [gem, isOpen, form]);

    const onSubmit = async (data: CreateGem) => {
        try {
            setIsSubmitting(true);

            const response = await gemsApi.updateGem(gem._id, data);

            if (response.success) {
                toast.success("Gem updated successfully!");
                onSuccess();
                onClose();
            } else {
                toast.error(response.message || "Failed to update gem");
            }
        } catch (error) {
            console.error("Error updating gem:", error);
            toast.error("Failed to update gem");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Gem</DialogTitle>
                    <DialogDescription>
                        Update the gem details below.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            {/* Stock ID */}
                            <FormField
                                control={form.control}
                                name="stockId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Stock ID *</FormLabel>
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
                                        <FormLabel>Product Type *</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
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
                                        <FormLabel>Category *</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
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
                                        <FormLabel>Stone Type *</FormLabel>
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
                                            onValueChange={field.onChange}
                                            value={field.value}
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
                                            onValueChange={field.onChange}
                                            value={field.value}
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
                                        <FormLabel>Carat Weight *</FormLabel>
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
                                                            e.target.value
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
                                        <FormLabel>Treatment *</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
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
                                                    Indication of heating (TE)
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
                                                    Treated to change the color
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
                                        <FormLabel>Certificate *</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
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
                                            Mark if this gem is available for
                                            sale
                                        </div>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
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
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {isSubmitting ? "Updating..." : "Update Gem"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
