import { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Button } from "../../ui/button";
import * as Services from "../../../services";
import type { Booking } from "../../../types/booking";
import toast from "react-hot-toast";

const BookingsTabs = () => {
	const [activeTab, setActiveTab] = useState<"all" | "cancelled">("all");
	const [bookings, setBookings] = useState<Booking[]>([]);
  console.log(bookings);
  
	const [loading, setLoading] = useState(true);

	const fetchBookings = async () => {
		setLoading(true);
		try {
			const res = await Services.BookingService.getUserBookings();  
			const data = Array.isArray(res) ? res : [];
			setBookings(data);
		} catch (err) {
			console.error("❌ Fetch bookings error:", err);
			toast.error("Không thể tải danh sách đặt sân!");
			setBookings([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBookings();
	}, []);

	const handleCancel = async (id: number | string) => {
		try {
			await Services.BookingService.deleteBooking(id);
			toast.success("Đã huỷ booking thành công!");
			fetchBookings();
		} catch (err) {
			console.error("❌ Cancel booking error:", err);
			toast.error("Không thể huỷ booking này.");
		}
	};

	const statusColor = (status: string) => {
		switch (status) {
			case "pending":
				return "text-yellow-600 bg-yellow-100";
			case "confirmed":
				return "text-green-700 bg-green-100";
			case "cancelled":
				return "text-red-700 bg-red-100";
			default:
				return "text-gray-700 bg-gray-100";
		}
	};

	const filteredBookings =
		activeTab === "all"
			? bookings
			: bookings.filter((b) => b.status === "cancelled");

	return (
		<div className="flex-1 bg-white shadow rounded-lg p-6">
			{/* Tabs */}
			<div className="flex space-x-2 mb-6">
				<button
					onClick={() => setActiveTab("all")}
					className={`px-6 py-2 rounded-lg font-medium ${
						activeTab === "all"
							? "bg-green-600 text-white"
							: "bg-gray-100 text-gray-600 hover:bg-gray-200"
					}`}
				>
					Tất cả
				</button>
				<button
					onClick={() => setActiveTab("cancelled")}
					className={`px-6 py-2 rounded-lg font-medium ${
						activeTab === "cancelled"
							? "bg-green-600 text-white"
							: "bg-gray-100 text-gray-600 hover:bg-gray-200"
					}`}
				>
					Đã huỷ
				</button>
			</div>

			{/* Content */}
			{loading ? (
				<p className="text-gray-600 text-center py-10">Đang tải...</p>
			) : filteredBookings.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-10 border rounded-lg">
					<FaInfoCircle className="text-gray-500 text-xl mb-2" />
					<p className="text-gray-600 text-sm">
						{activeTab === "all"
							? "Chưa có lượt đặt sân nào."
							: "Không có booking bị huỷ."}
					</p>
				</div>
			) : (
				<div className="space-y-4">
					{filteredBookings.map((b) => (
						<div
							key={b.id}
							className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border hover:shadow"
						>
							{/* Info */}
							<div>
								<h3 className="font-semibold text-gray-800">
									{b.venueName || "Unknown Venue"}
								</h3>
								<p className="text-gray-600 text-sm">
									{b.venueLocation}
								</p>
								<p className="text-gray-600 text-sm">
									Ngày: {b.bookingDate} | {b.startTime} -{" "}
									{b.endTime}
								</p>
								<p className="text-gray-600 text-sm">
									Môn: {b.sportName}
								</p>
								<span
									className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(
										b.status
									)}`}
								>
									{b.status}
								</span>
							</div>

							{/* Action */}
							<div className="flex flex-col items-end gap-2">
								<span className="text-green-600 font-bold">
									{Number(b.totalPrice).toLocaleString(
										"vi-VN"
									)}{" "}
									₫
								</span>

								{b.status !== "cancelled" && (
									<Button
										variant="destructive"
										size="sm"
										onClick={() => handleCancel(b.id)}
									>
										Huỷ
									</Button>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default BookingsTabs;
