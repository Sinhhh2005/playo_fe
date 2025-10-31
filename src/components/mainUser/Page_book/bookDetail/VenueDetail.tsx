// src/components/mainUser/Page_book/bookDetail/VenueDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Clock, Share2, MapPin, Phone } from "lucide-react";
import NavbarBook from "../NavbarBook";
import Breadcrumb from "../../../common/Breadcrumb";
import SportsComplexes from "../CitiesBook";
import Footer from "../../Footer";
import ScrollToTop from "../../../ScrollToTop";
import * as FieldService from "../../../../services/fieldService";
import type { Venue } from "../../../../types";

const fallbackImage = "https://via.placeholder.com/400x250?text=No+Image";

export default function VenueDetail() {
	const { id } = useParams<{ id: string }>();
	const [venue, setVenue] = useState<Venue | null>(null);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) {
			setError("Venue ID không hợp lệ");
			setLoading(false);
			return;
		}

		const fetchVenue = async () => {
			try {
				setLoading(true);
				const data = await FieldService.getFieldById(id);

				// ⚙️ Map chuẩn dữ liệu từ backend về FE
				const mappedVenue: Venue = {
					id: data.id,
					sportId: data.sportId,
					ownerUserId: data.ownerUserId,
					address: data.address,
					district: data.district,
					latitude: data.latitude,
					longitude: data.longitude,
					name: data.name,
					desShort: data.desShort,
					description: data.description,
					contactPhone: data.contactPhone,
					contactName: data.contactName,
					pricePerHour: data.pricePerHour,
					stock: data.stock,
					imgUrl: Array.isArray(data.imgUrl)
						? (data.imgUrl.flat() as string[]) // 🧩 làm phẳng mảng nếu lồng nhau
						: data.imgUrl
						? [data.imgUrl]
						: [fallbackImage],
					timeActive: data.timeActive,
					amenities: data.amenities,
					status: data.status,
					sport: data.sport,
					owner: data.owner,
					createdAt: data.createdAt,
					updatedAt: data.updatedAt,
				};

				setVenue(mappedVenue);
			} catch (err: unknown) {
				console.error("❌ Lỗi khi fetch venue:", err);
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("Không thể tải venue");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchVenue();
	}, [id]);

	if (loading) return <div className="p-6 text-center">Đang tải sân...</div>;
	if (error)
		return <div className="p-6 text-center text-red-500">{error}</div>;
	if (!venue)
		return <div className="p-6 text-center">Không tìm thấy sân</div>;

	const image = venue.imgUrl?.[0] || fallbackImage;
	const sport = venue.sport;
	const sportName = sport?.name || "Không xác định";
	const sportIcon = sport?.iconUrl || undefined;

	const openTime = venue.timeActive?.open || "06:00";
	const closeTime = venue.timeActive?.close || "22:00";

	const locationText = venue.address || venue.district || "Không rõ địa chỉ";

	return (
		<section>
			<NavbarBook />
			<Breadcrumb venue={venue} />
			<ScrollToTop />

			{/* Title + sport badge */}
			<div className="px-24 mt-4">
				<div className="flex items-center gap-4">
					<h1 className="text-2xl font-bold text-gray-700">
						{venue.name}
					</h1>

					{/* Sport badge */}
					<div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
						{sportIcon ? (
							<img
								src={sportIcon}
								alt={sportName}
								className="w-6 h-6 rounded-full object-cover"
								onError={(e) => {
									(
										e.currentTarget as HTMLImageElement
									).style.display = "none";
								}}
							/>
						) : (
							<span className="text-sm text-gray-600 font-medium">
								{sportName[0]}
							</span>
						)}
						<span className="text-sm text-gray-700 font-medium">
							{sportName}
						</span>
					</div>
				</div>
			</div>

			<div className="flex px-24 py-8 gap-8">
				{/* LEFT CONTENT */}
				<div className="flex-[2] space-y-8">
					{/* Ảnh chính */}
					<div className="rounded-lg overflow-hidden shadow">
						<img
							src={image}
							alt={venue.name}
							className="h-full w-full object-cover rounded-lg"
						/>
					</div>

					{/* Sport quick info */}
					<div className="border rounded-xl bg-white p-6">
						<h2 className="text-lg font-semibold text-gray-800 mb-3">
							Môn thể thao
						</h2>
						<div className="flex items-center gap-4">
							{sportIcon ? (
								<img
									src={sportIcon}
									alt={sportName}
									className="w-14 h-14 rounded-md object-cover"
								/>
							) : (
								<div className="w-14 h-14 rounded-md bg-gray-100 flex items-center justify-center">
									<span className="text-lg text-gray-600">
										{sportName?.[0]}
									</span>
								</div>
							)}
							<div>
								<p className="font-semibold text-gray-800">
									{sportName}
								</p>
								{/* nếu backend có mô tả cho sport */}
								{sport?.description && (
									<p className="text-sm text-gray-600 mt-1">
										{sport.description}
									</p>
								)}
							</div>
						</div>
					</div>

					{/* Thông tin mô tả */}
					{venue.description && (
						<div className="border rounded-xl bg-white p-6">
							<h2 className="text-lg font-semibold text-gray-800 mb-3">
								Giới thiệu sân
							</h2>
							<p className="text-gray-700 leading-relaxed whitespace-pre-line">
								{venue.description}
							</p>
						</div>
					)}

					{/* Tiện ích */}
					{venue.amenities && venue.amenities.length > 0 && (
						<div className="border rounded-xl bg-white p-6">
							<h2 className="text-lg font-semibold text-gray-800 mb-3">
								Tiện ích
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3">
								{venue.amenities.map((a: string, i: number) => (
									<div
										key={i}
										className="flex items-center gap-2"
									>
										<CheckCircle
											className="text-green-500"
											size={20}
										/>
										<span className="text-gray-700">
											{a}
										</span>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* RIGHT CONTENT */}
				<div className="flex-[1] flex flex-col gap-4">
					{/* Book Button */}
					<Link
						to={`/booking/${venue.id}`}
						state={{ venue }}
						className="flex justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg cursor-pointer"
					>
						Đặt sân ngay
					</Link>

					{/* Share + Bulk */}
					<div className="flex gap-4">
						<button className="flex-1 border-[2px] border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer">
							<Share2 size={18} /> Chia sẻ
						</button>
						<button className="flex-1 text-green-600 font-medium border-[2px] border-green-600 py-2 rounded-lg cursor-pointer">
							Doanh nghiệp
						</button>
					</div>

					{/* Giá & Thời gian */}
					<div className="border border-gray-200 rounded-lg p-4 space-y-2">
						<h3 className="text-lg font-semibold mb-1">
							Thông tin
						</h3>
						<p className="text-gray-700 flex items-center gap-2">
							<Clock size={18} /> {openTime} - {closeTime}
						</p>
						<p className="text-gray-700 font-medium">
							Giá:{" "}
							<span className="text-green-600 font-semibold">
								{Number(venue.pricePerHour || 0).toLocaleString(
									"vi-VN"
								)}
								₫ / giờ
							</span>
						</p>
						<p className="text-gray-500 text-sm">
							Sức chứa: {venue.stock} người
						</p>
					</div>

					{/* Liên hệ & Địa chỉ */}
					<div className="border border-gray-200 rounded-lg p-4 space-y-3">
						<h3 className="text-lg font-semibold">Liên hệ</h3>
						{venue.contactName && (
							<p className="flex items-center gap-2 text-gray-700">
								<Phone size={16} /> {venue.contactName}
							</p>
						)}
						{venue.contactPhone && (
							<p className="flex items-center gap-2 text-gray-700">
								📞 {venue.contactPhone}
							</p>
						)}
						<div className="flex items-start gap-2 text-gray-600 text-sm mt-2">
							<MapPin size={16} className="mt-[2px]" />
							<span>{locationText}</span>
						</div>

						{/* Bản đồ Google Map */}
						{locationText && (
							<iframe
								src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
									locationText
								)}`}
								width="100%"
								height="250"
								style={{ border: 0 }}
								loading="lazy"
								allowFullScreen
							></iframe>
						)}
					</div>
				</div>
			</div>

			<SportsComplexes />
			<Footer />
		</section>
	);
}
