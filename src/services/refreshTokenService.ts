import axios from "axios";

const API_URL = "http://localhost:5000/api/refresh-tokens";

// Lấy tất cả refresh tokens
export const getAllRefreshTokens = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Lấy refresh token theo ID
export const getRefreshTokenById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Tạo refresh token mới cho userId
export const createRefreshToken = async (userId: string) => {
  const res = await axios.post(API_URL, { userId });
  return res.data;
};

// Xóa refresh token
export const deleteRefreshToken = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
