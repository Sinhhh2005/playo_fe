import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ roles }) => {
	const token = localStorage.getItem("accessToken");
	const userRole = localStorage.getItem("role"); // giả sử backend trả về role khi login

	if (!token) {
		return <Navigate to="/login" />;
	}

	// Nếu có roles (ví dụ: ["admin"]) thì check thêm quyền
	if (roles && !roles.includes(userRole)) {
		return <Navigate to="/" />;
	}

	return <Outlet />;
};

export default PrivateRoute;
