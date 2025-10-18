export interface Venue {
  _id: string;
  name: string;
  address: string;
  image?: string;
  phone?: string;
}

export type FieldStatus = "OPEN" | "BOOKED" | "LIMITED" | "CLOSED";

export interface Field {
  _id: string;
  name: string;
  type: string; // Ví dụ: "Badminton", "Football"
  price: number;
  pricePerHour?: number | string;
  image?: string;
  status: FieldStatus;
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
