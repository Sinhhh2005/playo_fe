import type { Booking } from "./booking";
import type { User } from "./user";
import type { Venue } from "./venue";

export interface Review {
  id: number;
  bookingId: number;
  userId: string;
  venueId: number;
  rating: number;
  comment?: string;
  createdAt?: string;
  updatedAt?: string;

  // Relations
  booking?: Booking;
  user?: User;
  venue?: Venue;
}