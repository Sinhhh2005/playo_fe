import axios from "axios";

const API_URL = "http://localhost:5000/api/user-roles";

// Lấy tất cả user-role
export const getAllUserRoles = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Lấy user-role theo ID
export const getUserRoleById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Gán role cho user
export const assignRoleToUser = async (userId: string, roleId: string) => {
  const res = await axios.post(API_URL, { userId, roleId });
  return res.data;
};

// Xóa role khỏi user
export const removeUserRole = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
