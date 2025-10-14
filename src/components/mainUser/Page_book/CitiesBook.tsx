import React from "react";

const cities = [
	{
		name: "BANGALORE",
		links: [
			"Sports Complexes in Bangalore",
			"Badminton Courts in Bangalore",
			"Football Grounds in Bangalore",
			"Cricket Grounds in Bangalore",
			"Tennis Courts in Bangalore",
			"Basketball Courts in Bangalore",
			"Table Tennis Clubs in Bangalore",
			"Volleyball Courts in Bangalore",
			"Swimming Pools in Bangalore",
		],
	},
	{
		name: "CHENNAI",
		links: [
			"Sports Complexes in Chennai",
			"Badminton Courts in Chennai",
			"Football Grounds in Chennai",
			"Cricket Grounds in Chennai",
			"Tennis Courts in Chennai",
			"Basketball Courts in Chennai",
			"Table Tennis Clubs in Chennai",
			"Volleyball Courts in Chennai",
			"Swimming Pools in Chennai",
		],
	},
	{
		name: "HYDERABAD",
		links: [
			"Sports Complexes in Hyderabad",
			"Badminton Courts in Hyderabad",
			"Football Grounds in Hyderabad",
			"Cricket Grounds in Hyderabad",
			"Basketball Courts in Hyderabad",
			"Table Tennis Clubs in Hyderabad",
			"Volleyball Courts in Hyderabad",
			"Swimming Pools in Hyderabad",
		],
	},
	{
		name: "BANGALORE",
		links: [
			"Sports Complexes in Bangalore",
			"Badminton Courts in Bangalore",
			"Football Grounds in Bangalore",
			"Cricket Grounds in Bangalore",
			"Tennis Courts in Bangalore",
			"Basketball Courts in Bangalore",
			"Table Tennis Clubs in Bangalore",
			"Volleyball Courts in Bangalore",
			"Swimming Pools in Bangalore",
		],
	},
	{
		name: "CHENNAI",
		links: [
			"Sports Complexes in Chennai",
			"Badminton Courts in Chennai",
			"Football Grounds in Chennai",
			"Cricket Grounds in Chennai",
			"Tennis Courts in Chennai",
			"Basketball Courts in Chennai",
			"Table Tennis Clubs in Chennai",
			"Volleyball Courts in Chennai",
			"Swimming Pools in Chennai",
		],
	},
	{
		name: "HYDERABAD",
		links: [
			"Sports Complexes in Hyderabad",
			"Badminton Courts in Hyderabad",
			"Football Grounds in Hyderabad",
			"Cricket Grounds in Hyderabad",
			"Basketball Courts in Hyderabad",
			"Table Tennis Clubs in Hyderabad",
			"Volleyball Courts in Hyderabad",
			"Swimming Pools in Hyderabad",
		],
	},
];

const SportsComplexes = () => {
	return (
		<section className=" bg-gray-50 py-24 ">
			<div className=" flex flex-col items-start px-24">
				<h2 className="text-xl font-bold mb-8 text-gray-800">
					Top Sports Complexes in Cities
				</h2>

				<div className="grid gap-10">
					{cities.map((city, idx) => (
						<div key={idx}>
							<h3 className="text-base font-semibold mb-2 text-gray-700">
								{city.name}
							</h3>
							<div className="flex flex-wrap gap-x-2 gap-y-1 text-sm max-h-[40px] overflow-hidden">
								{city.links.map((link, i) => (
									<React.Fragment key={i}>
										<a
											href="#"
											className="text-sm text-gray-600 hover:text-green-600 hover:underline"
										>
											{link}
										</a>
										{i !== city.links.length - 1 && (
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
