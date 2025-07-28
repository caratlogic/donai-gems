"use client";

import React from "react";
import { GemsFilter } from "@/components/client/GemsFilter";
import { ClientGemsTable } from "@/components/client/ClientGemsTable";
import { useClientGems } from "@/hooks/useClientGems";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { InventoryGuard } from "@/components/guards/InventoryGuard";

function InventoryPageContent() {
    const {
        gems,
        loading,
        error,
        totalCount,
        pageCount,
        currentPage,
        refetch,
        updateFilters,
        updateSearch,
        updateSort,
        updatePage,
        updatePageSize,
        paginationMeta,
    } = useClientGems();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Error Alert */}
                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertDescription>
                            Error loading gems: {error}
                            <Button
                                onClick={refetch}
                                variant="outline"
                                size="sm"
                                className="ml-4"
                            >
                                Retry
                            </Button>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Main Content */}
                <div className="flex flex-col gap-8">
                    {/* <div className="">
                        <div className="">
                            <GemsFilter
                                onFiltersChange={updateFilters}
                                loading={loading}
                            />
                        </div>
                    </div> */}
                    {/* Gems Table */}
                    <div className="lg:col-span-3">
                        <ClientGemsTable
                            gems={gems}
                            loading={loading}
                            currentPage={
                                paginationMeta?.currentPage || currentPage
                            }
                            totalPages={paginationMeta?.totalPages || pageCount}
                            totalRecords={
                                paginationMeta?.totalRecords || totalCount
                            }
                            recordsPerPage={
                                paginationMeta?.recordsPerPage || 10
                            }
                            hasNextPage={paginationMeta?.hasNextPage || false}
                            hasPrevPage={paginationMeta?.hasPrevPage || false}
                            onPageChange={updatePage}
                            onPageSizeChange={updatePageSize}
                            onSearchChange={updateSearch}
                            onSortChange={updateSort}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function InventoryPage() {
    return (
        <InventoryGuard>
            <InventoryPageContent />
        </InventoryGuard>
    );
}
