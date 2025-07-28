"use client";

import { useCallback } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { gemsColumns } from "@/components/data-table/gems-columns";
import { useGems } from "@/hooks/useGems";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function AdminPage() {
    const {
        gems,
        loading,
        error,
        totalCount,
        pageCount,
        refetch,
        updateTable,
        paginationMeta,
    } = useGems();

    // FIXED: Use useCallback to prevent recreation on every render
    const handleStateChange = useCallback(
        (state: {
            pagination: { pageIndex: number; pageSize: number };
            sorting: Array<{ id: string; desc: boolean }>;
            columnFilters: Array<{ id: string; value: any }>;
        }) => {
            console.log("📊 Table state changed:", state);
            updateTable(state);
        },
        [updateTable]
    );

    const handleRefresh = useCallback(() => {
        console.log("🔄 Manual refresh triggered");
        refetch();
    }, [refetch]);

    return (
        <div className="container max-w-7xl mx-auto py-10">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Gems Management
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your gem inventory and track availability.
                        </p>
                        {totalCount > 0 && (
                            <p className="text-sm text-muted-foreground mt-1">
                                Total gems: {totalCount.toLocaleString()}
                            </p>
                        )}
                    </div>
                    <Button
                        onClick={handleRefresh}
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
            </div>

            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertDescription>
                        Error loading gems: {error}
                        <Button
                            onClick={handleRefresh}
                            variant="outline"
                            size="sm"
                            className="ml-4"
                        >
                            Retry
                        </Button>
                    </AlertDescription>
                </Alert>
            )}

            <DataTable
                columns={gemsColumns}
                data={gems}
                loading={loading}
                onStateChange={handleStateChange}
                paginationMeta={paginationMeta}
                pageCount={pageCount}
            />
        </div>
    );
}
