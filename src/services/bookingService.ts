// src/services/bookingService.ts
import axios from "axios";
import type { Booking } from "../types/index";

const API_URL = "http://localhost:5000/api/bookings";

/**
 * Lấy toàn bộ booking (Admin)
 */
export const getAllBookings = async (): Promise<Booking[]> => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

/**
 * Lấy booking của chính user hiện tại
 */
export const getUserBookings = async (): Promise<Booking[]> => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.get(`${API_URL}/user/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

/**
 * Lấy booking theo ID
 */
export const getBookingById = async (id: string): Promise<Booking> => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

/**
 * Tạo booking mới
 */
export const createBooking = async (
  data: Pick<Booking, "slotId"> & Partial<Booking>
): Promise<Booking> => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

/**
 * Cập nhật booking
 */
export const updateBooking = async (
  id: string,
  data: Partial<Booking>
): Promise<Booking> => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

/**
 * Xóa booking
 */
export const deleteBooking = async (
  id: string
): Promise<{ message: string }> => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
