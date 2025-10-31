import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFieldById } from "../../../../services/fieldService";
import * as VenueSlotService from "../../../../services/venusSlotService";
import type { VenueSlot } from "../../../../types";
import type { Venue } from "../../../../types";
import type { CartItem } from "../../../../types";

import { Plus, Minus } from "lucide-react";

interface SportBookingSystemProps {
	onAddToCart?: (item: CartItem) => void;
	isBooked?: boolean;
}

const SportBookingSystem: React.FC<SportBookingSystemProps> = ({
	onAddToCart,
	isBooked = false,
}) => {
	const { id } = useParams<{ id: string }>();
	const [field, setField] = useState<Venue | null>(null);
	
	const [slots, setSlots] = useState<VenueSlot[]>([]);	
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [date, setDate] = useState<string>(
		new Date().toISOString().split("T")[0]
	);
	const [selectedSlot, setSelectedSlot] = useState<VenueSlot | null>(null);

	const [duration, setDuration] = useState<number>(120);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const fieldRes = await getFieldById(id!);
				const slotRes = await VenueSlotService.getVenueSlots();
				setField(fieldRes);
				const relatedSlots = slotRes.filter(
					(s) => s.venueId === fieldRes.id
				);
				setSlots(relatedSlots);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("Không thể tải thông tin sân");
				}
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [id]);

	if (loading)
		return (
			<div className="text-center mt-20 text-blue-600 animate-pulse">
				Đang tải...
			</div>
		);
	if (error) return <div className="text-center text-red-600">{error}</div>;
	if (!field)
		return (
			<div className="text-center text-gray-500">Không tìm thấy sân</div>
		);

	const pricePerHour = Number(field.pricePerHour || 0);
	const ticketPrice = Math.round((pricePerHour * duration) / 60);

	const handleAdd = () => {
		if (!field || !selectedSlot || !selectedSlot.startTime) return;

		// ✅ giờ đã chắc chắn selectedSlot.startTime có giá trị
		const [h, m, s] = selectedSlot.startTime.split(":").map(Number);
		const startDate = new Date();
		startDate.setHours(h, m, s);
		startDate.setMinutes(startDate.getMinutes() + duration);

		const endTime = `${startDate
			.getHours()
			.toString()
			.padStart(2, "0")}:${startDate
			.getMinutes()
			.toString()
			.padStart(2, "0")}:${startDate
			.getSeconds()
			.toString()
			.padStart(2, "0")}`;

		const item: CartItem = {
			venueId: field.id,
			slotId: selectedSlot.id,
			sportId: field.sport?.id || 0,
			id: String(field.id),
			name: field.name,
			date,
			startTime: selectedSlot.startTime,
			endTime,
			duration,
			ticketPrice,
			totalPrice: ticketPrice,
			hourly: duration / 60,
			status: "pending",
		};
		onAddToCart?.(item);
		alert("✅ Đã thêm vào giỏ hàng!");
	};
	const handleDurationChange = (delta: number) =>
		setDuration((prev) => Math.max(30, prev + delta));

	return (
		<div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
			<h1 className="text-2xl font-bold text-blue-800 mb-2">
				{field.name}
			</h1>
			<p className="text-gray-600 mb-4">{field.address}</p>
			<div className="bg-yellow-100 text-yellow-800 text-center py-2 rounded-lg mb-4 font-semibold">
				Giá sân: {pricePerHour.toLocaleString()}đ / giờ
			</div>

			<div className="flex flex-col gap-4 mt-6 text-gray-800">
				<div>
					<span className="font-semibold text-blue-700">
						Môn thể thao:
					</span>
					<div className="border rounded-lg px-3 py-2 mt-1">
						{field.sport?.name}
					</div>
				</div>

				<div>
					<span className="font-semibold text-blue-700">Ngày:</span>
					<div className="flex items-center border rounded-lg px-3 py-2 mt-1">
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className="bg-transparent outline-none w-full"
							disabled={isBooked}
						/>
						{/* <Calendar className="text-blue-600 ml-2" size={20} /> */}
					</div>
				</div>

				<div>
					<span className="font-semibold text-blue-700">
						Chọn giờ:
					</span>
					<select
						value={selectedSlot?.id || ""}
						onChange={(e) => {
							const s =
								slots.find(
									(x) => x.id === Number(e.target.value)
								) || null;
							setSelectedSlot(s);
						}}
						className="w-full border rounded-lg px-3 py-2 mt-1"
						disabled={isBooked}
					>
						<option value="">-- Chọn khung giờ --</option>
						{slots.map((slot) => (
							<option key={slot.id} value={slot.id}>
								{slot.startTime} - {slot.endTime}
							</option>
						))}
					</select>
				</div>

				<div>
					<span className="font-semibold text-blue-700">
						Thời lượng:
					</span>
					<div className="flex items-center justify-between mt-1 border rounded-lg px-3 py-2">
						<button
							onClick={() => handleDurationChange(-30)}
							className="bg-gray-100 p-2 rounded-full hover:bg-gray-200"
							disabled={isBooked}
						>
							<Minus size={18} />
						</button>
						<span>{duration} phút</span>
						<button
							onClick={() => handleDurationChange(30)}
							className="bg-green-500 p-2 rounded-full text-white hover:bg-green-600"
							disabled={isBooked}
						>
							<Plus size={18} />
						</button>
					</div>
				</div>
			</div>

			<button
				onClick={handleAdd}
				disabled={isBooked || !selectedSlot}
				className={`mt-6 w-full py-3 font-semibold rounded-xl transition-all duration-200 ${
					isBooked
						? "bg-gray-300 text-gray-500 cursor-not-allowed"
						: "bg-blue-700 text-white hover:bg-blue-800"
				}`}
			>
				{isBooked ? "Đã có sân trong giỏ hàng" : "Thêm vào giỏ hàng"}
			</button>
		</div>
	);
};

export default SportBookingSystem;
