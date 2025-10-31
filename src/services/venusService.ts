import axiosClient from "../utils/axiosClient";
import type { Venue } from "../types";

// 🧩 Lấy danh sách sân (phân trang)
export const getAllFields = async (page = 1, limit = 5) => {
  const response = await axiosClient.get(`/venues?page=${page}&limit=${limit}`);
  return response.data;
};

// 🧩 Xóa sân
export const deleteField = async (id: string) => {
  const response = await axiosClient.delete(`/venues/${id}`);
  return response.data;
};

// 🧩 (tuỳ chọn) Lấy chi tiết sân theo ID
export const getFieldById = async (id: string) => {
  const response = await axiosClient.get(`/venues/${id}`);
  return response.data;
};

// 🧩 (tuỳ chọn) Tạo mới sân
export const createField = async (data: Venue) => {
  const response = await axiosClient.post("/venues", data);
  return response.data;
};

// 🧩 (tuỳ chọn) Cập nhật sân
export const updateField = async (id: string | string,  fieldData: Partial<Venue>) => {
  const response = await axiosClient.put(`/fields/venue/${id}`, fieldData);
  return response.data;
};


// ⚡ Cập nhật trạng thái sân
export const updateFieldStatus = async (id: string | string, status: string) => {
  const response = await axiosClient.put(`/fields/venue/${id}/status`, { status });
  return response.data;
};  