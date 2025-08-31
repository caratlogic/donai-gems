"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Container from "@/components/ui/container";
import {
    User,
    Mail,
    Phone,
    Building,
    MapPin,
    RefreshCw,
    Shield,
    Calendar,
    AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const {
        user,
        loading,
        error,
        refreshUser,
        isAdmin,
        isApprovedUser,
        isRefreshing,
    } = useAuth();
    const router = useRouter();

    if (loading) {
        return (
            <Container className="min-h-screen">
                <div className="flex items-center justify-center h-64">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        <div className="text-lg text-gray-600">
                            Loading profile...
                        </div>
                    </div>
                </div>
            </Container>
        );
    }

    if (error && !user) {
        return (
            <Container className="min-h-screen">
                <div className="max-w-2xl mx-auto py-8">
                    <Alert variant="destructive">
                        <AlertDescription>
                            {error}
                            <Button
                                onClick={refreshUser}
                                variant="outline"
                                size="sm"
                                className="ml-4"
                                disabled={isRefreshing}
                            >
                                {isRefreshing ? "Refreshing..." : "Try Again"}
                            </Button>
                        </AlertDescription>
                    </Alert>
                </div>
            </Container>
        );
    }

    if (!user) {
        return (
            <Container className="min-h-screen">
                <div className="max-w-2xl mx-auto py-8 text-center">
                    <div className="text-gray-500">No user data available</div>
                </div>
            </Container>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const handleCompleteProfile = () => {
        // Store current user data in sessionStorage to skip the initial registration steps
        sessionStorage.setItem("skipToCustomerData", "true");
        sessionStorage.setItem(
            "userData",
            JSON.stringify({
                username: user.username,
                email: user.email,
                userId: user._id,
            })
        );
        router.push("/register");
    };

    return (
        <Container className="min-h-screen">
            <div className="max-w-4xl mx-auto py-8 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            My Profile
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Manage your account information and preferences
                        </p>
                    </div>
                    <Button
                        onClick={refreshUser}
                        variant="outline"
                        className="flex items-center space-x-2"
                        disabled={isRefreshing}
                    >
                        <RefreshCw
                            className={`h-4 w-4 ${
                                isRefreshing ? "animate-spin" : ""
                            }`}
                        />
                        <span>
                            {isRefreshing ? "Refreshing..." : "Refresh"}
                        </span>
                    </Button>
                </div>

                {/* Show refresh error without disrupting the page */}
                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Incomplete Profile Alert */}
                {!user.customerData && !isAdmin && (
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="flex items-center justify-between">
                            <span>
                                Your profile is incomplete. Please complete your
                                customer information to access all features.
                            </span>
                            <Button
                                onClick={handleCompleteProfile}
                                size="sm"
                                className="ml-4"
                            >
                                Complete Profile
                            </Button>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Basic Information Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <User className="h-5 w-5" />
                            <span>Basic Information</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Username
                                </label>
                                <div className="mt-1 text-lg font-medium">
                                    {user.username}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Email
                                </label>
                                <div className="mt-1 flex items-center space-x-2">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <span>{user.email}</span>
                                </div>
                            </div>
                            {user.phone && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500">
                                        Phone
                                    </label>
                                    <div className="mt-1 flex items-center space-x-2">
                                        <Phone className="h-4 w-4 text-gray-400" />
                                        <span>{user.phone}</span>
                                    </div>
                                </div>
                            )}
                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Member Since
                                </label>
                                <div className="mt-1 flex items-center space-x-2">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span>
                                        {formatDate(user.createdAt as string)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Shield className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-500">
                                    Role:
                                </span>
                                <Badge
                                    variant={
                                        isAdmin ? "destructive" : "outline"
                                    }
                                    className="text-xs"
                                >
                                    {user.role}
                                </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">
                                    Status:
                                </span>
                                <Badge
                                    variant={
                                        isApprovedUser ? "default" : "outline"
                                    }
                                    className="text-xs"
                                >
                                    {user.status}
                                </Badge>
                            </div>
                            {user.isVip && (
                                <Badge
                                    variant="default"
                                    className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-600"
                                >
                                    VIP Member
                                </Badge>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Customer Information Card */}
                {user.customerData && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Building className="h-5 w-5" />
                                <span>Customer Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">
                                        First Name
                                    </label>
                                    <div className="mt-1 text-lg">
                                        {user.customerData.firstName}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">
                                        Last Name
                                    </label>
                                    <div className="mt-1 text-lg">
                                        {user.customerData.lastName}
                                    </div>
                                </div>
                                {user.customerData.phoneNumber && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">
                                            Phone Number
                                        </label>
                                        <div className="mt-1 flex items-center space-x-2">
                                            <Phone className="h-4 w-4 text-gray-400" />
                                            <span>
                                                {user.customerData.phoneNumber}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                {user.customerData && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">
                                            Date of Birth
                                        </label>
                                        <div className="mt-1">
                                            {
                                                user.customerData.businessInfo
                                                    .businessType
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Address Information */}
                            {user.customerData.address && (
                                <>
                                    <Separator />
                                    <div>
                                        <h4 className="flex items-center space-x-2 text-lg font-medium mb-4">
                                            <MapPin className="h-5 w-5" />
                                            <span>Address</span>
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">
                                                    Street
                                                </label>
                                                <div className="mt-1">
                                                    {
                                                        user.customerData
                                                            .address.street
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">
                                                    City
                                                </label>
                                                <div className="mt-1">
                                                    {
                                                        user.customerData
                                                            .address.city
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">
                                                    State/Province
                                                </label>
                                                <div className="mt-1">
                                                    {
                                                        user.customerData
                                                            .address.state
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">
                                                    Postal Code
                                                </label>
                                                <div className="mt-1">
                                                    {
                                                        user.customerData
                                                            .address.postalCode
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">
                                                    Country
                                                </label>
                                                <div className="mt-1">
                                                    {
                                                        user.customerData
                                                            .address.country
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Business Information */}
                            {user.customerData.businessInfo && (
                                <>
                                    <Separator />
                                    <div>
                                        <h4 className="flex items-center space-x-2 text-lg font-medium mb-4">
                                            <Building className="h-5 w-5" />
                                            <span>Business Information</span>
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">
                                                    Company Name
                                                </label>
                                                <div className="mt-1">
                                                    {
                                                        user.customerData
                                                            .businessInfo
                                                            .companyName
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">
                                                    Business Type
                                                </label>
                                                <div className="mt-1">
                                                    {
                                                        user.customerData
                                                            .businessInfo
                                                            .businessType
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">
                                                    VAT Number
                                                </label>
                                                <div className="mt-1">
                                                    {
                                                        user.customerData
                                                            .businessInfo
                                                            .vatNumber
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Action Buttons */}
                {/* <div className="flex space-x-4">
                    <Button variant="outline" size="lg">
                        Edit Profile
                    </Button>
                    <Button variant="outline" size="lg">
                        Change Password
                    </Button>
                </div> */}
            </div>
        </Container>
    );
}
