import { Link, useParams } from "react-router-dom";
import { CheckCircle, Clock, Share2 } from "lucide-react";
import { venuesData } from "../../../../data/bookData";
import NavbarBook from "../NavbarBook";
import Breadcrumb from "../../../common/Breadcrumb";
import SportsComplexes from "../CitiesBook";
import Footer from "../../Footer";
import ScrollToTop from "../../../ScrollToTop";
const VenueDetail = () => {
	const { id } = useParams();
	const venue = venuesData.find((v) => v.id === Number(id));

	if (!venue) {
		return <div className="p-6">Venue not found</div>;
	}

	return (
		<section>
			<NavbarBook />
			{/* BREADCRUMB */}
			<Breadcrumb venue={venue} />
			<ScrollToTop />
			{/* MAIN */}
			<h1 className="px-24 text-2xl font-bold text-gray-700">
				Nisha Millets Swimming Academy @ Basecamp BCU
			</h1>
			<div className="flex px-24 py-8 gap-8">
				{/* LEFT CONTENT */}
				<div className="flex-2/3">
					{/* Address + Rating */}
					<div className="flex items-center gap-4 pb-6 font-medium text-gray-300">
						<span className="text-gray-400">Palace Road</span>
						<span className="flex items-center gap-1">
							⭐ 3.6{" "}
							<span className="text-gray-400">(8 ratings)</span>
						</span>
						<a href="#" className="text-green-400 underline">
							Rate Venue
						</a>
					</div>

					{/* Main Image */}
					<div className="rounded-lg overflow-hidden">
						<img
							src={venue.image}
							alt={venue.title}
							className="h-full w-full object-cover"
						/>
					</div>

					{/* Venue Info */}
					<div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
						{/* Sports Available */}
						{venue.sportsAvailable && (
							<div className="border rounded-xl bg-white p-6">
								<h2 className="text-lg font-semibold text-gray-800 mb-3">
									Sports Available{" "}
									<span className="text-gray-500 font-normal text-sm">
										(Click on sports to view price chart)
									</span>
								</h2>
								<div className="flex gap-6 flex-wrap">
									{venue.sportsAvailable.map((s, i) => (
										<div
											key={i}
											className="w-40 h-40 border rounded-lg shadow-sm hover:shadow-md flex flex-col items-center justify-center cursor-pointer"
										>
											<span className="text-4xl mb-3">
												{s.icon}
											</span>
											<span className="text-gray-700 font-medium">
												{s.name}
											</span>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Amenities */}
						{venue.amenities && (
							<div className="border rounded-xl bg-white p-6">
								<h2 className="text-lg font-semibold text-gray-800 mb-3">
									Amenities
								</h2>
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3">
									{venue.amenities.map((a, i) => (
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

						{/* About Venue */}
						{venue.aboutVenue && (
							<div className="border rounded-xl bg-white p-6">
								<h2 className="text-lg font-semibold text-gray-800 mb-3">
									About Venue
								</h2>
								<ul className="list-disc ml-6 space-y-1 text-gray-700">
									{venue.aboutVenue.map((rule, i) => (
										<li key={i}>{rule}</li>
									))}
								</ul>
							</div>
						)}

						{/* Related Venues */}
						{venue.relatedVenues && (
							<div className="border rounded-xl bg-white p-6">
								<h2 className="text-lg font-semibold text-gray-800 mb-3">
									Related To {venue.title}
								</h2>
								<p className="text-gray-600">
									{venue.relatedVenues.join(", ")}
								</p>
							</div>
						)}
					</div>
				</div>

				{/* RIGHT CONTENT */}
				<div className="flex-1/3 flex flex-col gap-4">
					{/* Book Button */}
					<Link
						to={`/booking/${venue.id}`}
						className="flex justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg cursor-pointer"
					>
						Book Now
					</Link>

					{/* Share + Bulk */}
					<div className="flex gap-4">
						<button className="flex-1 border-[2px] border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer">
							<Share2 size={18} /> Share
						</button>
						<button className="flex-1 text-green-600 font-medium border-[2px] border-green-600 py-2 rounded-lg cursor-pointer">
							Bulk / Corporate
						</button>
					</div>

					{/* Timing */}
					<div className="border border-gray-200 rounded-lg p-4">
						<h3 className="text-lg font-semibold mb-2">Timing</h3>
						<p className="text-gray-700 flex items-center gap-2">
							<Clock size={18} /> 8 AM - 9 PM
						</p>
					</div>

					{/* Location */}
					<div className="border border-gray-200 rounded-lg p-4 space-y-3">
						<h3 className="text-lg font-semibold">Location</h3>
						<p className="text-sm text-gray-300">
							Sports Block (behind Freedom park), Dr Manmohan
							Singh Bengaluru City University, Palace Road,
							Bangalore - 560009 (Main Entrance gate next to
							Cauvery Bhavana Bus stand on google maps)
						</p>
						<div>
							<p className="text-gray-300">{venue.location}</p>
							{/* Google map embed */}
							<iframe
								src="https://www.google.com/maps/embed?pb=..."
								width="100%"
								height="250"
								style={{ border: 0 }}
								loading="lazy"
								allowFullScreen
							></iframe>
						</div>
					</div>
				</div>
			</div>
			<SportsComplexes />
			<Footer />
		</section>
	);
};

export default VenueDetail;
