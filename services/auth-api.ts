import { register } from "module";
import apiClient from "./axios";
import { User } from "@/lib/validations/user-schema";

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    phone?: string;
}

export interface VerifyOTPData {
    email: string;
    userId: string;
    otp: string;
}

export interface VipLoginData {
    email: string;
    passkey: string;
}

interface AuthResponse {
    data?: any;
    success: boolean;
    message: string;
    user: User;
    token?: string; // Or handle session via cookies
}

export const authAPI = {
    /**
     * Login a user
     */
    login: async (data: LoginData): Promise<AuthResponse> => {
        const response = await apiClient.post("/users/login", data);
        return response.data;
    },

    /**
     * Register a new user
     */
    register: async (
        data: RegisterData
    ): Promise<{ success: boolean; message: string; userId: string }> => {
        const response = await apiClient.post("/users/register", data);
        return response.data;
    },

    /**
     * Verify OTP for user registration
     */
    verifyOTP: async (
        data: VerifyOTPData
    ): Promise<{ success: boolean; message: string; user?: User }> => {
        const response = await apiClient.post("/users/verify-otp", data);
        return response.data;
    },

    /**
     *
     * Register customer data
     */

    registerCustomer: async (
        data: CustomerData
    ): Promise<{ success: boolean; message: string; userId: string }> => {
        const response = await apiClient.post("/users/customer-data", data);
        return response.data;
    },

    /**
     * Logout the current user
     */
    logout: async (): Promise<{ success: boolean; message: string }> => {
        const response = await apiClient.post("/users/logout");
        return response.data;
    },

    /**
     * Fetches the current user's profile.
     * NOTE: Your apis.md does not specify a /me or /profile endpoint.
     * This is a common pattern. If it doesn't exist, this function will fail.
     * An alternative is to rely solely on data from localStorage after login.
     */
    getProfile: async (): Promise<AuthResponse> => {
        // Assuming an endpoint like /users/me exists to get the current user
        const response = await apiClient.get("/users/me");
        return response.data;
    },

    /**
     * VIP login with passkey
     */
    vipLogin: async (data: VipLoginData): Promise<AuthResponse> => {
        const response = await apiClient.post("/users/login/vip", data);
        return response.data;
    },
};

export interface UsersResponse {
    success: boolean;
    message: string;
    data: User[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        recordsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export interface UserResponse {
    success: boolean;
    message: string;
    data: User;
}

export const userAPI = {
    /**
     * Get all users with optional filters
     */
    getUsers: async (params?: {
        page?: number;
        limit?: number;
        status?: "PENDING" | "ACTIVE" | "SUSPENDED";
        role?: "USER" | "ADMIN";
    }): Promise<UsersResponse> => {
        const response = await apiClient.get("/users", { params });
        return response.data;
    },

    /**
     * Get user by ID
     */
    getUserById: async (userId: string): Promise<UserResponse> => {
        const response = await apiClient.get(`/users/${userId}`);
        return response.data;
    },

    /**
     * Update user status (if endpoint exists)
     */
    updateUserStatus: async (
        userId: string,
        status: "PENDING" | "ACTIVE" | "SUSPENDED"
    ): Promise<UserResponse> => {
        const response = await apiClient.put(`/users/${userId}`, { status });
        return response.data;
    },
};
