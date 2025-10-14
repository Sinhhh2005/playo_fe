import React from "react";
import { Card, CardContent } from "../../ui/card";
import type { Deal } from "../../../types/book";
import { Link } from "react-router-dom";

interface DealsCardProps {
	deal: Deal;
}
const DealsCard: React.FC<DealsCardProps> = ({ deal }) => {
	return (
		<Link to={`/book/${deal.id}`}>
			<Card
				key={deal.id}
				className="overflow-hidden rounded-xl shadow hover:shadow-lg transition-shadow"
			>
				{/* Image */}
				<div className="h-44 w-full overflow-hidden">
					<img
						src={deal.image}
						alt={deal.title}
						className="h-full w-full object-cover hover:scale-105 transition-transform"
					/>
				</div>

				{/* Content */}
				<CardContent className="p-4">
					<h3 className="text-base font-semibold text-gray-800 truncate">
						{deal.title}
					</h3>
					<p className="text-sm text-green-600 font-medium">
						{deal.org}
					</p>
					<p className="text-sm text-gray-600">{deal.time}</p>
					<p className="text-sm text-gray-500">{deal.details}</p>
				</CardContent>
			</Card>
		</Link>
	);
};

export default DealsCard;
