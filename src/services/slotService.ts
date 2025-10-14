import axios from "axios";
import type { Slot } from "../types/index";

const API_URL = "http://localhost:5000/api/slots";

export const getAllSlots = async (): Promise<Slot[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getSlotById = async (id: string): Promise<Slot> => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createSlot = async (data: {
  fieldId: string;
  startTime: string;
  endTime: string;
  status?: string;
}): Promise<Slot> => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateSlot = async (
  id: string,
  data: Partial<Slot>
): Promise<Slot> => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteSlot = async (id: string): Promise<{ message: string }> => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
