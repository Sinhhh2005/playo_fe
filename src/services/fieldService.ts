import axios from "axios";

const API_URL = "http://localhost:5000/api/fields";

// Lấy tất cả field
export const getAllFields = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Lấy field theo ID
export const getFieldById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Tạo mới field
export const createField = async (data: {
  name: string;
  positionId: string;
  categoryId: string;
  [key: string]: any;
}) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

// Cập nhật field
export const updateField = async (id: string, data: any) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

// Xóa field
export const deleteField = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
