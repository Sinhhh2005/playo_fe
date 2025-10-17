import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles }) => {
  const token = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role")?.toLowerCase();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có danh sách roles thì kiểm tra quyền
  if (roles && userRole && !roles.map(r => r.toLowerCase()).includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
