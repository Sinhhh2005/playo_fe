// src/services/authService.ts
const API_URL = import.meta.env.VITE_API_URL;

// 🟢 Hàm login
export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Đăng nhập thất bại");
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// 🟢 Hàm register (thêm mới)
export const register = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Đăng ký thất bại");
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
