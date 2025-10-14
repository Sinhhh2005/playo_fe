import { useState } from "react";
import { Calendar, Clock, Plus, Minus } from "lucide-react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../../../components/ui/select";

const SportBookingSystem = () => {
	const [selectedSport, setSelectedSport] = useState("swimming");
	const [selectedDate, setSelectedDate] = useState("2025-10-05");
	const [selectedTime, setSelectedTime] = useState("04:00 PM");
	const [duration, setDuration] = useState(1);
	const [ticketCount, setTicketCount] = useState(0);
	const [selectedCourt, setSelectedCourt] = useState("");
	const [showCalendar, setShowCalendar] = useState(false);
	const [showTimeSlots, setShowTimeSlots] = useState(false);

	const sports = [
		{ id: "swimming", name: "Swimming", icon: "🏊" },
		{ id: "pickleball", name: "Pickleball", icon: "🎾" },
	];

	const timeSlots = [
		"12:30 PM",
		"01:00 PM",
		"01:30 PM",
		"02:00 PM",
		"02:30 PM",
		"03:00 PM",
		"03:30 PM",
		"04:00 PM",
		"04:30 PM",
		"05:00 PM",
	];

	const courts = [
		{ id: "premium1", name: "Premium Court 1", price: 3495 },
		{
			id: "advanced1",
			name: "Advanced 50 Meter Outdoor Pool 1",
			price: 450,
		},
	];

	const venues = {
		swimming: {
			name: "Nisha Millets Swimming Academy @ Basecamp BCU",
			location: "Palace Road",
			banner: "Pool is 7 Feet Deep throughout. No Beginners. This pool is only for lap swimming & triathlon training for continuous swimmers.",
		},
		pickleball: {
			name: "Pickl - The Social Club",
			location: "Safina Plaza",
			banner: "Earn 3 karma points on every booking!",
		},
	};

	const currentVenue = venues[selectedSport];
	const ticketPrice = selectedSport === "swimming" ? 450 : 3495;
	const totalPrice = ticketCount * ticketPrice;

	const handleIncreaseDuration = () => {
		if (selectedSport === "pickleball") {
			setDuration((prev) => prev + 0.5);
		} else {
			setDuration((prev) => prev + 1);
		}
	};

	const handleDecreaseDuration = () => {
		if (selectedSport === "pickleball") {
			setDuration((prev) => Math.max(0.5, prev - 0.5));
		} else {
			setDuration((prev) => Math.max(1, prev - 1));
		}
	};

	const formatDuration = (dur: any) => {
		if (dur < 1) {
			return `${dur * 60} Mins`;
		}
		const hours = Math.floor(dur);
		const mins = (dur - hours) * 60;
		if (mins === 0) {
			return `${hours} Hr${hours > 1 ? "s" : ""}`;
		}
		return `${hours} Hr ${mins} Mins`;
	};

	const generateCalendarDays = () => {
		const days = [];
		for (let i = 1; i <= 31; i++) {
			days.push(i);
		}
		return days;
	};

	return (
		<div className="">
			<Card className="max-w-4xl mx-auto">
				<CardHeader className="border-b">
					<CardTitle className="text-2xl font-bold text-gray-800">
						{currentVenue.name}
					</CardTitle>
					<p className="text-gray-600 text-sm">
						{currentVenue.location}
					</p>
					<div className="mt-3 bg-green-500 text-white p-3 rounded-lg text-center font-medium">
						{currentVenue.banner}
					</div>
				</CardHeader>

				<CardContent className="space-y-6 mt-6">
					{/* Sports Selection */}
					<div className="grid grid-cols-3 gap-4 items-center">
						<label className="text-lg font-semibold text-gray-700">
							Sports
						</label>
						<div className="col-span-2">
							<Select
								value={selectedSport}
								onValueChange={setSelectedSport}
							>
								<SelectTrigger className="w-full">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{sports.map((sport) => (
										<SelectItem
											key={sport.id}
											value={sport.id}
										>
											<span className="flex items-center gap-2">
												<span>{sport.icon}</span>
												<span>{sport.name}</span>
											</span>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Date Selection */}
					<div className="grid grid-cols-3 gap-4 items-center">
						<label className="text-lg font-semibold text-gray-700">
							Date
						</label>
						<div className="col-span-2 relative">
							<div
								className="flex items-center justify-between border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
								onClick={() => setShowCalendar(!showCalendar)}
							>
								<span>{selectedDate}</span>
								<Calendar className="w-5 h-5 text-gray-500" />
							</div>

							{showCalendar && (
								<div className="absolute top-full mt-2 left-0 right-0 bg-white border rounded-lg shadow-lg p-4 z-10">
									<div className="flex items-center justify-between mb-4">
										<button className="p-2 hover:bg-gray-100 rounded">
											&lt;
										</button>
										<span className="font-semibold">
											October 2025
										</span>
										<button className="p-2 hover:bg-gray-100 rounded">
											&gt;
										</button>
									</div>
									<div className="grid grid-cols-7 gap-2 text-center">
										{[
											"Sun",
											"Mon",
											"Tue",
											"Wed",
											"Thu",
											"Fri",
											"Sat",
										].map((day) => (
											<div
												key={day}
												className="text-sm font-medium text-gray-600 p-2"
											>
												{day}
											</div>
										))}
										{generateCalendarDays().map((day) => (
											<button
												key={day}
												className={`p-2 rounded-full hover:bg-gray-100 ${
													day === 5
														? "bg-green-500 text-white hover:bg-green-600"
														: ""
												}`}
												onClick={() => {
													setSelectedDate(
														`2025-10-${day
															.toString()
															.padStart(2, "0")}`
													);
													setShowCalendar(false);
												}}
											>
												{day}
											</button>
										))}
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Start Time */}
					<div className="grid grid-cols-3 gap-4 items-center">
						<label className="text-lg font-semibold text-gray-700">
							Start Time
						</label>
						<div className="col-span-2 relative">
							<div
								className="flex items-center justify-between border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
								onClick={() => setShowTimeSlots(!showTimeSlots)}
							>
								<span>{selectedTime}</span>
								<Clock className="w-5 h-5 text-gray-500" />
							</div>

							{showTimeSlots && (
								<div className="absolute top-full mt-2 left-0 right-0 bg-white border rounded-lg shadow-lg p-4 z-10 max-h-64 overflow-y-auto">
									<div className="grid grid-cols-2 gap-2">
										{timeSlots.map((time) => (
											<button
												key={time}
												className={`p-3 rounded-lg text-center ${
													time === selectedTime
														? "bg-green-500 text-white"
														: "hover:bg-gray-100 border"
												}`}
												onClick={() => {
													setSelectedTime(time);
													setShowTimeSlots(false);
												}}
											>
												{time}
											</button>
										))}
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Duration */}
					<div className="grid grid-cols-3 gap-4 items-center">
						<label className="text-lg font-semibold text-gray-700">
							Duration
						</label>
						<div className="col-span-2 flex items-center justify-between">
							<button
								onClick={handleDecreaseDuration}
								className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
							>
								<Minus className="w-5 h-5" />
							</button>
							<span className="text-lg font-medium">
								{formatDuration(duration)}
							</span>
							<button
								onClick={handleIncreaseDuration}
								className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
							>
								<Plus className="w-5 h-5" />
							</button>
						</div>
					</div>

					{/* Court/Pool Selection */}
					{selectedSport === "pickleball" && (
						<div className="grid grid-cols-3 gap-4 items-start">
							<label className="text-lg font-semibold text-gray-700">
								Court
							</label>
							<div className="col-span-2">
								<Select
									value={selectedCourt}
									onValueChange={setSelectedCourt}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="--Select Court--" />
									</SelectTrigger>
									<SelectContent>
										{courts.map((court) => (
											<SelectItem
												key={court.id}
												value={court.id}
											>
												<div className="flex justify-between w-full">
													<span>{court.name}</span>
													<span className="text-gray-500 ml-4">
														INR {court.price}
													</span>
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
					)}

					{/* Ticket Selection for Swimming */}
					{selectedSport === "swimming" && (
						<div className="border-t pt-6">
							<div className="flex justify-between items-center mb-4">
								<div>
									<h3 className="font-semibold text-gray-800">
										Advanced 50 Meter Outdoor Pool 1
									</h3>
									<p className="text-sm text-gray-600">
										INR {ticketPrice}.00 / Ticket
									</p>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="text-2xl font-bold text-green-500">
									INR {totalPrice.toFixed(2)}
								</div>
								<div className="flex items-center gap-4">
									<button
										onClick={() =>
											setTicketCount(
												Math.max(0, ticketCount - 1)
											)
										}
										className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
									>
										<Minus className="w-5 h-5" />
									</button>
									<span className="text-xl font-medium w-8 text-center">
										{ticketCount}
									</span>
									<button
										onClick={() =>
											setTicketCount(ticketCount + 1)
										}
										className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
									>
										<Plus className="w-5 h-5" />
									</button>
								</div>
							</div>
						</div>
					)}

					{/* Add to Cart Button */}
					<div className="pt-6">
						<Button
							className="w-full py-6 text-lg bg-gray-300 hover:bg-gray-400 text-gray-600"
							disabled={
								selectedSport === "swimming"
									? ticketCount === 0
									: !selectedCourt
							}
						>
							Add To Cart
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default SportBookingSystem;
