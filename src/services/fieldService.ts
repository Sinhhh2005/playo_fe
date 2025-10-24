// src/services/fieldService.ts
import axiosClient from "../utils/axiosClient";

const BASE_URL = "/fields";

/** Lấy danh sách sân */
export const getAllFields = async () => {
  const res = await axiosClient.get(`${BASE_URL}/venues`);
  return res.data;
};

/** Lấy sân theo ID */
export const getFieldById = async (id: string) => {
  const res = await axiosClient.get(`${BASE_URL}/venue/${id}`);
  return res.data;
};

/** Tạo sân mới */
export const createField = async (data: any) => {
  const res = await axiosClient.post(`${BASE_URL}/venue`, data);
  return res.data;
};

/** Cập nhật sân */
export const updateField = async (id: string, data: any) => {
  const res = await axiosClient.put(`${BASE_URL}/venue/${id}`, data);
  return res.data;
};

/** Xóa sân */
export const deleteField = async (id: string) => {
  const res = await axiosClient.delete(`${BASE_URL}/venue/${id}`);
  return res.data;
};
