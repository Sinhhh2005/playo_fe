const API_URL = import.meta.env.VITE_API_URL;

// 🟢 Lấy danh sách tất cả các slot
export const getVenueSlots = async () => {
  try {
    const response = await fetch(`${API_URL}/venueslots`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể tải danh sách slot");
    }

    return {
      success: true,
      data: data.data || [],
      message: data.message || "Lấy danh sách slot thành công",
    };
  } catch (error: any) {
    console.error("❌ getVenueSlots error:", error);
    return { success: false, message: error.message };
  }
};

// 🟢 Lấy chi tiết 1 slot theo ID
export const getVenueSlotById = async (id: string | number) => {
  try {
    const response = await fetch(`${API_URL}/venueslots/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể tải chi tiết slot");
    }

    return {
      success: true,
      data: data.data,
      message: data.message || "Lấy chi tiết slot thành công",
    };
  } catch (error: any) {
    console.error("❌ getVenueSlotById error:", error);
    return { success: false, message: error.message };
  }
};

// 🟢 Tạo slot mới (Admin/Owner)
export const createVenueSlot = async (slotData: any) => {
  try {
    const response = await fetch(`${API_URL}/venueslots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
      body: JSON.stringify(slotData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Tạo slot thất bại");
    }

    return { success: true, data: data.data, message: "Tạo slot thành công" };
  } catch (error: any) {
    console.error("❌ createVenueSlot error:", error);
    return { success: false, message: error.message };
  }
};

// 🟢 Cập nhật slot (Admin/Owner)
export const updateVenueSlot = async (id: string | number, slotData: any) => {
  try {
    const response = await fetch(`${API_URL}/venueslots/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
      body: JSON.stringify(slotData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Cập nhật slot thất bại");
    }

    return { success: true, data: data.data, message: "Cập nhật thành công" };
  } catch (error: any) {
    console.error("❌ updateVenueSlot error:", error);
    return { success: false, message: error.message };
  }
};

// 🟢 Xóa slot (Admin/Owner)
export const deleteVenueSlot = async (id: string | number) => {
  try {
    const response = await fetch(`${API_URL}/venueslots/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Xóa slot thất bại");
    }

    return { success: true, message: data.message || "Xóa slot thành công" };
  } catch (error: any) {
    console.error("❌ deleteVenueSlot error:", error);
    return { success: false, message: error.message };
  }
};
