import axiosClient from "../utils/axiosClient";
import type { Payment } from "../types/Payment";

const API_URL = "/payments";

/**

* 🧾 Interface riêng cho việc tạo payment
* Giúp FE gửi dữ liệu đúng định dạng, không phụ thuộc vào type Payment đầy đủ
  */
export interface CreatePaymentInput {
  bookingId: string | number;
  amount: number;
  status?: "pending" | "paid" | "failed";
  method?: "COD" | "BANK" | string;
  transactionId?: string;
  userId?: string; // Nếu BE tự nhận từ token thì không cần
  [key: string]: string | number | undefined; // ✅ thay any bằng union type
}

/**

* 🟢 Lấy tất cả payments (Admin)
  */
export const getAllPayments = async (): Promise<Payment[]> => {
  const res = await axiosClient.get(API_URL);
  return res.data.data || res.data;
};

/**

* 🔍 Lấy chi tiết payment theo ID
  */
export const getPaymentById = async (id: string | number): Promise<Payment> => {
  const res = await axiosClient.get(`${API_URL}/${id}`);
  return res.data.data || res.data;
};

/**

* ✳️ Tạo payment mới
  */
export const createPayment = async (data: CreatePaymentInput): Promise<Payment> => {
  const res = await axiosClient.post(API_URL, data);
  return res.data.data || res.data;
};

/**

* ♻️ Cập nhật payment (Admin hoặc user sở hữu)
  */
export const updatePayment = async (
  id: string | number,
  data: Partial<Payment>
): Promise<Payment> => {
  const res = await axiosClient.put(`${API_URL}/${id}`, data);
  return res.data.data || res.data;
};

/**

* 🗑️ Xóa payment
  */
export const deletePayment = async (
  id: string | number
): Promise<{ message: string }> => {
  const res = await axiosClient.delete(`${API_URL}/${id}`);
  return res.data;
};
