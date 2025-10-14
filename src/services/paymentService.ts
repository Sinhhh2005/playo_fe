import axios from "axios";

const API_URL = "http://localhost:5000/api/payments";

// Lấy tất cả payments
export const getAllPayments = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Lấy payment theo ID
export const getPaymentById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Tạo payment mới
export const createPayment = async (data: {
  bookingId: string;
  amount: number;
  status?: string;
  [key: string]: any;
}) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

// Cập nhật payment
export const updatePayment = async (id: string, data: any) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

// Xóa payment
export const deletePayment = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
