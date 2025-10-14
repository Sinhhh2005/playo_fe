import { Outlet } from "react-router-dom";

const OwnerLayout = () => {
	return (
		<div className="flex h-screen">
			{/* SIDEBAR */}
			<aside className="w-64 bg-gray-800 text-white fixed top-0 left-0 h-full shadow-lg">
				<div className="p-4 font-bold text-lg border-b border-gray-700">
					LOGO PLAYO_BOOKING
				</div>
				<nav className="p-4 space-y-2">
					<a href="#" className="block p-2 hover:bg-gray-700 rounded">
						📌 Dashboard (tổng quan)
					</a>
					<a href="#" className="block p-2 hover:bg-gray-700 rounded">
						🏟️ Quản lý sân
					</a>
					<a href="#" className="block p-2 hover:bg-gray-700 rounded">
						⏰ Quản lý khung giờ
					</a>
					<a href="#" className="block p-2 hover:bg-gray-700 rounded">
						📅 Quản lý đặt sân
					</a>
					<a href="#" className="block p-2 hover:bg-gray-700 rounded">
						⭐ Quản lý đánh giá
					</a>
					<a href="#" className="block p-2 hover:bg-gray-700 rounded">
						💰 Xem doanh thu
					</a>
				</nav>
			</aside>

			{/* MAIN */}
			<div className="flex-1 ml-64 flex flex-col">
				{/* HEADER */}
				<header className="fixed top-0 left-64 right-0 h-16 bg-white shadow flex items-center justify-between px-6 z-10">
					<div className="flex items-center gap-2">
						<button className="p-2 hover:bg-gray-100 rounded">
							☰
						</button>
						<span className="text-sm text-gray-500">
							Table / Data Table
						</span>
					</div>
					<div className="flex items-center gap-4">
						<span className="text-sm">26 °C</span>
						<button>🌐</button>
						<div className="w-8 h-8 rounded-full bg-gray-300"></div>
					</div>
				</header>

				{/* CONTENT + FOOTER */}
				<div className="mt-16 flex flex-col w-full h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50">
					<main className="flex-1 p-6">
						<Outlet />
					</main>
					<footer className="h-12 bg-gray-200 flex items-center justify-center">
						footer sdfsdfsdfsdfsdf fsdf
					</footer>
				</div>
			</div>
		</div>
	);
};

export default OwnerLayout;
