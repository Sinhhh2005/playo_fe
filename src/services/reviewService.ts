import axiosClient from "../utils/axiosClient";
import type { Review } from "../types";

const API_URL = "/reviews";

/**

* 🧩 Interface cho việc tạo hoặc cập nhật review
  */
  export interface CreateOrUpdateReviewInput {
  fieldId: string | number;
  userId?: string;
  rating: number;
  comment: string;
 [key: string]: string | number | undefined;
  }

/**

* 🟢 Lấy tất cả reviews (Admin hoặc public)
  */
  export const getAllReviews = async (): Promise<Review[]> => {
  const res = await axiosClient.get(API_URL);
  return res.data.data || res.data;
  };

/**

* 🔍 Lấy review theo ID
  */
  export const getReviewById = async (id: string | number): Promise<Review> => {
  const res = await axiosClient.get(`${API_URL}/${id}`);
  return res.data.data || res.data;
  };

/**

* ✳️ Tạo review mới
  */
  export const createReview = async (
  data: CreateOrUpdateReviewInput
  ): Promise<Review> => {
  const res = await axiosClient.post(API_URL, data);
  return res.data.data || res.data;
  };

/**

* ♻️ Cập nhật review
  */
  export const updateReview = async (
  id: string | number,
  data: Partial<CreateOrUpdateReviewInput>
  ): Promise<Review> => {
  const res = await axiosClient.put(`${API_URL}/${id}`, data);
  return res.data.data || res.data;
  };

/**

* 🗑️ Xóa review
  */
  export const deleteReview = async (
  id: string | number
  ): Promise<{ message: string }> => {
  const res = await axiosClient.delete(`${API_URL}/${id}`);
  return res.data;
  };
