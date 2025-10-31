import axiosClient from "../utils/axiosClient";

const API_URL = "/userRoles";

// 🟢 Lấy tất cả user-role
export const getAllUserRoles = async () => {
  const res = await axiosClient.get(API_URL);
  return res.data;
};

// 🟢 Lấy user-role theo ID
export const getUserRoleById = async (id: string) => {
  const res = await axiosClient.get(`${API_URL}/${id}`);
  return res.data;
};

// 🟢 Gán role cho user
export const assignRoleToUser = async (userId: string, roleId: string) => {
  const res = await axiosClient.post(API_URL, { userId, roleId });
  return res.data;
};

// 🟢 Xóa role khỏi user
export const removeUserRole = async (id: string) => {
  const res = await axiosClient.delete(`${API_URL}/${id}`);
  return res.data;
};