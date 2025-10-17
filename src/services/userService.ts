import type { User } from "../types/index";

const API_URL = import.meta.env.VITE_API_URL;

// 🧩 Helper: Lấy headers có token
const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};

// 🟢 Lấy danh sách tất cả user (chỉ admin)
export const getAllUsers = async (): Promise<{
  success: boolean;
  data?: User[];
  message?: string;
}> => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể lấy danh sách người dùng");
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("❌ getAllUsers error:", error);
    return { success: false, message: error.message };
  }
};

// 🟢 Lấy user theo ID
export const getUserById = async (
  id: string
): Promise<{ success: boolean; data?: User; message?: string }> => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không tìm thấy người dùng");
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("❌ getUserById error:", error);
    return { success: false, message: error.message };
  }
};

// 🟢 Cập nhật thông tin user (chính chủ hoặc admin)
export const updateUser = async (
  id: string,
  updateData: Partial<User>
): Promise<{ success: boolean; data?: User; message?: string }> => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể cập nhật thông tin người dùng");
    }

    // ✅ Lưu lại user đã cập nhật nếu chính là user hiện tại
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (currentUser?.id === data.user?.id) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return { success: true, data: data.user, message: data.message };
  } catch (error: any) {
    console.error("❌ updateUser error:", error);
    return { success: false, message: error.message };
  }
};

// 🟢 Xoá user (admin)
export const deleteUser = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể xoá người dùng");
    }

    return { success: true, message: data.message };
  } catch (error: any) {
    console.error("❌ deleteUser error:", error);
    return { success: false, message: error.message };
  }
};
