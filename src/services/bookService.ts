// src/services/bookService.ts
import axiosClient from "../utils/axiosClient";

const BASE_URL = "/fields"; // ✅ tương ứng backend router.use("/fields", fieldRoutes)

/**
 * 🟢 Lấy danh sách sân (venues)
 * - GET /api/fields/venues
 */
export const getVenues = async () => {
  try {
    const res = await axiosClient.get(`${BASE_URL}/venues`);
    return { success: true, message: "Lấy danh sách sân thành công", data: res.data };
  } catch (err: any) {
    console.error("❌ Lỗi khi tải danh sách sân:", err);
    return { success: false, message: err.response?.data?.message || "Không thể tải danh sách sân", data: [] };
  }
};

/**
 * 🟢 Lấy chi tiết sân theo ID
 * - GET /api/fields/venue/:id
 */
export const getVenueById = async (id: string) => {
  try {
    const res = await axiosClient.get(`${BASE_URL}/venue/${id}`);
    return { success: true, message: "Lấy thông tin sân thành công", data: res.data };
  } catch (err: any) {
    console.error("❌ Lỗi khi tải thông tin sân:", err);
    return { success: false, message: err.response?.data?.message || "Không thể tải thông tin sân", data: null };
  }
};
