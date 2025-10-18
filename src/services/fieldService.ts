// src/services/fieldService.ts
import axiosClient from "../utils/axiosClient";

const BASE_URL = "/fields"; // ✅ tương ứng với router.use("/fields", fieldRoutes);

// Lấy toàn bộ danh sách sân
export const getAllFields = async () => {
  // ✅ khớp với router.get("/venues", getAllFields);
  const response = await axiosClient.get(`${BASE_URL}/venues`);
  return response.data;
};

// Lấy chi tiết sân theo id
export const getFieldById = async (id: string) => {
  // ✅ khớp với router.get("/venue/:id", getFieldById);
  const response = await axiosClient.get(`${BASE_URL}/venue/${id}`);
  return response.data;
};

// Tạo mới sân
export const createField = async (data: any) => {
  const response = await axiosClient.post(`${BASE_URL}/venue`, data);
  return response.data;
};

// Cập nhật sân
export const updateField = async (id: string, data: any) => {
  const response = await axiosClient.put(`${BASE_URL}/venue/${id}`, data);
  return response.data;
};

// Xóa sân
export const deleteField = async (id: string) => {
  const response = await axiosClient.delete(`${BASE_URL}/venue/${id}`);
  return response.data;
};
