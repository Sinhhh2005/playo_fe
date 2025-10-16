import { Navigate, Outlet } from "react-router-dom";

// 🔹 Khai báo kiểu props
interface PrivateRouteProps {
	roles?: string[]; // Optional, có thể là ["admin", "user"] ...
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles }) => {
  const token = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có roles thì kiểm tra quyền
  if (roles && userRole && !roles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
