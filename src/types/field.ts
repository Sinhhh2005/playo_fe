import type { Slot } from "./index";

// 🏟️ Venue: thông tin khu thể thao (nhiều sân bên trong)
export interface Venue {
  id: string;
  name: string;
  address: string;
  image?: string;
  phone?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ⚽ Field: từng sân cụ thể thuộc 1 venue
export interface Field {
  id: number | string;
  name: string;
  type: string; // Ví dụ: "Badminton", "Football"
  price: number;
  pricePerHour?: number | string;
  status?: "Pending" | "Approved" | "Rejected";

  image?: string;
  imgUrl?: string;
  description?: string;
  address?: string;
  availableDays?: string[];

  contactName?: string;
  contactPhone?: string;

  createdAt?: string;
  updatedAt?: string;

  slots?: Slot[];

  // Thông tin mở rộng
  sportId?: number;

  // ✅ Đổi từ category → sport cho đúng với backend
  sport?: {
    id?: number | string;
    name?: string;
  };

  // ✅ Thêm owner để hiển thị chủ sân
  owner?: {
    id?: number | string;
    fullName?: string;
    email?: string;
    phone?: string;
  };

  category?: {
  id?: number | string;
  name?: string;
  imgUrl?: string | string[];
  }; 
  venue?: {
    id: string;
    name: string;
    address?: string;
    image?: string;
    phone?: string;
  };
}

// 📝 Dùng khi gửi request (POST/PUT) lên server
export interface FieldRequest {
  name: string;
  type: string;
  price: number;
  pricePerHour?: number | string;
  description?: string;
  address?: string;
  contactName?: string;
  contactPhone?: string;
  availableDays?: string[];
  venueId?: string;
}

