import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

// 🧭 Chọn baseURL tùy môi trường
const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BASE_API_URL + "/api"
    : import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// 🧱 Khởi tạo axios instance
const axiosClient: AxiosInstance = axios.create({ 
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🧠 Request Interceptor: tự động gắn Bearer token
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ⚙️ Response Interceptor: xử lý lỗi (401, 403, ...)
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized or expired token");
      // Có thể thêm logic refresh token tại đây
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
