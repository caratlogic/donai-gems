import axios from "axios";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api-gems-inventory.onrender.com/api";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default apiClient;
