import React from "react";
import { Card, CardContent } from "../../ui/card";
import type { Event } from "../../../types/book";
import { Link } from "react-router-dom";

interface EventsCardProps {
	event: Event;
}

const EventsCard: React.FC<EventsCardProps> = ({ event }) => {
	return (
		<Link to={`/book/${event.id}`}>
			<Card className="overflow-hidden rounded-xl shadow hover:shadow-lg transition-shadow">
				{/* Image */}
				<div className="h-44 w-full overflow-hidden">
					<img
						src={event.image}
						alt={event.title}
						className="h-full w-full object-cover hover:scale-105 transition-transform"
					/>
				</div>

				{/* Content */}
				<CardContent className="p-4">
					<h3 className="text-base font-semibold text-gray-800 truncate">
						{event.title}
					</h3>
					<p className="text-sm text-green-600 font-medium">
						{event.org}
					</p>
					<p className="text-sm text-gray-600">{event.time}</p>
					<p className="text-sm text-gray-500">{event.details}</p>
				</CardContent>
			</Card>
		</Link>
	);
};

export default EventsCard;
