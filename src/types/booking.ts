import type { User } from "./user";
import type { Venue } from "./venue";
import type { VenueSlot } from "./venueslot";
import type { Sport } from "./sport";
import type { Payment } from "./payment";
import type { Review } from "./review";

export interface Booking {
  id: number;
  venueId: number;
  userId: string;
  slotId?: number | null;
  sportId?: number | null;
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: "pending" | "confirmed" | "cancelled";
  hourly: boolean;
  ticketPrice: number;
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
  venueName: string;
  venueLocation: string;
  sportName: string;

  // Relations
  user?: User;
  venue?: Venue;
  slot?: VenueSlot;
  sport?: Sport;
  payment?: Payment;
  review?: Review;
}