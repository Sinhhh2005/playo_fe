import axios from "axios";
import type { Booking } from "../types/index";

const API_URL = "http://localhost:5000/api/bookings";

export const getAllBookings = async (): Promise<Booking[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getBookingById = async (id: string): Promise<Booking> => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createBooking = async (
  data: Pick<Booking, "userId" | "slotId"> & Partial<Booking>
): Promise<Booking> => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateBooking = async (id: string, data: Partial<Booking>): Promise<Booking> => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteBooking = async (id: string): Promise<{ message: string }> => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
