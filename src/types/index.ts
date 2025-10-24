export type { User } from "./user";
export type { Category } from "./book";
export type { Field } from "./field";

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
  user?: import("./user").User;
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
  user?: import("./user").User;
}

// Position
export interface Position {
  id: string;
  name: string;
  latitude?: number;
  longitude?: number;
}

// Slot
export interface Slot {
  id: string;
  fieldId: string;
  startTime: string;
  endTime: string;
  status: "available" | "booked" | "unavailable";
  isAvailable?: boolean;
  field?: import("./field").Field;
}

export interface Booking {
  id: string;
  userId: string;
  slotId: string;
  venueId: string | number;
  venueName: string;
  sportName: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  price: number;
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
  rating: number;
  comment?: string;
  user?: import("./user").User;
  field?: import("./field").Field;
}

// RefreshToken
export interface RefreshToken {
  id: string;
  userId: string;
  token: string;
  expiryDate: string;
  user?: import("./user").User;
}

// Sport
export interface Sport {
  id: string | number;
  name: string;
  description: string;
  imgUrl?: string;
  iconUrl?: string;
}
