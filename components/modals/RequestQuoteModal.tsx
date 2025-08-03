"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { quotationAPI, QuotationData } from "@/services/quotation-api";

interface RequestQuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId?: string;
}

export function RequestQuoteModal({
    isOpen,
    onClose,
    productId,
}: RequestQuoteModalProps) {
    const [formData, setFormData] = useState({
        carat: "",
        noOfPieces: "",
        quotePrice: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const quoteData: QuotationData = {
            carat: parseFloat(formData.carat),
            noOfPieces: parseInt(formData.noOfPieces, 10),
            quotePrice: parseFloat(formData.quotePrice),
        };

        if (
            isNaN(quoteData.carat) ||
            isNaN(quoteData.noOfPieces) ||
            isNaN(quoteData.quotePrice)
        ) {
            setError("Please enter valid numbers.");
            setIsLoading(false);
            return;
        }

        try {
            await quotationAPI.submitQuotation(quoteData);
            toast("Your quotation has been submitted successfully.");
            onClose();
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message ||
                "Failed to submit quotation. Please try again.";
            setError(errorMessage);
            toast(`${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Request a Quote</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to submit your quotation.
                        We'll get back to you shortly.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="carat" className="text-right">
                                Carat
                            </Label>
                            <Input
                                id="carat"
                                name="carat"
                                type="number"
                                value={formData.carat}
                                onChange={handleInputChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="noOfPieces" className="text-right">
                                Pieces
                            </Label>
                            <Input
                                id="noOfPieces"
                                name="noOfPieces"
                                type="number"
                                value={formData.noOfPieces}
                                onChange={handleInputChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quotePrice" className="text-right">
                                Quote Price ($)
                            </Label>
                            <Input
                                id="quotePrice"
                                name="quotePrice"
                                type="number"
                                value={formData.quotePrice}
                                onChange={handleInputChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        {error && (
                            <p className="col-span-4 text-red-500 text-sm text-center">
                                {error}
                            </p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Submitting..." : "Submit Quote"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
