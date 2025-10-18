import { Navigate, Outlet } from "react-router-dom";

// 🔹 Khai báo kiểu props
interface PrivateRouteProps {
	roles?: string[]; // Optional, có thể là ["admin", "user"] ...
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles }) => {
	const token = localStorage.getItem("accessToken");
	const userRole = localStorage.getItem("role"); // giả sử backend trả về role khi login

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	// Nếu có roles (ví dụ: ["admin"]) thì check thêm quyền
	if (roles && !roles.includes(userRole || "")) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default PrivateRoute;
