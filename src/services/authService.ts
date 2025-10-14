import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<{ message: string }> => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const login = async (data: {
  email: string;
  password: string;
}): Promise<{ accessToken: string; refreshToken: string }> => {
  const res = await axios.post(`${API_URL}/login`, data);
  return res.data;
};

export const refreshToken = async (token: string): Promise<{ accessToken: string }> => {
  const res = await axios.post(`${API_URL}/refresh-token`, { token });
  return res.data;
};

export const logout = async (userId: string): Promise<{ message: string }> => {
  const res = await axios.post(`${API_URL}/logout`, { userId });
  return res.data;
};
