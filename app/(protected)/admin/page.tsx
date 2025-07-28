"use client";

import { useCallback } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { gemsColumns } from "@/components/data-table/gems-columns";
import { useGems } from "@/hooks/useGems";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DownloadIcon, FileTextIcon, PlusIcon, RefreshCw } from "lucide-react";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/ui/CustomButton";
import { AdminGuard } from "@/components/guards/AdminGuard";

function AdminPageContent() {
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
        <Container>
            <div className="flex items-center justify-start gap-2 my-5">
                <CustomButton
                    variant="secondary"
                    className="rounded-md text-neutral-500 border shadow-none hover:bg-primary/80 hover:border-none hover:text-white"
                    icon={<DownloadIcon size={15} />}
                >
                    Export
                </CustomButton>
                <CustomButton
                    variant="secondary"
                    className="rounded-md border text-neutral-500 shadow-none hover:bg-primary/80 hover:border-none hover:text-white"
                    icon={<FileTextIcon size={15} />}
                >
                    <span>Import&nbsp;Excel</span>
                </CustomButton>
                <CustomButton
                    onClick={handleRefresh}
                    disabled={loading}
                    variant="secondary"
                    className="rounded-md border text-neutral-500 shadow-none hover:bg-primary/80 hover:border-none hover:text-white"
                >
                    <RefreshCw
                        className={`mr-2 h-4 w-4 ${
                            loading ? "animate-spin" : ""
                        }`}
                    />
                    Refresh
                </CustomButton>
                <CustomButton
                    className="bg-primary rounded-md shadow-none"
                    icon={<PlusIcon size={15} />}
                >
                    <span>Add&nbsp;Gems</span>
                </CustomButton>
            </div>

            <div className="flex items-center justify-start gap-5 my-10">
                <div className="w-80 h-28 border border-primary rounded-xl flex flex-col justify-center items-start gap-2 px-7">
                    <h1 className="text-neutral-500 text-base">
                        Total Diamonds (All Inventory)
                    </h1>
                    <h1 className="text-2xl font-semibold text-primary">
                        {loading ? "..." : totalCount.toLocaleString()}
                    </h1>
                </div>
                <div className="w-80 h-28 border border-primary rounded-xl flex flex-col justify-center items-start gap-2 px-7">
                    <h1 className="text-neutral-500 text-base">Available</h1>
                    <h1 className="text-2xl font-semibold text-primary">
                        {loading
                            ? "..."
                            : gems.filter((g) => g.availability).length}
                    </h1>
                </div>
                <div className="w-80 h-28 border border-primary rounded-xl flex flex-col justify-center items-start gap-2 px-7">
                    <h1 className="text-neutral-500 text-base">Total Size</h1>
                    <h1 className="text-2xl font-semibold text-primary">
                        {loading
                            ? "..."
                            : gems
                                  .reduce((sum, g) => sum + (g.carat || 0), 0)
                                  .toFixed(2)}{" "}
                        ct
                    </h1>
                </div>
            </div>
            <div className="py-10">
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
        </Container>
    );
}

export default function AdminPage() {
    return (
        <AdminGuard>
            <AdminPageContent />
        </AdminGuard>
    );
}
