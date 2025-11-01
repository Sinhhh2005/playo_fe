import type { Venue } from "./venue";
import type { Sport } from "./sport";
import type { Booking } from "./booking";
import type { SlotUser } from "./slotuser";
import type { User } from "./user";


export interface VenueSlot {
  id: number;
  venueId: number;
  sportId?: number | null;
  level?: string;
  listUsers?: User[];
  date?: string;
  startTime?: string;
  endTime?: string;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;

  // ✅ Participants = danh sách SlotUser có chứa user
  participants?: SlotUser[];

  // Relations
  venue?: Venue;
  sport?: Sport;
  bookings?: Booking[];
  slotUsers?: SlotUser[];
}