import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import * as Services from "../../../../services/fieldService";
import type { Venue } from "../../../../types";
import socket from "../../../../utils/socketClient";

export default function BookVenues() {
	const [venues, setVenues] = useState<Venue[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [startIndex, setStartIndex] = useState(0);
	const visibleCount = 4; // số sân hiển thị cùng lúc

	// 📡 Fetch sân từ backend
	useEffect(() => {
		const fetchVenues = async () => {
			try {
				setLoading(true);
				const res = await Services.getAllFields(1, 100);
				setVenues(res.data || []);
			} catch (err) {
				console.error("❌ Lỗi khi fetch venues:", err);
				setError("Không thể tải danh sách sân, vui lòng thử lại.");
			} finally {
				setLoading(false);
			}
		};
		fetchVenues();

		// 🔥 Lắng nghe realtime từ socket (vd: sân mới được thêm)
		socket.on("newVenueAdded", (newVenue: Venue) => {
			setVenues((prev) => [newVenue, ...prev]);
		});

		return () => {
			socket.off("newVenueAdded");
		};
	}, []);

	// 🧮 Tính danh sách sân hiển thị hiện tại
	const visibleVenues = useMemo(() => {
		return venues.slice(startIndex, startIndex + visibleCount);
	}, [venues, startIndex]);

	// ⏮️ Nút Previous
	const handlePrev = () => {
		setStartIndex((prev) =>
			prev === 0 ? Math.max(venues.length - visibleCount, 0) : prev - 1
		);
	};

	// ⏭️ Nút Next
	const handleNext = () => {
		setStartIndex((prev) =>
			prev + visibleCount >= venues.length ? 0 : prev + 1
		);
	};

	// 💡 Loading Skeleton
	if (loading)
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
				{Array.from({ length: visibleCount }).map((_, i) => (
					<div key={i} className="bg-gray-100 h-48 rounded-lg"></div>
				))}
			</div>
		);

	if (error)
		return <div className="p-6 text-center text-red-500">{error}</div>;

	if (!venues.length)
		return (
			<div className="p-6 text-center text-gray-500">Chưa có sân nào.</div>
		);

	return (
		<section className="mb-10">
			{/* Tiêu đề */}
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-semibold">Book Venues</h2>
				<Link
					to="/book"
					className="text-green-600 text-sm font-medium hover:underline"
				>
					SEE ALL VENUES
				</Link>
			</div>

			{/* 🏟️ Danh sách sân */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-300">
				{visibleVenues.map((venue) => {
					const avgRating =
						venue.reviews && venue.reviews.length > 0
							? (
									venue.reviews.reduce(
										(sum, r) => sum + (r.rating || 0),
										0
									) / venue.reviews.length
							  ).toFixed(1)
							: "4.5";

					return (
						<Link
							key={venue.id}
							to={`/experience-details/venues/${venue.id}`}
							className="bg-white rounded-xl shadow p-3 hover:shadow-lg transition block"
						>
							{/* Hình ảnh */}
							<div className="relative mb-2">
								<img
									src={
										venue.imgUrl?.[0] ||
										"https://source.unsplash.com/400x250/?sports,stadium"
									}
									alt={venue.name}
									className="w-full h-36 object-cover rounded-lg"
								/>
								{venue.status === "active" && (
									<span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
										ACTIVE
									</span>
								)}
							</div>

							{/* Thông tin sân */}
							<h3 className="font-semibold text-sm truncate">
								{venue.name}
							</h3>
							<p className="text-xs text-gray-500 truncate">
								{venue.district ||
									venue.address ||
									"Không rõ địa chỉ"}
							</p>

							<div className="flex justify-between items-center mt-2">
								<span className="flex items-center text-xs text-green-600 font-medium">
									<FaStar className="mr-1 text-yellow-400" />
									{avgRating}
								</span>
								<span className="text-sm font-semibold">
									{venue.pricePerHour
										? `${Number(
												venue.pricePerHour
										  ).toLocaleString()}₫/h`
										: "Miễn phí"}
								</span>
							</div>
						</Link>
					);
				})}
			</div>

			{/* 📄 Nút chuyển */}
			{venues.length > visibleCount && (
				<div className="flex justify-center mt-4 space-x-4">
					<button
						onClick={handlePrev}
						className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow"
					>
						<FaChevronLeft />
					</button>
					<button
						onClick={handleNext}
						className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow"
					>
						<FaChevronRight />
					</button>
				</div>
			)}
		</section>
	);
}
