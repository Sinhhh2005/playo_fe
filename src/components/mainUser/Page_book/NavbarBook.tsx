// src/components/mainUser/Page_book/NavbarBook.tsx
import { Link, useNavigate } from "react-router-dom";
import {
	FaRunning,
	FaBaseballBall,
	FaChalkboardTeacher,
	FaUserCircle,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import * as Services from "../../../services/fieldService";
import type { User } from "../../../types/user";
import type { Venue } from "../../../types";

const NavbarBook = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState<Partial<User> | null>(null);
	const [openProfile, setOpenProfile] = useState(false);
	const [openPlaces, setOpenPlaces] = useState(false);
	const [cities, setCities] = useState<string[]>([]);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// 🔹 Check login & fetch user info
	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			// Giả lập call BE để lấy user info
			// Thay bằng API thực tế nếu bạn có endpoint /users/me
			setUser({
				name: localStorage.getItem("userName") || "User",
				role:
					(localStorage.getItem("role") as
						| "user"
						| "owner"
						| "admin") || "user",
			});
		}
	}, []);

	// 🧩 Lấy danh sách thành phố (district / address từ venue)
	useEffect(() => {
		const fetchCities = async () => {
			try {
				const res = await Services.getAllFields();
				const fieldList = Array.isArray(res.data) ? (res.data as Venue[]) : [];

				const cities = fieldList
					.map((item) => {
						const district = item?.district;
						const addressCity = item?.address
							?.split(",")
							.pop()
							?.trim();
						return district || addressCity || "Unknown";
					})
					.filter((city): city is string => typeof city === "string");

				const uniqueCities: string[] = Array.from(new Set(cities));
				setCities(uniqueCities);
			} catch (err) {
				console.error("Error fetching cities:", err);
				setCities([]);
			}
		};
		fetchCities();
	}, []);

	// 🔹 Close dropdowns on click outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setOpenPlaces(false);
			}
			const target = e.target as HTMLElement;
			if (!target.closest(".profile-dropdown")) {
				setOpenProfile(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("role");
		localStorage.removeItem("userName");
		setUser(null);
		setOpenProfile(false);
		navigate("/login");
	};

	return (
		<nav className="w-full bg-white shadow-sm sticky top-0 z-50">
			<div className="mx-auto px-24 py-4 flex items-center justify-between">
				{/* Logo */}
				<Link
					to="/"
					className="flex items-center text-green-600 text-2xl font-bold"
				>
					PLAYO
				</Link>

				<div className="flex gap-12 items-center">
					{/* 📍 Location dropdown */}
					<div
						className="flex items-center gap-2 border-2 border-gray-300 rounded-lg px-3 py-2 relative"
						onClick={() => setOpenPlaces(!openPlaces)}
						ref={dropdownRef}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-5 h-5 text-gray-700"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 
								1.343-3 3 1.343 3 3 3z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 22s8-7.58 8-13a8 8 0 10-16 0c0 5.42 8 13 8 13z"
							/>
						</svg>
						<span className="text-sm text-gray-800">
							{cities[0] || "Select City"}
						</span>

						{openPlaces && (
							<div
								className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-sm w-64 max-h-72 overflow-auto z-50"
								onClick={(e) => e.stopPropagation()}
							>
								<ul>
									{cities.map((city, idx) => (
										<li key={idx}>
											<button
												className="w-full text-left px-4 py-2 hover:bg-gray-100"
												onClick={() =>
													setOpenPlaces(false)
												}
											>
												{city}
											</button>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>

					{/* Get App button */}
					<button className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg px-4 py-2 cursor-pointer">
						Get the App
					</button>

					{/* Menu Center */}
					<div className="flex items-center space-x-12 text-gray-700 text-lg">
						<Link
							to="/play"
							className="flex items-center space-x-2 hover:text-green-600 transition"
						>
							<FaRunning />
							<span>Play</span>
						</Link>
						<Link
							to="/book"
							className="flex items-center space-x-2 hover:text-green-600 transition"
						>
							<FaBaseballBall />
							<span>Book</span>
						</Link>
						<Link
							to="/train"
							className="flex items-center space-x-2 hover:text-green-600 transition"
						>
							<FaChalkboardTeacher />
							<span>Train</span>
						</Link>
					</div>

					{/* User Icon Right */}
					<div className="profile-dropdown relative">
						{!user ? (
							<Link
								to="/login"
								className="flex items-center text-gray-700 hover:text-green-600"
							>
								<FaUserCircle size={28} />
							</Link>
						) : (
							<>
								<button
									onClick={() => setOpenProfile(!openProfile)}
									className="flex items-center text-gray-700 hover:text-green-600"
								>
									<FaUserCircle size={28} />
								</button>
								{openProfile && (
									<div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
										<Link
											to="/profile"
											className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
										>
											Profile
										</Link>

										{/* 🟢 Nếu là admin */}
										{user && user.role === "admin" && (
											<Link
												to="/admin"
												onClick={() =>
													setOpenProfile(false)
												}
												className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
											>
												Admin Dashboard
											</Link>
										)}
										<button
											onClick={handleLogout}
											className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
										>
											Logout
										</button>
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavbarBook;
