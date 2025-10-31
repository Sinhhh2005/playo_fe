import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GiWhistle } from "react-icons/gi";
import type { Sport } from "../../../types/sport";
import * as CategoryService from "../../../services/sportService";

export default function NavBottom() {
	const [categories, setCategories] = useState<Sport[]>([]);

	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchSports = async () => {
			try {
				const res = await CategoryService.getAllSports();
				// ✅ Fix: bỏ điều kiện res.success
				if (res && Array.isArray(res.data)) {
					setCategories(res.data);
				} else {
					console.error("API không trả về danh sách hợp lệ:", res);
				}
			} catch (err) {
				console.error("Lỗi khi fetch sports:", err);
			}
		};
		fetchSports();
	}, []);
	// 🔻 Đóng dropdown khi click ra ngoài
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="w-full shadow-md">
			{/* 🔹 Thanh trên */}
			<div className="flex items-center justify-between border-b border-gray-200 px-24 py-4">
				<div className="flex-1 text-xl font-semibold text-gray-800 truncate">
					Sports Venues in Bangalore: Discover and Book Nearby Venues
				</div>

				{/* Dropdown chọn môn thể thao */}
				<div
					className="flex items-center justify-between px-3 h-10 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition relative"
					ref={dropdownRef}
					onClick={() => setIsOpen(!isOpen)}
				>
					<div className="flex items-center gap-2">
						<GiWhistle className="w-5 h-5 text-gray-700" />
						<span className="text-gray-700 font-medium text-sm">
							All Sports
						</span>
						<ChevronDown className="w-4 h-4 text-gray-700" />
					</div>

					{isOpen && (
						<div className="absolute top-12 right-0 w-[280px] bg-white border border-gray-200 rounded-md shadow-lg z-50">
							<div>
								{categories.map((sport) => (
									<div
										key={sport.id}
										className="flex items-center justify-between gap-3 px-3 py-2 cursor-pointer transition border-b hover:bg-gray-100"
										onClick={() => setIsOpen(false)}
									>
										<div className="flex items-center gap-2">
											<input type="checkbox" />
											<span className="text-gray-700 text-sm font-medium">
												{sport.name}
											</span>
										</div>
										<ChevronRight className="w-5 h-5 text-gray-700" />
									</div>
								))}
							</div>
							<div className="flex justify-end gap-2 p-3">
								<button
									className="cursor-pointer border-2 border-gray-700 px-6 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition"
									onClick={() => setIsOpen(false)}
								>
									Reset
								</button>
								<button
									className="cursor-pointer px-6 py-1 text-sm bg-green-600 text-white rounded transition"
									onClick={() => setIsOpen(false)}
								>
									Apply
								</button>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* 🔹 Tabs */}
			<div className="mt-2 flex items-center justify-between px-24 py-4">
				<span className="font-medium">Venues (21312)</span>
				<div className="flex items-center rounded-md border px-3 h-10">
					<Search className="h-4 w-4 text-gray-400" />
					<input
						type="text"
						placeholder="Search by venue name"
						className="ml-2 w-48 outline-none placeholder:text-sm"
					/>
				</div>
			</div>
		</div>
	);
}
