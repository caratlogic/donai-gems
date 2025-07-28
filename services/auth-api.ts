import apiClient from "./axios";

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    phone?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface OTPData {
    email: string;
    userId: string;
    otp: string;
}

export interface VIPLoginData {
    username: string;
    passkey: string;
}

export const authAPI = {
    // Register new user
    register: async (data: RegisterData) => {
        const response = await apiClient.post("/users/register", data);
        return response.data;
    },

    // Verify OTP
    verifyOTP: async (data: OTPData) => {
        const response = await apiClient.post("/users/verify-otp", data);
        return response.data;
    },

    // Normal user login
    login: async (data: LoginData) => {
        const response = await apiClient.post("/users/login", data);
        return response.data;
    },

    // VIP user login
    vipLogin: async (data: VIPLoginData) => {
        const response = await apiClient.post("/users/login/vip", data);
        return response.data;
    },

    // Logout (if you have this endpoint)
    logout: async () => {
        const response = await apiClient.post("/users/logout");
        return response.data;
    },
};
