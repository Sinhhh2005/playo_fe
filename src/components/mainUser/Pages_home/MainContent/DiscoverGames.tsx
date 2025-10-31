import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	FaMapMarkerAlt,
	FaChevronLeft,
	FaChevronRight,
	FaClock,
} from "react-icons/fa";
import * as SlotService from "../../../../services/slotService";
import type { VenueSlot } from "../../../../types";

export default function DiscoverGames() {
	const [slots, setSlots] = useState<VenueSlot[]>([]);
	const [startIndex, setStartIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const itemsPerPage = 4;

	useEffect(() => {
		const fetchSlots = async () => {
			try {
				setLoading(true);
				const data = await SlotService.getAllSlots();

				// 🧩 Lọc những slot có venue & sport hợp lệ
				const valid = data.filter((s) => s.venue && s.sport);
				setSlots(valid);
			} catch (err: unknown) {
				if (err instanceof Error) {
					console.error("❌ DiscoverGames fetch error:", err.message);
					setError(err.message);
				} else {
					console.error("❌ DiscoverGames fetch unknown error:", err);
					setError("Không thể tải danh sách trận đấu");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchSlots();
	}, []);

	const handlePrev = () => {
		setStartIndex((prev) =>
			prev === 0 ? Math.max(slots.length - itemsPerPage, 0) : prev - 1
		);
	};

	const handleNext = () => {
		setStartIndex((prev) =>
			prev + itemsPerPage >= slots.length ? 0 : prev + 1
		);
	};

	if (loading)
		return (
			<div className="p-10 text-center">
				Đang tải danh sách trận đấu...
			</div>
		);
	if (error)
		return <div className="p-10 text-center text-red-500">{error}</div>;
	if (slots.length === 0)
		return (
			<div className="p-10 text-center text-gray-500">
				Chưa có trận đấu nào.
			</div>
		);

	return (
		<section className="mb-10">
			{/* Header */}
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-semibold">Discover Games</h2>
				<Link
					to="/play"
					className="text-green-600 text-sm font-medium hover:underline"
				>
					SEE ALL GAMES
				</Link>
			</div>

			{/* Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
				{slots
					.slice(startIndex, startIndex + itemsPerPage)
					.map((slot) => {
						const venue = slot.venue;
						const sport = slot.sport;
						const participants = slot.participants || [];
						const currentPlayers = participants.length;
						const totalSlots = venue?.stock || 0;

						const image =
							venue?.imgUrl?.[0] ||
							sport?.iconUrl ||
							"https://placehold.co/200x200?text=No+Image";

						const dateDisplay = slot.date
							? new Date(slot.date).toLocaleDateString("vi-VN")
							: "Chưa có ngày";

						const timeDisplay =
							slot.startTime && slot.endTime
								? `${slot.startTime.slice(
										0,
										5
								  )} - ${slot.endTime.slice(0, 5)}`
								: "Chưa có giờ";

						const status = slot.isAvailable
							? currentPlayers > 0
								? "OPEN"
								: "AVAILABLE"
							: "BOOKED";

						return (
							<Link
								key={slot.id}
								to={`/play/${slot.id}`}
								className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-4 block"
							>
								{/* Sport */}
								<p className="text-sm text-gray-500 mb-2 font-medium">
									{sport?.name || "Unknown Sport"}
								</p>

								{/* Venue */}
								<div className="flex items-center mb-2">
									<img
										src={image}
										alt={sport?.name}
										className="w-8 h-8 rounded-full mr-2 object-cover"
									/>
									<div>
										<p className="text-sm font-semibold text-gray-800">
											{venue?.name || "Unnamed Venue"}
										</p>
										<p className="text-xs text-gray-600">
											{venue?.district || "Unknown area"}
										</p>
									</div>
								</div>

								{/* Date & Time */}
								<p className="flex items-center text-sm text-gray-700 mb-2">
									<FaClock className="mr-2 text-gray-500" />
									{dateDisplay}, {timeDisplay}
								</p>

								{/* Address */}
								<p className="flex items-center text-sm text-gray-600 mb-2">
									<FaMapMarkerAlt className="mr-2 text-gray-500" />
									{venue?.address ||
										venue?.district ||
										"Unknown location"}
								</p>

								{/* Status & Level */}
								<div className="flex justify-between items-center">
									<span className="text-xs border rounded-full px-3 py-1 text-gray-700">
										{slot.level || "All Levels"}
									</span>
									<span
										className={`text-xs px-2 py-1 rounded font-medium ${
											status === "BOOKED"
												? "bg-green-100 text-green-700 border border-green-600"
												: status === "OPEN" ||
												  status === "AVAILABLE"
												? "bg-blue-100 text-blue-700 border border-blue-500"
												: "bg-gray-100 text-gray-600 border border-gray-400"
										}`}
									>
										{status}
									</span>
								</div>

								{/* Participants */}
								<div className="mt-2 text-xs text-gray-600">
									{currentPlayers}/{totalSlots} người tham gia
								</div>
							</Link>
						);
					})}
			</div>

			{/* Navigation */}
			<div className="flex justify-center mt-6 space-x-4">
				<button
					onClick={handlePrev}
					className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
				>
					<FaChevronLeft />
				</button>
				<button
					onClick={handleNext}
					className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
				>
					<FaChevronRight />
				</button>
			</div>
		</section>
	);
}
