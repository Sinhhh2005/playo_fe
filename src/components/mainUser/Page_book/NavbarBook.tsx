import { Link, useNavigate } from "react-router-dom";
import {
	FaRunning,
	FaBaseballBall,
	FaChalkboardTeacher,
	FaUserCircle,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const NavbarBook = () => {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUserName] = useState("User");
	const [open, setOpen] = useState(false);

	const [openPlaces, setOpenPlaces] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// 🔹 Đóng dropdown khi click ra ngoài
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setOpenPlaces(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		const role = localStorage.getItem("role");
		if (token && role) {
			setIsLoggedIn(true);
			setUserName(localStorage.getItem("userName") || "User");
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("role");
		localStorage.removeItem("userName");
		setIsLoggedIn(false);
		setOpen(false);
		navigate("/login");
	};

	// 🔹 Đóng dropdown khi click ra ngoài
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (!target.closest(".profile-dropdown")) {
				setOpen(false);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	return (
		<nav className="w-full bg-white shadow-sm sticky top-0 z-50">
			<div className=" mx-auto px-24 py-4 flex items-center justify-between">
				{/* Logo */}
				<Link
					to="/"
					className="flex items-center text-green-600 text-2xl font-bold"
				>
					PLAYO
				</Link>

				<div className="flex gap-12 items-center">
					{/* Location box */}
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
						<span className="text-sm text-gray-800">Bangalore</span>

						{openPlaces && (
							<div
								className="absolute bottom-[-62px] left-0 bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2 w-80"
								onClick={(e) => e.stopPropagation()}
							>
								<div className="border rounded-lg px-3 py-2 flex items-center justify-between  border-gray-200">
									{/* Search input */}
									<div className="flex items-center gap-2 flex-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={2}
											stroke="currentColor"
											className="w-5 h-5 text-gray-500"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
											/>
										</svg>
										<input
											type="text"
											placeholder="Select for cities, places ..."
											className="outline-none w-full text-sm text-gray-700"
										/>
									</div>

									{/* Locate icon */}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="currentColor"
										className="w-5 h-5 text-green-500"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 6v6h4m6 0a10 10 0 11-20 0 10 10 0 0120 0z"
										/>
									</svg>
								</div>
							</div>
						)}
					</div>

					{/* Button */}
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
					<div>
						{!isLoggedIn ? (
							<Link
								to="/login"
								className="flex items-center text-gray-700 hover:text-green-600"
							>
								<FaUserCircle size={28} />
							</Link>
						) : (
							<div className="relative profile-dropdown">
								<button
									onClick={() => setOpen(!open)}
									className="flex items-center text-gray-700 hover:text-green-600"
								>
									<FaUserCircle size={28} />
								</button>

								{open && (
									<div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
										<Link
											to="/profile"
											className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
										>
											My Profile
										</Link>
										<button
											onClick={handleLogout}
											className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
										>
											Logout
										</button>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavbarBook;
