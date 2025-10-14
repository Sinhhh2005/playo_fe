import axios from "axios";

const API_URL = "http://localhost:5000/api/roles";

// Lấy tất cả roles
export const getAllRoles = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Lấy role theo ID
export const getRoleById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Tạo role mới
export const createRole = async (data: { name: string; description?: string }) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

// Cập nhật role
export const updateRole = async (id: string, data: Partial<{ name: string; description?: string }>) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

// Xóa role
export const deleteRole = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

// Lấy role theo tên
export const getRoleByName = async (name: string) => {
  const res = await axios.get(`${API_URL}/name/${name}`);
  return res.data;
};
