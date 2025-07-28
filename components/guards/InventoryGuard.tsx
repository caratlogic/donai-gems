"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield } from "lucide-react";

interface InventoryGuardProps {
    children: React.ReactNode;
}

export function InventoryGuard({ children }: InventoryGuardProps) {
    const { user, isAuthenticated, loading, isAdmin, hasStatus } = useAuth();
    const router = useRouter();
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        if (loading) return;

        // Check if user is authenticated
        if (!isAuthenticated) {
            setShowWarning(true);
            return;
        }

        // Check access permissions:
        // 1. ADMIN can access regardless of status
        // 2. USER must have ACTIVE status
        const hasAccess =
            isAdmin || (user?.role === "USER" && hasStatus("ACTIVE"));

        if (!hasAccess) {
            // If USER but not ACTIVE, redirect to account suspended page
            if (user?.role === "USER" && !hasStatus("ACTIVE")) {
                router.push("/account-suspended");
                return;
            }
        }

        setShowWarning(false);
    }, [loading, isAuthenticated, isAdmin, user, hasStatus, router]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Show warning for unauthenticated users
    if (showWarning && !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                    <Alert variant="destructive" className="mb-6">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="font-medium">
                            Authentication Required
                        </AlertDescription>
                    </Alert>

                    <div className="text-center space-y-4">
                        <Shield className="h-16 w-16 text-gray-400 mx-auto" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Login Required
                            </h2>
                            <p className="text-gray-600">
                                To access the inventory, you must be logged in
                                with an active account.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={() => router.push("/login")}
                                className="w-full"
                            >
                                Login to Continue
                            </Button>
                            <Button
                                onClick={() => router.push("/register")}
                                variant="outline"
                                className="w-full"
                            >
                                Create New Account
                            </Button>
                            <Button
                                onClick={() => router.push("/")}
                                variant="ghost"
                                className="w-full"
                            >
                                Back to Home
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Check access permissions after authentication
    const hasAccess = isAdmin || (user?.role === "USER" && hasStatus("ACTIVE"));

    if (!hasAccess) {
        // This case should be handled by the useEffect redirect, but as a fallback
        return null;
    }

    // All checks passed, render children
    return <>{children}</>;
}
