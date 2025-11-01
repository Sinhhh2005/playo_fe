import type { Sport } from "./sport";
import type { User } from "./user";
import type { Booking } from "./booking";
import type { VenueSlot } from "./venueslot";
import type { Review } from "./review";

export interface Venue {
  id: number;
  sportId: number;
  ownerUserId?: string | null;
  address: string;
  district?: string;
  latitude?: number;
  longitude?: number;
  mapUrl?: string;
  name: string;
  desShort?: string;
  description?: string;
  contactPhone?: string;
  contactName?: string;
  pricePerHour: number;
  stock: number;
  imgUrl?: string[]; // vì kiểu JSON
  timeActive?: Record<string, string>;
  amenities?: string[];
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;

  // Relations
  sport?: Sport;
  owner?: User;
  bookings?: Booking[];
  slots?: VenueSlot[];
  reviews?: Review[];
}