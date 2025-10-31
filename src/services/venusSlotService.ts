import axiosClient from "../utils/axiosClient";
import type { VenueSlot } from "../types/VenueSlot";

const API_URL = "/slots";

/**
 * 🧩 Ánh xạ dữ liệu từ backend sang dạng FE dễ xử lý
 */
const mapSlotResponse = (slot: any): VenueSlot => {
  if (!slot) return slot;
  return {
    ...slot,
    participants: slot.slotUsers || [],
    venueName: slot.venue?.name,
    sportName: slot.sport?.name,
  };
};

/**
 * 🟢 Lấy tất cả slot
 */
export const getVenueSlots = async (): Promise<VenueSlot[]> => {
  const res = await axiosClient.get(API_URL);
  const data = res.data.data || res.data;
  return Array.isArray(data) ? data.map(mapSlotResponse) : [];
};

/**
 * 🟢 Lấy chi tiết slot theo ID
 */
export const getVenueSlotById = async (
  id: string | number
): Promise<VenueSlot> => {
  const res = await axiosClient.get(`${API_URL}/${id}`);
  return mapSlotResponse(res.data.data || res.data);
};

/**
 * 🟢 Tạo slot mới
 */
export const createVenueSlot = async (
  data: Partial<VenueSlot>
): Promise<VenueSlot> => {
  const res = await axiosClient.post(API_URL, data);
  return mapSlotResponse(res.data.data || res.data);
};

/**
 * 🟢 Cập nhật slot
 */
export const updateVenueSlot = async (
  id: string | number,
  data: Partial<VenueSlot>
): Promise<VenueSlot> => {
  const res = await axiosClient.put(`${API_URL}/${id}`, data);
  return mapSlotResponse(res.data.data || res.data);
};

/**
 * 🟢 Xóa slot
 */
export const deleteVenueSlot = async (
  id: string | number
): Promise<{ message: string }> => {
  const res = await axiosClient.delete(`${API_URL}/${id}`);
  return res.data;
};

/**
 * 🟢 Tham gia slot
 */
export const joinSlot = async (
  id: string | number,
  user: { userId: string; name?: string }
): Promise<VenueSlot> => {
  const res = await axiosClient.post(`${API_URL}/${id}/join`, user);
  return mapSlotResponse(res.data.data || res.data);
};

/**
 * 🟢 Rời khỏi slot
 */
export const leaveSlot = async (
  id: string | number,
  data: { userId: string }
): Promise<VenueSlot> => {
  const res = await axiosClient.post(`${API_URL}/${id}/leave`, data);
  return mapSlotResponse(res.data.data || res.data);
};

export default {
  getVenueSlots,
  getVenueSlotById,
  createVenueSlot,
  updateVenueSlot,
  deleteVenueSlot,
  joinSlot,
  leaveSlot,
};
