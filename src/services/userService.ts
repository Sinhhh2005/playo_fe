import axios from "axios";
import type { User } from "../types/index";

const API_URL = "http://localhost:5000/api/users";

export const getAllUsers = async (): Promise<User[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateUser = async (
  id: string,
  data: Partial<User>
): Promise<User> => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: string): Promise<{ message: string }> => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
