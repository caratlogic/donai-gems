import apiClient from "./axios";
import { Quotation } from "@/lib/validations/quotation-schema";
import { User } from "@/lib/validations/user-schema";

export interface QuotationData {
    // Assuming we link quote to a product
    carat: number;
    noOfPieces: number;
    quotePrice: number;
}

export interface QuotationResponse {
    message: string;
    quotation: Quotation[];
}

export interface AdminQuotation {
    userId: string;
    username: string;
    email: string;
    quotationCount: number;
    quotations: Quotation[];
}

export interface AllQuotationsResponse {
    message: string;
    data: {
        users: AdminQuotation[];
        summary: {
            totalUsers: number;
            totalQuotations: number;
        };
    };
}

export const quotationAPI = {
    /**
     * Submit a new quotation.
     */
    submitQuotation: async (
        data: QuotationData
    ): Promise<QuotationResponse> => {
        const response = await apiClient.post("/quotations", data);
        return response.data;
    },

    /**
     * Get all quotations for all users (Admin only).
     */
    getAllQuotations: async (): Promise<AllQuotationsResponse> => {
        const response = await apiClient.get("/quotations");
        return response.data;
    },

    /**
     * Approve a quotation (Admin only).
     */
    approveQuotation: async (
        quotationId: string
    ): Promise<{ message: string; quotation: Quotation }> => {
        const response = await apiClient.post(
            `/quotations/${quotationId}/approve`
        );
        return response.data;
    },

    /**
     * Reject a quotation (Admin only).
     */
    rejectQuotation: async (
        quotationId: string
    ): Promise<{ message: string; quotation: Quotation }> => {
        const response = await apiClient.post(
            `/quotations/${quotationId}/reject`
        );
        return response.data;
    },
};
