const API_URL = import.meta.env.VITE_API_URL;

// 🟢 LOGIN
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

    // ✅ Giải cấu trúc dữ liệu trả về từ backend
    const { accessToken, refreshToken, user } = data;

    if (!accessToken || !user) {
      throw new Error("Thiếu thông tin xác thực từ server");
    }

    // ✅ Lưu user info & token vào localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken || "");
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userName", user.name || user.fullName || "User");
    localStorage.setItem("role", user.role || "");
    localStorage.setItem("email", user.email || "");
    localStorage.setItem("userId", user.id?.toString() || user._id?.toString() || "");

    // 🔹 Phát sự kiện để các component (Navbar, Sidebar, v.v.) cập nhật ngay
    window.dispatchEvent(new Event("userChanged"));

    return {
      success: true,
      message: data.message || "Đăng nhập thành công",
      user,
    };
  } catch (error: any) {
    console.error("❌ Login error:", error);
    return { success: false, message: error.message || "Đăng nhập thất bại" };
  }
};

// 🟢 REGISTER
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

    return {
      success: true,
      message: data.message || "Đăng ký thành công",
      user: data.user || null,
    };
  } catch (error: any) {
    console.error("❌ Register error:", error);
    return { success: false, message: error.message || "Lỗi không xác định" };
  }
};
