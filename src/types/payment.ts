import type { Booking } from "./booking";
import type { User } from "./user";

export interface Payment {
  id: number;
  bookingId: number;
  userId: string;
  paymentMethod: string;
  status: "pending" | "complete" | "failed";
  transactionId?: string | null;
  createdAt?: string;
  updatedAt?: string;

  // Relations
  booking?: Booking;
  user?: User;
}