import type { VenueSlot } from "./venueslot";
import type { User } from "./user";

export interface SlotUser {
  id: number;
  slotId: number;
  userId: string;
  role: "member" | "default" | "guest";
  createdAt?: string;
  updatedAt?: string;

  // Relations
  slot?: VenueSlot;
  user?: User;
}