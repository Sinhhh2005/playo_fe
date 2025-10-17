const API_URL = import.meta.env.VITE_API_URL;

// 🟢 Hàm login
export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Phản hồi không hợp lệ từ server");
    }

    // ✅ Cấu trúc dữ liệu trả về từ backend
    const { accessToken, refreshToken, user } = data.data;

    // ✅ Lưu thông tin user vào localStorage (đồng bộ với Navbar)
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userName", user.name || user.fullName || "User"); // 🔹 Bổ sung
    localStorage.setItem("role", user.role || "");
    localStorage.setItem("email", user.email || "");
    localStorage.setItem("userId", user.id?.toString() || user._id?.toString() || ""); // 🔹 Bổ sung

    // 🔹 Phát sự kiện để Navbar cập nhật ngay lập tức
    window.dispatchEvent(new Event("userChanged"));

    return {
      success: true,
      message: data.message || "Login successful",
      user,
    };
  } catch (error: any) {
    console.error("❌ Login error:", error);
    return { success: false, message: error.message };
  }
};

// 🟢 Hàm register
export const register = async (userData: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Đăng ký thất bại");
    }

    return { success: true, data: data.data };
  } catch (error: any) {
    console.error("❌ Register error:", error);
    return { success: false, message: error.message };
  }
};
