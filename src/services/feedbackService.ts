import axiosClient from "../utils/axiosClient";
import type { AxiosError } from "axios";

interface FeedbackResponse {
  success: boolean;
  message: string;
}

/**
 * Gửi feedback từ người dùng
 */
export const sendFeedback = async (
  feedback: string
): Promise<FeedbackResponse> => {
  try {
    const { data } = await axiosClient.post<FeedbackResponse>("/feedback", {
      message: feedback,
    });

    return {
      success: true,
      message: data.message || "Feedback sent!",
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    console.error("❌ Feedback error:", err);

    const message =
      err.response?.data?.message || err.message || "Gửi feedback thất bại";

    return { success: false, message };
  }
};