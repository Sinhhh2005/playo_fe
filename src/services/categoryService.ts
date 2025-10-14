import axios from "axios";

const API_URL = "http://localhost:5000/api/categories";

// Lấy tất cả categories
export const getAllCategories = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Lấy category theo ID
export const getCategoryById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Tạo mới category
export const createCategory = async (data: { name: string; image?: string }) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

// Cập nhật category
export const updateCategory = async (id: string, data: { name?: string; image?: string }) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

// Xóa category
export const deleteCategory = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
