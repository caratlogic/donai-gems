import { type Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    pageSizeOptions?: number[];
    paginationMeta?: {
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        recordsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    } | null;
}

export function DataTablePagination<TData>({
    table,
    pageSizeOptions = [10, 20, 30, 40, 50, 100],
    paginationMeta,
}: DataTablePaginationProps<TData>) {
    const pageIndex = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;

    // Use server-side pagination data when available, fallback to table state
    const currentPage = paginationMeta?.currentPage ?? pageIndex + 1;
    const totalPages = paginationMeta?.totalPages ?? table.getPageCount();
    const totalRecords = paginationMeta?.totalRecords ?? table.getRowCount();
    const hasNextPage = paginationMeta?.hasNextPage ?? table.getCanNextPage();
    const hasPrevPage =
        paginationMeta?.hasPrevPage ?? table.getCanPreviousPage();
    const recordsPerPage = paginationMeta?.recordsPerPage ?? pageSize;

    const handleFirstPage = () => {
        console.log("🏠 Going to first page");
        table.setPageIndex(0);
    };

    const handlePreviousPage = () => {
        console.log("⬅️ Going to previous page");
        if (hasPrevPage) {
            table.previousPage();
        }
    };

    const handleNextPage = () => {
        console.log("➡️ Going to next page");
        if (hasNextPage) {
            table.nextPage();
        }
    };

    const handleLastPage = () => {
        console.log("🏁 Going to last page");
        table.setPageIndex(totalPages - 1);
    };

    const handlePageSizeChange = (value: string) => {
        console.log("📏 Changing page size to:", value);
        table.setPageSize(Number(value));
        // Reset to first page when changing page size
        table.setPageIndex(0);
    };

    // Calculate the range of items currently being displayed
    const startItem = (currentPage - 1) * recordsPerPage + 1;
    const endItem = Math.min(currentPage * recordsPerPage, totalRecords);

    return (
        <div className="flex items-center justify-between px-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>

            <div className="flex items-center space-x-6 lg:space-x-8">
                {/* Page size selector */}
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${recordsPerPage}`}
                        onValueChange={handlePageSizeChange}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={recordsPerPage} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {pageSizeOptions.map((size) => (
                                <SelectItem key={size} value={`${size}`}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Results info */}
                <div className="flex items-center space-x-4">
                    <div className="text-sm text-muted-foreground">
                        Showing {totalRecords > 0 ? startItem : 0} to {endItem}{" "}
                        of {totalRecords.toLocaleString()} gems
                    </div>
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {currentPage} of {totalPages.toLocaleString()}
                    </div>
                </div>

                {/* Navigation buttons */}
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={handleFirstPage}
                        disabled={!hasPrevPage}
                        title="Go to first page"
                    >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={handlePreviousPage}
                        disabled={!hasPrevPage}
                        title="Go to previous page"
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={handleNextPage}
                        disabled={!hasNextPage}
                        title="Go to next page"
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={handleLastPage}
                        disabled={!hasNextPage}
                        title="Go to last page"
                    >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
