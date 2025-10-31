import axiosClient from "../utils/axiosClient";
import type { Booking } from "../types/booking";

const API_URL = "/bookings";

export interface CreateBookingInput {
  venueId: number;
  slotId: number;
  bookingDate: string;
  startTime: string; // HH:mm:ss
  duration?: number; // phút
  ticketPrice: number;
  totalPrice: number;
  paymentMethod?: "COD" | "BANK"; // optional, chỉ cho payment
}

/**
 * 🟢 Lấy tất cả booking (Admin)
 */
export const getAllBookings = async (): Promise<Booking[]> => {
  const res = await axiosClient.get(API_URL);
  return res.data.data || res.data; // hỗ trợ cả { data: [...] } và [...]
};

/**
 * 🟡 Lấy danh sách booking của user hiện tại (tự nhận diện qua token)
 */
export const getUserBookings = async (): Promise<Booking[]> => {
  const res = await axiosClient.get(`${API_URL}/user/me`);
  return res.data.data || res.data;
};

/**
 * 🔍 Lấy chi tiết booking theo ID
 */
export const getBookingById = async (id: string | number): Promise<Booking> => {
  const res = await axiosClient.get(`${API_URL}/${id}`);
  return res.data.data || res.data;
};

/**
 * ✳️ Tạo booking mới
 * - FE truyền CreateBookingInput
 * - BE tự nhận userId từ token (nếu cần)
 */
/** Tạo booking */
export const createBooking = async (data: CreateBookingInput): Promise<Booking> => {
  const res = await axiosClient.post(API_URL, data);
  return res.data.data || res.data;
};

/** Tạo booking + payment */
export const createBookingWithPayment = async (
  data: CreateBookingInput
) => {
  const res = await axiosClient.post(`${API_URL}/with-payment`, data);
  return res.data; // BE trả về { booking, payment }
};

/**
 * ♻️ Cập nhật booking (Admin hoặc user sở hữu)
 */
export const updateBooking = async (
  id: string | number,
  data: Partial<Booking>
): Promise<Booking> => {
  const res = await axiosClient.put(`${API_URL}/${id}`, data);
  return res.data.data || res.data;
};

/**
 * 🗑️ Xóa booking
 */
export const deleteBooking = async (
  id: string | number
): Promise<{ message: string }> => {
  const res = await axiosClient.delete(`${API_URL}/${id}`);
  return res.data;
};
