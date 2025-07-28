"use client";

import React from "react";
import { GemsFilter } from "@/components/client/GemsFilter";
import { ClientGemsTable } from "@/components/client/ClientGemsTable";
import { useClientGems } from "@/hooks/useClientGems";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function InventoryPage() {
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
                {/* Header */}
                {/* <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Gems Inventory
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Discover our collection of premium gemstones
                            </p>
                            {totalCount > 0 && (
                                <p className="text-sm text-gray-500 mt-1">
                                    {totalCount.toLocaleString()} gems available
                                </p>
                            )}
                        </div>
                        <Button
                            onClick={refetch}
                            disabled={loading}
                            variant="outline"
                            size="sm"
                        >
                            <RefreshCw
                                className={`mr-2 h-4 w-4 ${
                                    loading ? "animate-spin" : ""
                                }`}
                            />
                            Refresh
                        </Button>
                    </div>
                </div> */}

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
                    {/* Filters Sidebar */}
                    <div className="">
                        <div className="">
                            <GemsFilter
                                onFiltersChange={updateFilters}
                                loading={loading}
                            />
                        </div>
                    </div>

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
