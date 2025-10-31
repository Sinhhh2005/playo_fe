import axiosClient from "../utils/axiosClient";
import type { AxiosError } from "axios";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  user?: T;
}

// 🟢 LOGIN
export const login = async (
  credentials: LoginCredentials
): Promise<ApiResponse> => {
  try {
    const { data } = await axiosClient.post("/auth/login", credentials);

    const { accessToken, refreshToken, user, message } = data;

    if (!accessToken || !user) {
      throw new Error("Thiếu thông tin xác thực từ server");
    }

    // ✅ Lưu thông tin vào localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken || "");
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userName", user.name || user.fullName || "User");
    localStorage.setItem("role", user.role || "");
    localStorage.setItem("email", user.email || "");
    localStorage.setItem(
      "userId",
      user.id?.toString() || user._id?.toString() || ""
    );

    window.dispatchEvent(new Event("userChanged"));

    return { success: true, message: message || "Đăng nhập thành công", user };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    console.error("❌ Register error:", err);

    const message =
      err.response?.data?.message ||
      err.message ||
      "Đăng ký thất bại";

    return { success: false, message };
  }
};

// 🟢 REGISTER
export const register = async (
  userData: RegisterData
): Promise<ApiResponse> => {
  try {
    const { data } = await axiosClient.post("/auth/register", userData);

    return {
      success: true,
      message: data.message || "Đăng ký thành công",
      user: data.user || null,
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    console.error("❌ Register error:", err);

    const message =
      err.response?.data?.message ||
      err.message ||
      "Đăng ký thất bại";

    return { success: false, message };
  }
};