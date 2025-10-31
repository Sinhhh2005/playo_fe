// src/services/category.ts
import axiosClient from "../utils/axiosClient";
import type { Sport } from "../types";


export const getAllSports = async (page = 1, limit = 5) => {
  const response = await axiosClient.get(`/sports?page=${page}&limit=${limit}`);
  return response.data;
};

export const createSport = async (data: Omit<Sport, "id">) => {
  const response = await axiosClient.post(`/sports`, data);
  return response.data;
};

export const updateSport = async (id: number, data: Omit<Sport, "id">) => {
  const response = await axiosClient.put(`/sports/${id}`, data);
  return response.data;
};

export const deleteSport = async (id: number) => {
  const response = await axiosClient.delete(`/sports/${id}`);
  return response.data;
};