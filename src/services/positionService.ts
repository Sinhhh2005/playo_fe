import axios from "axios";

const API_URL = "http://localhost:5000/api/positions";

// Lấy tất cả positions
export const getAllPositions = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Lấy position theo ID
export const getPositionById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Tạo mới position
export const createPosition = async (data: { name: string; [key: string]: any }) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

// Cập nhật position
export const updatePosition = async (id: string, data: any) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

// Xóa position
export const deletePosition = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
