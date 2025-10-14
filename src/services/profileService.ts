import axios from "axios";

const API_URL = "http://localhost:5000/api/profiles";

// Lấy tất cả profiles
export const getAllProfiles = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Lấy profile theo ID
export const getProfileById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Tạo profile mới
export const createProfile = async (data: { userId: string; [key: string]: any }) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

// Cập nhật profile
export const updateProfile = async (id: string, data: any) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

// Xóa profile
export const deleteProfile = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
