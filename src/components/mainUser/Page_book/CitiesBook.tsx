import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Services from "../../../services/fieldService";

type SimpleVenue = {
	id: number;
	name: string;
	city: string;
	type: string;
};

const fallbackCities = [
	{
		name: "BANGALORE",
		links: [
			"Sports Complexes in Bangalore",
			"Badminton Courts in Bangalore",
			"Football Grounds in Bangalore",
		],
	},
	{
		name: "CHENNAI",
		links: [
			"Sports Complexes in Chennai",
			"Badminton Courts in Chennai",
			"Football Grounds in Chennai",
		],
	},
	{
		name: "HYDERABAD",
		links: [
			"Sports Complexes in Hyderabad",
			"Badminton Courts in Hyderabad",
			"Football Grounds in Hyderabad",
		],
	},
];

const SportsComplexes: React.FC = () => {
	const [venues, setVenues] = useState<SimpleVenue[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchVenues = async () => {
			try {
				const res = await Services.getAllFields(1, 50); // ✅ lấy tối đa 50 sân

				if (res.success && Array.isArray(res.data)) {
					const mapped = res.data.map((v: { id: number; name: string; district?: string }) => ({
						id: v.id,
						name: v.name,
						city: v.district || "Unknown",
						type: v.name || "Sports Complex",
					}));
					setVenues(mapped);
				} else {
					setVenues([]);
				}
			} catch (err) {
				console.error("Error fetching venues:", err);
				setVenues([]);
			} finally {
				setLoading(false);
			}
		};

		fetchVenues();
	}, []);

	if (loading)
		return <div className="p-6 text-center">Loading venues...</div>;

	const citiesMap =
		venues.length > 0
			? Array.from(
					venues.reduce((acc, v) => {
						if (!acc.has(v.city)) acc.set(v.city, []);
						acc.get(v.city)?.push(v);
						return acc;
					}, new Map<string, SimpleVenue[]>())
			  ).map(([name, list]) => ({ name, venues: list }))
			: fallbackCities.map((c) => ({
					name: c.name,
					venues: c.links.map((l, i) => ({
						id: i,
						name: l,
						type: "Sports",
					})),
			  }));

	return (
		<section className="bg-gray-50 py-24">
			<div className="flex flex-col items-start px-24">
				<h2 className="text-xl font-bold mb-8 text-gray-800">
					Top Sports Complexes in Cities
				</h2>

				<div className="grid gap-10 w-full">
					{citiesMap.map((city, idx) => (
						<div key={idx}>
							<h3 className="text-base font-semibold mb-2 text-gray-700">
								{city.name}
							</h3>
							<div className="flex flex-wrap gap-x-2 gap-y-1 text-sm max-h-[40px] overflow-hidden">
								{city.venues.map((venue, i: number) => (
									<React.Fragment key={i}>
										<Link
											to={`/experience-details/${venue.type}/${venue.id}`}
											className="text-sm text-gray-600 hover:text-green-600 hover:underline"
										>
											{venue.name}
										</Link>
										{i !== city.venues.length - 1 && (
											<span className="text-gray-400">
												·
											</span>
										)}
									</React.Fragment>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default SportsComplexes;
