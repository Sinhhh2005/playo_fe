import axiosClient from "../utils/axiosClient";
import type { User } from "../types/index";

// 🟢 Lấy danh sách tất cả user (chỉ admin)
export const getAllUsers = async (
  page = 1,
  limit = 5,
  search = ""
): Promise<{
  success: boolean;
  data?: User[];
  pagination?: { totalPages: number; currentPage: number; totalUsers: number };
  message?: string;
}> => {
  try {
    const response = await axiosClient.get("/users", {
      params: { page, limit, search },
    });

    return {
      success: true,
      data: response.data.data,
      pagination: response.data.pagination,
    };
  } catch (error) {
    const err = error as Error;
    return { success: false, message: err.message };
  }
};

// 🟢 Lấy user theo ID
export const getUserById = async (
  id: string
): Promise<{ success: boolean; data?: User; message?: string }> => {
  try {
    const response = await axiosClient.get(`/users/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    const err = error as Error;
    console.error("❌ getUserById error:", err);
    return { success: false, message: err.message };
  }
};

// 🟢 Cập nhật thông tin user
export const updateUser = async (
  id: string,
  updateData: Partial<User>
): Promise<{ success: boolean; data?: User; message?: string }> => {
  try {
    const response = await axiosClient.put(`/users/${id}`, updateData);
    const updatedUser = response.data.user;

    // ✅ Nếu là user hiện tại, lưu lại thông tin mới vào localStorage
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (currentUser?.id === updatedUser?.id) {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }

    return { success: true, data: updatedUser, message: response.data.message };
  } catch (error) {
    const err = error as Error;
    console.error("❌ updateUser error:", err);
    return { success: false, message: err.message };
  }
};

// 🟢 Tạo user mới
export const createUser = async (
  userData: Partial<User>
): Promise<{ success: boolean; data?: User; message?: string }> => {
  try {
    const response = await axiosClient.post("/users", userData);
    return { success: true, data: response.data.user };
  } catch (error) {
    const err = error as Error;
    console.error("❌ createUser error:", err);
    return { success: false, message: err.message };
  }
};

// 🟢 Xoá user (admin)
export const deleteUser = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosClient.delete(`/users/${id}`);
    return { success: true, message: response.data.message };
  } catch (error) {
    const err = error as Error;
    console.error("❌ deleteUser error:", err);
    return { success: false, message: err.message };
  }
};