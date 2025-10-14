import { useState } from "react";
import DealsCard from "../../components/mainUser/Page_book/DealsCard";
import EventsCard from "../../components/mainUser/Page_book/EventsCard";
import NavbarBook from "../../components/mainUser/Page_book/NavbarBook";
import NavBottom from "../../components/mainUser/Page_book/NavBottom";
import VenuesCard from "../../components/mainUser/Page_book/VenuesCard";
import SportsComplexes from "../../components/mainUser/Page_book/CitiesBook";

import type { Event, Venue, Deal } from "../../types/book";
import { venuesData, eventsData, dealsData } from "../../data/bookData";

import Footer from "../../components/mainUser/Footer";

type ActiveTab = "venues" | "events" | "deals";
const ITEMS_PER_PAGE = 3;

const Book = () => {
	const [activeTab, setActiveTab] = useState<ActiveTab>("venues");
	const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);



	// Reset visible items khi tab thay đổi
	const handleTabChange = (tab: ActiveTab) => {
		setActiveTab(tab);
		setVisibleItems(ITEMS_PER_PAGE);
	};

	const getCurrentData = () => {
		switch (activeTab) {
			case "venues":
				return venuesData;
			case "events":
				return eventsData;
			case "deals":
				return dealsData;
			default:
				return [];
		}
	};

	const currentData = getCurrentData();
	const visibleData = currentData.slice(0, visibleItems);
	const hasMore = visibleItems < currentData.length;

	const showMore = () => {
		setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
	};

	const renderContent = () => {
		switch (activeTab) {
			case "venues":
				return (
					<div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
						{visibleData.map((venue) => (
							<VenuesCard key={venue.id} venue={venue as Venue} />
						))}
					</div>
				);

			case "events":
				return (
					<div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{visibleData.map((event) => (
							<EventsCard key={event.id} event={event as Event} />
						))}
					</div>
				);

			case "deals":
				return (
					<div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{visibleData.map((deal) => (
							<DealsCard key={deal.id} deal={deal as Deal} />
						))}
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div>
			<NavbarBook />
			<NavBottom activeTab={activeTab} onTabChange={handleTabChange} />
			<div className="flex flex-col items-center px-24 py-12 gap-[64px] bg-[#f1f3f2]">
				<div className="">{renderContent()}</div>
				{/* Show More Button (chỉ hiển thị khi có nhiều items) */}
				{/* Show More Button - chỉ hiển thị khi còn item */}
				{hasMore && (
					<div className="text-center">
						<button
							onClick={showMore}
							className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg px-6 py-3 w-40 cursor-pointer transition-colors"
						>
							Show More
						</button>
						<p className="text-gray-500 text-sm mt-2">
							Showing {visibleData.length} of {currentData.length}{" "}
							items
						</p>
					</div>
				)}
			</div>
			<SportsComplexes />
			<Footer />
		</div>
	);
};

export default Book;
