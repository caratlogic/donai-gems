"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authAPI } from "@/services/auth-api";

const Page = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await authAPI.login({
                email: formData.email,
                password: formData.password,
            });

            if (response.success) {
                // Store user data if needed
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );

                // Redirect based on user role
                if (response.data.user.role === "ADMIN") {
                    router.push("/admin");
                } else {
                    router.push("/dashboard"); // or wherever you want to redirect normal users
                }
            }
        } catch (err: any) {
            console.error("Login error:", err);

            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.response?.status === 400) {
                setError("Invalid email or password");
            } else if (err.response?.status === 401) {
                setError(
                    "Account not verified. Please check your email for verification."
                );
            } else {
                setError("Login failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen lg:-translate-y-20 flex justify-center items-center bg-gray-50/10 py-12 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="flex flex-col items-center space-y-6 p-8">
                    {/* Logo and Header */}
                    <div className="text-center space-y-4">
                        <div className="flex justify-center mb-6">
                            <Image
                                src="Donai.svg"
                                alt="Donai Gems"
                                width={120}
                                height={60}
                                className="object-contain"
                            />
                        </div>
                        <h2
                            className={`text-5xl text-primary py-3 font-normal font-playfair`}
                        >
                            Login
                        </h2>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="w-full space-y-5">
                        {/* Email Field */}
                        <div className="space-y-4">
                            <label
                                htmlFor="email"
                                className={`text-base font-medium text-secondary font-openSans`}
                            >
                                Username or email address*
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your username or email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md  transition-colors font-openSans`}
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className={`text-base font-medium text-secondary  font-openSans`}
                            >
                                Password*
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md  transition-colors font-openSans`}
                                required
                            />
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <input
                                    id="remember"
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 rounded-full accent-[#C49A6C] text-black transition-colors cursor-pointer"
                                />
                                <label
                                    htmlFor="remember"
                                    className={`text-sm text-secondary font-openSans `}
                                >
                                    Remember me
                                </label>
                            </div>
                            <button
                                type="button"
                                className={`text-sm text-gray-500 hover:text-[#C49A6C] transition-colors font-openSans `}
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">
                                {error}
                            </div>
                        )}

                        {/* Login Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-6  text-white bg-primary/80 rounded-full font-medium text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-openSans`}
                        >
                            {isLoading ? "Logging in..." : "Log in"}
                        </Button>
                    </form>

                    {/* Register Link */}
                    <div className={`text-center font-openSans`}>
                        <span className="text-gray-600">
                            Don't have an account?{" "}
                        </span>
                        <button
                            onClick={() => router.push("/register")}
                            type="button"
                            className="text-[#C49A6C] font-medium hover:text-[#8B6F4D] transition-colors bg-transparent border-none cursor-pointer underline"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
