import axiosClient from "../utils/axiosClient";
import type { Venue } from "../types/venue";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  currentPage?: number;
  totalPages?: number;
  message?: string;
}

// 🧩 Lấy danh sách sân (phân trang)
export const getAllFields = async (
  page = 1,
  limit = 5
): Promise<ApiResponse<Venue[]>> => {
  const response = await axiosClient.get<ApiResponse<Venue[]>>(
    `/venues?page=${page}&limit=${limit}`
  );

  return response.data;
};

// 🧩 Xóa sân
export const deleteField = async (id: string) => {
  const response = await axiosClient.delete<{ message: string }>(`/venues/${id}`);
  return response.data;
};

// 🧩 Lấy chi tiết sân theo ID
export const getFieldById = async (id: string) => {
  const response = await axiosClient.get<Venue>(`/venues/${id}`);
  return response.data;
};

// 🧩 Tạo mới sân (dữ liệu theo kiểu Venue, bỏ id/createdAt vì backend tự sinh)
export const createField = async (
  data: Omit<Venue, "id" | "createdAt" | "updatedAt">
) => {
  const response = await axiosClient.post<Venue>("/venues", data);
  return response.data;
};

// 🧩 Cập nhật sân
export const updateField = async (
  id: string,
  data: Partial<Omit<Venue, "id" | "createdAt" | "updatedAt">>
) => {
  const response = await axiosClient.put<Venue>(`/venues/${id}`, data);
  return response.data;
};

// ⚡ Cập nhật trạng thái sân
export const updateFieldStatus = async (id: string, status: "active" | "inactive") => {
  const response = await axiosClient.put<Venue>(`/venues/${id}/status`, { status });
  return response.data;
};
