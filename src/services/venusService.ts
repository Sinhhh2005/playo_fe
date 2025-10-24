const API_URL = import.meta.env.VITE_API_URL;

// 🟢 Lấy danh sách sân (venus)
export const getVenus = async () => {
  try {
    const response = await fetch(`${API_URL}/venus`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể tải danh sách sân");
    }

    return {
      success: true,
      data: data.data || [],
      message: data.message || "Lấy danh sách sân thành công",
    };
  } catch (error: any) {
    console.error("❌ getVenus error:", error);
    return { success: false, message: error.message };
  }
};

// 🟢 Lấy chi tiết 1 sân
export const getVenueById = async (id: string | number) => {
  try {
    const response = await fetch(`${API_URL}/venus/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể tải chi tiết sân");
    }

    return {
      success: true,
      data: data.data,
      message: data.message || "Lấy chi tiết sân thành công",
    };
  } catch (error: any) {
    console.error("❌ getVenueById error:", error);
    return { success: false, message: error.message };
  }
};

// 🟢 Thêm sân mới (Admin)
export const createVenue = async (venueData: any) => {
  try {
    const response = await fetch(`${API_URL}/venus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
      body: JSON.stringify(venueData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Tạo sân thất bại");
    }

    return { success: true, data: data.data, message: "Tạo sân thành công" };
  } catch (error: any) {
    console.error("❌ createVenue error:", error);
    return { success: false, message: error.message };
  }
};

// 🟢 Cập nhật sân (Admin)
export const updateVenue = async (id: string | number, venueData: any) => {
  try {
    const response = await fetch(`${API_URL}/venus/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
      body: JSON.stringify(venueData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Cập nhật sân thất bại");
    }

    return { success: true, data: data.data, message: "Cập nhật thành công" };
  } catch (error: any) {
    console.error("❌ updateVenue error:", error);
    return { success: false, message: error.message };
  }
};

// 🟢 Xóa sân (Admin)
export const deleteVenue = async (id: string | number) => {
  try {
    const response = await fetch(`${API_URL}/venus/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Xóa sân thất bại");
    }

    return { success: true, message: data.message || "Xóa sân thành công" };
  } catch (error: any) {
    console.error("❌ deleteVenue error:", error);
    return { success: false, message: error.message };
  }
};
