"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { gemsColumns } from "@/components/data-table/gems-columns";
import { Gem } from "@/lib/validations/gems-Schema";

// Sample data matching your backend structure
const sampleGemsData: Gem[] = [
    {
        _id: "6885ee5dcb71b5eab2a71aa4",
        stockId: "TEST001",
        productType: "jewelry",
        category: "ring",
        stoneType: "nat sapphire",
        color: "royal blue",
        shape: "cushion",
        carat: 5.5,
        origin: "Madagascar",
        treatment: "no indication",
        availability: true,
        certificate: "GRS",
        measurement: "10.5X8.2X4.1MM",
        createdAt: "2025-07-27T09:16:13.678Z",
        updatedAt: "2025-07-27T09:16:13.678Z",
        __v: 0,
    },
    {
        _id: "6885e8638d25a767f7dbea5d",
        stockId: "DNJO19",
        productType: "Jewelry",
        category: "earrings",
        stoneType: "nat emerald",
        color: "vivid green",
        shape: "octagonal",
        carat: 5.32,
        origin: "Zambia",
        treatment: "CE(O) MINOR",
        availability: true,
        certificate: "GRS",
        measurement: "12.37X8.95X6.33/12.37X8.96X6.41",
        createdAt: "2025-07-27T08:50:43.728Z",
        updatedAt: "2025-07-27T08:50:43.728Z",
        __v: 0,
    },
    {
        _id: "6885e8638d25a767f7dbea5e",
        stockId: "DNJ020",
        productType: "Jewelry",
        category: "Ring",
        stoneType: "Diamond",
        color: "Orange Pink",
        shape: "Oval",
        carat: 6.12,
        origin: "N/A",
        treatment: "treated to change the color",
        availability: true,
        certificate: "GIA",
        measurement: "14.66X10.26X5.81",
        createdAt: "2025-07-27T08:50:43.728Z",
        updatedAt: "2025-07-27T08:50:43.728Z",
        __v: 0,
    },
    {
        _id: "6885e8638d25a767f7dbea5c",
        stockId: "DNJ018",
        productType: "Jewelry",
        category: "bracelet",
        stoneType: "nat emerald",
        color: "vivid green",
        shape: "pear shape",
        carat: 11.83,
        origin: "Zambia",
        treatment: "CE(O) MINOR",
        availability: true,
        certificate: "GRS",
        measurement: "18.80X13.30X9.57",
        createdAt: "2025-07-27T08:50:43.728Z",
        updatedAt: "2025-07-27T08:50:43.728Z",
        __v: 0,
    },
    {
        _id: "6885e8638d25a767f7dbea4e",
        stockId: "DNJ004",
        productType: "jewelry",
        category: "ring",
        stoneType: "spinel",
        color: "red",
        shape: "cushion",
        carat: 8.1,
        origin: "Burma",
        treatment: "no indication",
        availability: true,
        certificate: "GRS",
        measurement: "12.20X11.54X6.80MM",
        createdAt: "2025-07-27T08:50:43.727Z",
        updatedAt: "2025-07-27T08:50:43.727Z",
        __v: 0,
    },
];

export default function AdminPage() {
    const [gems, setGems] = useState<Gem[]>([]);
    const [loading, setLoading] = useState(true);
    const [paginationMeta, setPaginationMeta] = useState({
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0,
        recordsPerPage: 10,
        hasNextPage: false,
        hasPrevPage: false,
    });

    // Simulate loading data
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setGems(sampleGemsData);
            setPaginationMeta({
                currentPage: 1,
                totalPages: 1,
                totalRecords: sampleGemsData.length,
                recordsPerPage: 10,
                hasNextPage: false,
                hasPrevPage: false,
            });
            setLoading(false);
        };

        loadData();
    }, []);

    const handleStateChange = (state: {
        pagination: { pageIndex: number; pageSize: number };
        sorting: Array<{ id: string; desc: boolean }>;
        columnFilters: Array<{ id: string; value: any }>;
    }) => {
        console.log("Table state changed:", state);
        // Here you would typically make an API call to fetch new data
        // based on the current state (pagination, sorting, filters)
    };

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    Gems Management
                </h1>
                <p className="text-muted-foreground">
                    Manage your gem inventory and track availability.
                </p>
            </div>

            <DataTable
                columns={gemsColumns}
                data={gems}
                loading={loading}
                onStateChange={handleStateChange}
                paginationMeta={paginationMeta}
            />
        </div>
    );
}
