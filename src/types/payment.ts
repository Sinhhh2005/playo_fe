import type { Booking } from "./booking";
import type { User } from "./user";

export interface Payment {
	id: number;
	bookingId: number;
	userId: string;
	paymentMethod: "COD" | "BANK" | "STRIPE" | "MOMO" | "VNPAY";
	status: "pending" | "complete" | "failed";
	transactionId?: string | null;
	amount?: number;
	createdAt?: string;
	updatedAt?: string;

	// Quan hệ
	booking?: Booking;
	user?: User;
}