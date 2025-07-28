import apiClient from "./axios";
import { User } from "@/lib/validations/user-schema"; // Assuming you have a user schema validation

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
};
