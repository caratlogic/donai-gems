"use client";
import { InventoryGuard } from "@/components/guards/InventoryGuard";
import React from "react";
import { ReactLenis, useLenis } from "lenis/react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    const lenis = useLenis((lenis) => {
        // called every scroll
        console.log(lenis);
    });

    return (
        <>
            <ReactLenis root />
            <InventoryGuard>
                <div>{children}</div>
            </InventoryGuard>
        </>
    );
};

export default ProtectedLayout;
