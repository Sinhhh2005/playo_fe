import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GiWhistle } from "react-icons/gi";
import { categories } from "../../../data/categoriesData";

const tabs = [
	{
		id: "venues",
		label: "Venues",
		des: "Sports Venues in Bangalore: Discover and Book Nearby Venues",
		count: 1037,
	},
	{
		id: "events",
		label: "Events",
		des: "Find All events and tournaments in Bangalore",
		count: 2,
	},
	{
		id: "deals",
		label: "Deals",
		des: "Discover the Best Deals on Gaming Equipment, Game Clothing, Health Instruments and More in Bangalore",
		count: 31,
	},
];

interface NavBottomProps {
	activeTab: "venues" | "events" | "deals";
	onTabChange: (tab: "venues" | "events" | "deals") => void;
}

export default function NavBottom({ activeTab, onTabChange }: NavBottomProps) {
	// Tìm tab đang active
	const activeTabData = tabs.find((tab) => tab.id === activeTab);
	const [isOpen, setIsOpen] = useState(false);

	const dropdownRef = useRef<HTMLDivElement>(null);
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
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="w-full shadow-md">
			<div className="flex items-center justify-between border-b border-gray-200 px-24 py-4">
				{/* Left: Description chiếm hết phần còn lại */}
				<div className="flex-1 text-xl font-semibold text-gray-800 truncate">
					{activeTabData?.des}
				</div>

				{/* Right: Search + Dropdown */}
				<div className="flex items-center gap-3 ">
					{/* Search */}
					<div className="flex items-center rounded-md border px-3 h-10">
						<Search className="h-4 w-4 text-gray-400" />
						<input
							type="text"
							placeholder="Search by venue name"
							className="ml-2 w-48 outline-none placeholder:text-sm"
						/>
					</div>

					{/* Dropdown */}
					<div
						className="flex items-center justify-between px-3 h-10 border border-gray-200 rounded-md  cursor-pointer hover:bg-gray-50 transition relative "
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
						{/* Dropdown Menu */}
						{isOpen && (
							<div className="absolute top-12 right-0 w-[280px] bg-white border border-gray-200 rounded-md shadow-lg z-50">
								{/* Categories List */}
								<div className="">
									{categories.map((category) => (
										<div
											key={category.name}
											className="flex items-center justify-between gap-3 px-3 py-2  cursor-pointer transition border-b-[1px] hover:bg-gray-100"
											onClick={() => {
												console.log(
													`Selected: ${category.name}`
												);
												setIsOpen(false);
											}}
										>
											<div className="flex items-center gap-2">
												<input type="checkbox" />
												<span className="text-gray-700 text-sm font-medium">
													{category.name}
												</span>
											</div>
											<ChevronRight className="w-5 h-5 text-gray-700 " />
										</div>
									))}
								</div>

								{/* Divider */}

								{/* Action Buttons */}
								<div className="flex justify-end gap-2 p-3">
									<button
										className="cursor-pointer border-2 border-gray-700 px-6 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition"
										onClick={() => {
											console.log("Reset clicked");
											setIsOpen(false);
										}}
									>
										Reset
									</button>
									<button
										className="cursor-pointer  px-6 py-1 text-sm bg-green-600 text-white rounded transition"
										onClick={() => {
											console.log("Apply clicked");
											setIsOpen(false);
										}}
									>
										Apply
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Tabs */}
			<div className="mt-2 flex gap-6 px-24 py-4">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() =>
							onTabChange(tab.id as "venues" | "events" | "deals")
						}
						className={`relative pb-2 text-sm font-medium ${
							activeTab === tab.id
								? "text-green-600"
								: "text-gray-600 hover:text-black"
						}`}
					>
						{tab.label} ({tab.count})
						{activeTab === tab.id && (
							<span className="absolute left-0 bottom-0 h-[2px] w-full bg-green-600" />
						)}
					</button>
				))}
			</div>
		</div>
	);
}
