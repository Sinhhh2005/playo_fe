// User
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Role
export interface Role {
  id: string;
  name: string;
  description?: string;
}

// UserRole
export interface UserRole {
  id: string;
  userId: string;
  roleId: string;
  user?: User;
  role?: Role;
}

// Profile
export interface Profile {
  id: string;
  userId: string;
  phone?: string;
  address?: string;
  bio?: string;
  avatarUrl?: string;
  user?: User;
}

// Category
export interface Category {
  id: string;
  name: string;
  description?: string;
}

// Position
export interface Position {
  id: string;
  name: string;
  latitude?: number;
  longitude?: number;
}

// Field
export interface Field {
  id: string;
  name: string;
  categoryId: string;
  positionId: string;
  category?: Category;
  position?: Position;
}

// Slot
export interface Slot {
  id: string;
  fieldId: string;
  startTime: string;
  endTime: string;
  status: "available" | "booked" | "unavailable";
  field?: Field;
}

// Booking
export interface Booking {
  id: string;
  userId: string;
  slotId: string;
  status: "pending" | "confirmed" | "cancelled";
  user?: User;
  slot?: Slot;
}

// Payment
export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: string;
  status: "pending" | "paid" | "failed";
  booking?: Booking;
}

// Review
export interface Review {
  id: string;
  userId: string;
  fieldId: string;
  rating: number; // 1–5
  comment?: string;
  user?: User;
  field?: Field;
}

// RefreshToken
export interface RefreshToken {
  id: string;
  userId: string;
  token: string;
  expiryDate: string;
  user?: User;
}
