// src/services/category.ts
import type { Category } from "../types/book"; 

const API_URL = import.meta.env.VITE_API_URL + "/categories/ports";

// 🔹 Helper type trả về chuẩn cho tất cả service
interface ServiceResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// 🟢 Lấy tất cả categories
export const getAllCategories = async (): Promise<ServiceResponse<Category[]>> => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to fetch categories");

    return {
      success: true,
      data: Array.isArray(data) ? data : data.data || [],
      message: data.message || "Categories fetched successfully",
    };
  } catch (error: any) {
    console.error("❌ getAllCategories error:", error);
    return { success: false, data: [], message: error.message || "Error fetching categories" };
  }
};

// 🟢 Lấy category theo ID
export const getCategoryById = async (id: string): Promise<ServiceResponse<Category | null>> => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to fetch category");

    return {
      success: true,
      data: data || null,
      message: data.message || "Category fetched successfully",
    };
  } catch (error: any) {
    console.error("❌ getCategoryById error:", error);
    return { success: false, data: null, message: error.message || "Error fetching category" };
  }
};

// 🟢 Tạo mới category
export const createCategory = async (category: { name: string; imgUrl?: string }): Promise<ServiceResponse<Category | null>> => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to create category");

    return { success: true, data: data || null, message: data.message || "Category created successfully" };
  } catch (error: any) {
    console.error("❌ createCategory error:", error);
    return { success: false, data: null, message: error.message || "Error creating category" };
  }
};

// 🟢 Cập nhật category
export const updateCategory = async (id: string, category: { name?: string; imgUrl?: string }): Promise<ServiceResponse<Category | null>> => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to update category");

    return { success: true, data: data || null, message: data.message || "Category updated successfully" };
  } catch (error: any) {
    console.error("❌ updateCategory error:", error);
    return { success: false, data: null, message: error.message || "Error updating category" };
  }
};

// 🟢 Xóa category
export const deleteCategory = async (id: string): Promise<ServiceResponse<Category | null>> => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to delete category");

    return { success: true, data: data || null, message: data.message || "Category deleted successfully" };
  } catch (error: any) {
    console.error("❌ deleteCategory error:", error);
    return { success: false, data: null, message: error.message || "Error deleting category" };
  }
};
