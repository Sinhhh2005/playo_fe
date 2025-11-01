import axiosClient from "../utils/axiosClient";
import type { VenueSlot } from "../types/venueslot";

const API_URL = "/slots";

// 🧩 Hàm helper: ánh xạ dữ liệu từ backend về dạng FE hiểu
const mapSlotResponse = (slot: any): VenueSlot => {
  if (!slot) return slot;
  return {
    ...slot,
    participants: slot.slotUsers || [], // ánh xạ cho FE dùng
    venueName: slot.venue?.name,
    sportName: slot.sport?.name,
  };
};

// 🟢 Lấy tất cả slot
export const getAllSlots = async (): Promise<VenueSlot[]> => {
  const res = await axiosClient.get(API_URL);
  return res.data.map(mapSlotResponse);
};

// 🟢 Lấy chi tiết slot
export const getSlotById = async (id: string): Promise<VenueSlot> => {
  const res = await axiosClient.get(`${API_URL}/${id}`);
  return mapSlotResponse(res.data);
};

// 🟢 Tạo slot mới
export const createSlot = async (data: {
  fieldId: string;
  startTime: string;
  endTime: string;
  status?: string;
}): Promise<VenueSlot> => {
  const res = await axiosClient.post(API_URL, data);
  return mapSlotResponse(res.data);
};

// 🟢 Cập nhật slot
export const updateSlot = async (
  id: string,
  data: Partial<VenueSlot>
): Promise<VenueSlot> => {
  const res = await axiosClient.put(`${API_URL}/${id}`, data);
  return mapSlotResponse(res.data);
};

// 🟢 Xóa slot
export const deleteSlot = async (id: string): Promise<{ message: string }> => {
  const res = await axiosClient.delete(`${API_URL}/${id}`);
  return res.data;
};

// 🟢 Tham gia slot
export const joinSlot = async (
  id: string,
  user: { userId: string; name: string }
): Promise<VenueSlot> => {
  const res = await axiosClient.post(`${API_URL}/${id}/join`, user);
  return mapSlotResponse(res.data);
};

// 🟢 Rời khỏi slot
export const leaveSlot = async (
  id: string,
  data: { userId: string }
): Promise<VenueSlot> => {
  const res = await axiosClient.post(`${API_URL}/${id}/leave`, data);
  return mapSlotResponse(res.data);
};
