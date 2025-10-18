// src/types/field.ts

export interface Venue {
  _id: string;
  name: string;
  address: string;
  image?: string;
  phone?: string;
}

export interface Field {
  _id: string;
  name: string;
  type: string;
  price: number;
  pricePerHour?: string | number;
  image?: string;
  status: "OPEN" | "BOOKED" | "LIMITED" | "CLOSED";
  description?: string;
  contactName?: string;
  contactPhone?: string;
  address?: string;       // 👈 thêm dòng này
  createdAt: string;
  updatedAt?: string;

  availableDays?: string[];
}

