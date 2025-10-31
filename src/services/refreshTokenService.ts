import axiosClient from "../utils/axiosClient";
import type { RefreshToken } from "../types";

const API_URL = "/refresh-tokens";

/**

* 🧩 Interface cho việc tạo refresh token
* Cho phép FE gửi userId hoặc token tuỳ cấu trúc BE
  */
  export interface CreateRefreshTokenInput {
  userId: string;
  token?: string;
  expiresAt?: string; // ISO datetime
  [key: string]: string | number | undefined;
  }

/**

* 🟢 Lấy tất cả refresh tokens (Admin)
  */
  export const getAllRefreshTokens = async (): Promise<RefreshToken[]> => {
  const res = await axiosClient.get(API_URL);
  return res.data.data || res.data;
  };

/**

* 🔍 Lấy refresh token theo ID
  */
  export const getRefreshTokenById = async (
  id: string | number
  ): Promise<RefreshToken> => {
  const res = await axiosClient.get(`${API_URL}/${id}`);
  return res.data.data || res.data;
  };

/**

* ✳️ Tạo refresh token mới
  */
  export const createRefreshToken = async (
  data: CreateRefreshTokenInput
  ): Promise<RefreshToken> => {
  const res = await axiosClient.post(API_URL, data);
  return res.data.data || res.data;
  };

/**

* 🗑️ Xóa refresh token
  */
  export const deleteRefreshToken = async (
  id: string | number
  ): Promise<{ message: string }> => {
  const res = await axiosClient.delete(`${API_URL}/${id}`);
  return res.data;
  };
