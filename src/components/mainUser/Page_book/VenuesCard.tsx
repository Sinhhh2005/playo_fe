import React from "react";
import { Card, CardContent } from "../../ui/card";
import type { Venue } from "../../../types/book";
import { Link } from "react-router-dom";

interface VenuesCardProps {
	venue: Venue;
}

const VenuesCard: React.FC<VenuesCardProps> = ({ venue }) => {
	return (
		<Link to={`/experience-details/venue/${venue.id}`}>
			<Card className="overflow-hidden rounded-xl shadow hover:shadow-lg transition-shadow">
				<div className="flex flex-col">
					{/* Image */}
					<div className="flex-shrink-0 overflow-hidden">
						<img
							src={venue.image}
							alt={venue.title}
							className="h-full w-full object-cover"
						/>
					</div>

					{/* Content */}
					<CardContent className="p-4 flex-1">
						<div className="flex justify-between items-start mb-2">
							<div>
								{venue.featured && (
									<span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium mb-2 inline-block">
										Featured
									</span>
								)}
								<h3 className="text-base font-semibold text-gray-800">
									{venue.title}
								</h3>
								<p className="text-sm text-gray-600">
									{venue.location}({venue.distance})
								</p>
							</div>
							<div className="text-right">
								<div className="flex items-center gap-1">
									<span className="text-yellow-500">★</span>
									<span className="text-sm font-medium">
										{venue.rating}
									</span>
								</div>
								<span className="text-xs text-gray-500">
									({venue.reviews})
								</span>
							</div>
						</div>

						<p className="text-sm text-gray-700 mb-3">
							{venue.type}
						</p>

						<button className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg px-4 py-2 w-full cursor-pointer transition-colors">
							Bookable
						</button>
					</CardContent>
				</div>
			</Card>
		</Link>
	);
};

export default VenuesCard;
