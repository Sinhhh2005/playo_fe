import { useState, useEffect } from "react";
import * as Services from "../../../../services";
import type { Sport } from "../../../../types";
import { Link } from "react-router-dom";

export default function PopularSports() {
	const [sports, setSports] = useState<Sport[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const limit = 60;
	const page = 1;

	useEffect(() => {
		const fetchSports = async () => {
			try {
				setLoading(true);
				const result = await Services.CategoryService.getAllSports(
					page,
					limit
				);
				setSports(result.data || []);
			} catch (err: unknown) {
				if (err instanceof Error) {
					console.error("❌ PopularSports fetch error:", err.message);
					setError(
						err.message || "Không thể tải danh sách môn thể thao"
					);
				} else {
					console.error("❌ PopularSports fetch unknown error:", err);
					setError("Không thể tải danh sách môn thể thao");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchSports();
	}, []);

	if (loading)
		return <div className="text-center p-10">Đang tải dữ liệu...</div>;
	if (error)
		return <div className="text-center p-10 text-red-500">{error}</div>;

	return (
		<section className="mb-10">
			<h2 className="text-xl font-semibold mb-4">Popular Sports</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
				{sports.map((sport) => (
					<Link
						key={sport.id}
						to={`/book?sportId=${sport.id}`} 
						className="relative h-60 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
					>
						{/* ảnh ưu tiên imgUrl, fallback iconUrl */}
						<img
							src={
								sport.imgUrl ||
								sport.iconUrl ||
								"https://via.placeholder.com/300"
							}
							alt={sport.name}
							className="absolute inset-0 w-full h-full object-cover"
						/>
						<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3">
							<p className="text-white font-semibold">
								{sport.name}
							</p>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}
