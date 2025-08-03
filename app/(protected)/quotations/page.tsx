"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { quotationAPI, AdminQuotation } from "@/services/quotation-api";
import { Quotation } from "@/lib/validations/quotation-schema";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, RefreshCw, Eye } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Container from "@/components/ui/container";
import { toast } from "sonner";
import { AdminGuard } from "@/components/guards/AdminGuard";

type TabType = "pending" | "approved" | "rejected";

const QuotationsPageContent = () => {
    const { user, isAdmin, loading: authLoading } = useAuth();

    // Admin state
    const [adminQuotations, setAdminQuotations] = useState<AdminQuotation[]>(
        []
    );
    const [activeTab, setActiveTab] = useState<TabType>("pending");

    // Common state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const fetchQuotations = useCallback(async () => {
        if (!isAdmin) return;
        setLoading(true);
        setError(null);
        try {
            const response = await quotationAPI.getAllQuotations();
            setAdminQuotations(response.data.users);
            console.log("Fetched quotations:", response.data.users);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    }, [isAdmin]);

    useEffect(() => {
        if (!authLoading) {
            fetchQuotations();
        }
    }, [authLoading, fetchQuotations]);

    const handleAction = async (
        quotationId: string,
        action: "approve" | "reject"
    ) => {
        setActionLoading(quotationId);
        try {
            if (action === "approve") {
                console.log("Approving quotation:", quotationId);
                await quotationAPI.approveQuotation(quotationId);
                toast("Quotation approved.");
            } else {
                // For simplicity, using a prompt. A modal form would be better for UX.

                await quotationAPI.rejectQuotation(quotationId);
                toast("Quotation rejected.");
            }
            fetchQuotations(); // Refetch to update the list
        } catch (err: any) {
            toast(
                err.response?.data?.message || `Failed to ${action} quotation.`
            );
        } finally {
            setActionLoading(null);
        }
    };

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    const getFilteredQuotations = () => {
        const allQuotes = adminQuotations.flatMap((user) =>
            user.quotations.map((q) => ({
                ...q,
                username: user.username,
                email: user.email,
            }))
        );
        console.log("All quotations:", allQuotes);

        switch (activeTab) {
            case "approved":
                return allQuotes.filter((q) => q.status === "APPROVED");
            case "rejected":
                return allQuotes.filter((q) => q.status === "REJECTED");
            case "pending":
            default:
                return allQuotes.filter((q) => q.status === "PENDING");
        }
    };

    if (authLoading || loading) {
        return <div className="text-center p-12">Loading...</div>;
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    const filtered = getFilteredQuotations();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Quotations Management</h1>
                <Button
                    onClick={fetchQuotations}
                    variant="outline"
                    disabled={loading}
                >
                    <RefreshCw
                        className={`mr-2 h-4 w-4 ${
                            loading ? "animate-spin" : ""
                        }`}
                    />
                    Refresh
                </Button>
            </div>
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                <Button
                    variant={activeTab === "pending" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("pending")}
                >
                    Pending
                </Button>
                <Button
                    variant={activeTab === "approved" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("approved")}
                >
                    Approved
                </Button>
                <Button
                    variant={activeTab === "rejected" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("rejected")}
                >
                    Rejected
                </Button>
            </div>
            <div className="rounded-lg border bg-white shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Carat</TableHead>
                            <TableHead>Pieces</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Submitted</TableHead>
                            {activeTab === "pending" && (
                                <TableHead className="text-center">
                                    Actions
                                </TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={activeTab === "pending" ? 6 : 5}
                                    className="text-center py-12 text-gray-500"
                                >
                                    <Eye className="mx-auto h-8 w-8 text-gray-300" />
                                    <span>No quotations found.</span>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map((q) => (
                                <TableRow key={q.quotationId}>
                                    <TableCell>
                                        {q.username} ({q.email})
                                    </TableCell>
                                    <TableCell>{q.carat}</TableCell>
                                    <TableCell>{q.noOfPieces}</TableCell>
                                    <TableCell>
                                        ${q.quotePrice.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(q.submittedAt)}
                                    </TableCell>
                                    {activeTab === "pending" && (
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        handleAction(
                                                            q.quotationId,
                                                            "approve"
                                                        )
                                                    }
                                                    disabled={
                                                        actionLoading === q._id
                                                    }
                                                    className="text-green-600 hover:text-green-700"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        handleAction(
                                                            q.quotationId,
                                                            "reject"
                                                        )
                                                    }
                                                    disabled={
                                                        actionLoading ===
                                                        q.quotationId
                                                    }
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

const QuotationsPage = () => {
    return (
        <AdminGuard>
            <Container className="min-h-screen py-8">
                <QuotationsPageContent />
            </Container>
        </AdminGuard>
    );
};

export default QuotationsPage;
