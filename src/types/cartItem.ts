export interface CartItem {
	venueId: number;
	slotId: number | null;
	sportId: number; // 🧩 thêm field này
	id: string;
	name: string;
	date: string;
	startTime: string;
	endTime: string;
	duration: number;
	ticketPrice: number;
	totalPrice: number;
	hourly?: number; // 🧩 thêm để backend tính endTime
	status?: "pending" | "paid" | "cancelled";
}