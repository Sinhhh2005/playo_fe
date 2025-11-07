import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import socket from "../../../utils/socketClient";
import UserLayout from "../../../layouts/UserLayout";
import * as SlotService from "../../../services/slotService";
import type { VenueSlot } from "../../../types/venueslot";
import type { SlotUser } from "../../../types/slotuser";

export default function MatchDetail() {
	const { id } = useParams<{ id: string }>();
	const [game, setGame] = useState<VenueSlot | null>(null);
	const [similarGames, setSimilarGames] = useState<VenueSlot[]>([]);
	const [nearbyVenues, setNearbyVenues] = useState<VenueSlot[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [actionLoading, setActionLoading] = useState(false);

	// ✅ Fetch dữ liệu ban đầu
	useEffect(() => {
		if (!id) {
			setError("Game ID không hợp lệ");
			setLoading(false);
			return;
		}

		const fetchData = async () => {
			try {
				setLoading(true);
				const allSlots = await SlotService.getAllSlots();
				const found = allSlots.find((s) => String(s.id) === id);
				if (!found) throw new Error("Không tìm thấy game");
				setGame(found);

				// Similar games
				const diffSports = allSlots.filter(
					(s) =>
						s.sportId !== found.sportId &&
						s.id !== found.id &&
						s.sportId !== null
				);

				const uniqueSimilarGames = Array.from(
					new Map(
						diffSports.map((item) => [item.venueId, item])
					).values()
				).slice(0, 3);
				setSimilarGames(uniqueSimilarGames);

				// Nearby venues
				const diffDistricts = allSlots.filter(
					(s) =>
						s.id !== found.id &&
						s.venue &&
						found.venue &&
						(s.venue.district || "").toLowerCase() !==
							(found.venue.district || "").toLowerCase()
				);

				const uniqueNearbyVenues = Array.from(
					new Map(
						diffDistricts.map((item) => [item.venueId, item])
					).values()
				).slice(0, 3);
				setNearbyVenues(uniqueNearbyVenues);
			} catch (err: any) {
				console.error("❌ Lỗi khi tải match detail:", err);
				setError(err?.message || "Không thể tải dữ liệu");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	// ⚡️ Lắng nghe realtime từ server
	useEffect(() => {
		if (!id) return;

		socket.on("connect", () => {
			console.log("✅ Connected to Socket.IO:", socket.id);
		});

		socket.on("slotUpdated", (data: any) => {
			console.log("📡 Slot updated:", data);

			if (String(data.slotId) === id) {
				setGame(data.updated);
			}
		});

		return () => {
			socket.disconnect();
		};
	}, [id]);

	const getCurrentUserId = () => localStorage.getItem("userId");

	const isUserJoined = (slot: VenueSlot | null) => {
		if (!slot) return false;
		const uid = getCurrentUserId();
		if (!uid) return false;
		return (
			slot.participants?.some(
				(p: SlotUser) => String(p.userId) === uid
			) ?? false
		);
	};

	const handleToggleJoin = async () => {
		if (!game) return;
		const uid = getCurrentUserId();
		const uname = localStorage.getItem("userName") || "Guest";
		if (!uid) {
			alert("Bạn cần đăng nhập để tham gia.");
			return;
		}

		try {
			setActionLoading(true);
			if (isUserJoined(game)) {
				await SlotService.leaveSlot(String(game.id), { userId: uid });
			} else {
				const current = game.participants?.length || 0;
				const total = game.venue?.stock || 0;
				if (current >= total) {
					alert("⚠️ Trận đấu này đã đủ người tham gia!");
					return;
				}
				await SlotService.joinSlot(String(game.id), {
					userId: uid,
					name: uname,
				});
			}

			// Sau khi join/leave xong, fetch lại state local (phòng khi socket trễ)
			const refreshed = await SlotService.getSlotById(String(game.id));
			setGame(refreshed);
		} catch (err: any) {
			console.error("❌ Join/Leave slot error:", err);
			alert(err.message || "Không thể thực hiện thao tác");
		} finally {
			setActionLoading(false);
		}
	};

	if (loading) return <div className="p-6 text-center">Đang tải...</div>;
	if (error) return <div className="p-6 text-red-500">{error}</div>;
	if (!game) return <div className="p-6">Không tìm thấy game</div>;

	const venue = game.venue;
	const sport = game.sport;
	const image =
		venue?.imgUrl?.[0] ||
		sport?.iconUrl ||
		"https://placehold.co/200x200?text=No+Image";

	const joined = isUserJoined(game);
	const goingCurrent = game.participants?.length || 0;
	const goingTotal = venue?.stock || 0;

	return (
		<UserLayout>
			<div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* LEFT */}
				<div className="lg:col-span-2 space-y-6">
					<div className="bg-white rounded-2xl shadow p-6">
						<div className="flex justify-between items-start">
							<div>
								<h2 className="text-xl font-semibold">
									{sport?.name || "Unknown Sport"}
								</h2>
								<p className="text-gray-500">
									Hosted by {venue?.contactName || "Unknown"}
								</p>
							</div>
							<img
								src={image}
								alt="Venue"
								className="w-12 h-12 rounded-full object-cover"
							/>
						</div>

						<div className="mt-4 space-y-3 text-gray-700">
							<p className="flex items-center">
								<FaCalendarAlt className="mr-2 text-green-600" />
								{game.date} • {game.startTime?.slice(0, 5)} -{" "}
								{game.endTime?.slice(0, 5)}
							</p>
							<p className="flex items-center">
								<FaMapMarkerAlt className="mr-2 text-green-600" />
								{venue?.name} ({venue?.district || "N/A"})
							</p>
						</div>

						<div className="mt-4">
							<button
								onClick={handleToggleJoin}
								disabled={actionLoading}
								className={`px-4 py-2 rounded-lg text-white ${
									joined
										? "bg-red-500 hover:bg-red-600"
										: "bg-green-500 hover:bg-green-600"
								}`}
							>
								{actionLoading
									? joined
										? "Đang hủy..."
										: "Đang tham gia..."
									: joined
									? "Rời trận"
									: "Tham gia trận"}
							</button>
						</div>

						<div className="mt-6 flex flex-wrap items-center gap-3 text-gray-700">
							<div className="flex items-center gap-2">
								<FaUser className="text-green-600" />
								{goingCurrent}/{goingTotal} Người chơi
							</div>
						</div>
					</div>

					{/* Similar Games */}
					<div className="bg-white rounded-2xl shadow p-6">
						<h3 className="font-semibold mb-4">Similar Games</h3>
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{similarGames.map((sim) => (
								<Link key={sim.id} to={`/play/${sim.id}`}>
									<div className="border rounded-xl p-3 hover:shadow-md">
										<img
											src={
												sim.venue?.imgUrl?.[0] ||
												sim.sport?.iconUrl ||
												"https://placehold.co/100x100?text=No+Image"
											}
											alt={sim.venue?.name}
											className="w-full h-28 object-cover rounded-lg"
										/>
										<p className="text-sm font-medium mt-2">
											{sim.sport?.name}
										</p>
										<p className="text-xs text-gray-500">
											{sim.date}
										</p>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>

				{/* RIGHT */}
				<div className="space-y-6">
					<div className="bg-white rounded-2xl shadow p-6">
						<h3 className="font-semibold mb-3">Players</h3>
						{game.participants?.length ? (
							<ul className="space-y-2">
								{game.participants.map((p, i) => (
									<li
										key={i}
										className="flex items-center gap-2 text-sm"
									>
										<FaUser className="text-green-600" />
										{p.user?.name || "Player"}
									</li>
								))}
							</ul>
						) : (
							<p className="text-gray-500 text-sm">
								Chưa có người tham gia
							</p>
						)}
					</div>

					<div className="bg-white rounded-2xl shadow p-6">
						<h3 className="font-semibold mb-3">Venues Nearby</h3>
						<ul className="space-y-3 text-sm text-gray-700">
							{nearbyVenues.map((v) => (
								<Link
									key={v.id}
									to={`/experience-details/venue/${v.venueId}`}
									className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg"
								>
									<img
										src={
											v.venue?.imgUrl?.[0] ||
											v.sport?.iconUrl ||
											"https://placehold.co/100x100?text=No+Image"
										}
										alt={v.venue?.name}
										className="w-10 h-10 rounded-lg object-cover"
									/>
									<div>
										<p>{v.venue?.name}</p>
										<p className="text-xs text-gray-500">
											{v.venue?.district}
										</p>
									</div>
								</Link>
							))}
						</ul>
					</div>
				</div>
			</div>
		</UserLayout>
	);
}
