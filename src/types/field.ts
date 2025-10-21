export interface Venue {
  _id: string;
  name: string;
  address: string;
  image?: string;
  phone?: string;
}

export interface FieldRequest {
  _id: string;
  name: string;
  type: string; // Ví dụ: "Badminton", "Football"
  status: "Pending" | "Approved" | "Rejected";
  price: number;
  pricePerHour?: number | string;
  image?: string;
  description?: string;
  contactName?: string;
  contactPhone?: string;
  address?: string; // 👈 thêm dòng này để hiển thị địa chỉ sân
  createdAt: string;
  updatedAt?: string;
  availableDays?: string[];

  // Nếu bạn muốn liên kết field -> venue:
  venue?: Venue;
}
