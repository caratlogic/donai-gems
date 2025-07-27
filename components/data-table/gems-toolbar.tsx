"use client";

import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { X } from "lucide-react";
import {
    productTypes,
    categories,
    stoneTypes,
    colors,
    shapes,
    treatments,
    certificates,
} from "@/components/filter/gemsFilter";

interface GemsTableToolbarProps<TData> {
    table: Table<TData>;
}

export function GemsTableToolbar<TData>({
    table,
}: GemsTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search gems by Stock ID..."
                    value={
                        (table
                            .getColumn("stockId")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("stockId")
                            ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn("productType") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("productType")}
                        title="Product Type"
                        options={productTypes}
                    />
                )}
                {table.getColumn("category") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("category")}
                        title="Category"
                        options={categories}
                    />
                )}
                {table.getColumn("stoneType") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("stoneType")}
                        title="Stone Type"
                        options={stoneTypes}
                    />
                )}
                {table.getColumn("color") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("color")}
                        title="Color"
                        options={colors}
                    />
                )}
                {table.getColumn("shape") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("shape")}
                        title="Shape"
                        options={shapes}
                    />
                )}
                {table.getColumn("treatment") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("treatment")}
                        title="Treatment"
                        options={treatments}
                    />
                )}
                {table.getColumn("certificate") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("certificate")}
                        title="Certificate"
                        options={certificates}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
