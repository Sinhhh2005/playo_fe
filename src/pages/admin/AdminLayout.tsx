import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const AdminLayout = () => {
	return (
		<div className="flex h-screen">
			{/* SIDEBAR */}
			<aside className="w-64 bg-gray-800 text-white fixed top-0 left-0 h-full shadow-lg">
				<div className="p-4 font-bold text-lg border-b border-gray-700">
					LOGO_PLAYO_BOOKING
				</div>
				<nav className="p-4 space-y-2">
					<Link
						to="/admin/adminDashboard"
						className="block p-2 hover:bg-gray-700 rounded"
					>
						📌 Dashboard (tổng quan)
					</Link>
					<Link
						to="/admin/userManagement"
						className="block p-2 hover:bg-gray-700 rounded"
					>
						👤 Quản lý người dùng
					</Link>
					<Link
						to="/admin/fieldManagement"
						className="block p-2 hover:bg-gray-700 rounded"
					>
						🏟️ Quản lý Sân bóng
					</Link>
						<Link
						to="/admin/sportManagement"
						className="block p-2 hover:bg-gray-700 rounded"
					>
						🏆 Quản lý thể thao
					</Link>
					<Link
						to="/reports"
						className="block p-2 hover:bg-gray-700 rounded"
					>
						📊 Xem báo cáo
					</Link>
					<Link
						to="/"
						className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
					>
						Trang chủ
					</Link>
				</nav>
			</aside>

			{/* MAIN */}
			<div className="flex-1 ml-64 flex flex-col">
				{/* HEADER */}
				<header className="fixed top-0 left-64 right-0 h-16 bg-white shadow flex items-center justify-between px-6 z-10">
					{/* Logo / Title */}
					<div className="flex items-center gap-2 font-bold text-lg">
						<span>Admin Dashboard</span>
					</div>			

					{/* User Info + Logout */}
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2">
							<img
								src="https://i.pravatar.cc/40"
								alt="User Avatar"
								className="w-10 h-10 rounded-full border"
							/>
							<span className="font-medium">Admin</span>
						</div>
					</div>
				</header>

				{/* CONTENT + FOOTER */}
				<div className="mt-16 flex flex-col w-full h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50">
					<main className="flex-1 overflow-y-auto px-6">
						<Outlet />
					</main>
					<footer className="h-12 bg-gray-200 flex items-center justify-center py-8">
						playo_booking © 2025 Axelit. All rights reserved♥ v1.0.0
					</footer>
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;
