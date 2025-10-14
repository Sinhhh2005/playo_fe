import axios from "axios";

const API_URL = "http://localhost:5000/api/reviews";

// Lấy tất cả review
export const getAllReviews = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Lấy review theo ID
export const getReviewById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Tạo review mới
export const createReview = async (data: { fieldId: string; userId: string; rating: number; comment: string }) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

// Cập nhật review
export const updateReview = async (id: string, data: Partial<{ rating: number; comment: string }>) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

// Xóa review
export const deleteReview = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
