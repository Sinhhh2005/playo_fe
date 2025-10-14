import AdminLayout from "../pages/admin/AdminLayout";
import UserManagement from "../components/mainAdmin/UserManagement";
import AdminDashboard from "../components/mainAdmin/AdminDashboard";
import FieldManagement from "../components/mainAdmin/FieldManagement";

import type { User } from "../types/user";
import type { FieldRequest } from "../types/field";

const dummyUsers: User[] = [
  { id: 1, name: "Nguyen Van A", email: "a@example.com", role: "admin", status: "active" },
  { id: 2, name: "Tran Thi B", email: "b@example.com", role: "field_owner", status: "inactive" },
  { id: 3, name: "Le Van C", email: "c@example.com", role: "user", status: "banned" },
];

const dummyStats = {
	users: 1200,
	fields: 45,
	bookings: 350,
	revenue: 15000000,
};

const initialData: FieldRequest[] = [
  { id: 1, name: "Sân A", address: "Hà Nội", type: "Bóng đá", status: "Pending" },
  { id: 2, name: "Sân B", address: "Hải Phòng", type: "Cầu lông", status: "Approved" },
  { id: 3, name: "Sân C", address: "Đà Nẵng", type: "Bóng rổ", status: "Rejected" },
];

const adminRoutes = {
	path: "admin",
	element: <AdminLayout />,
	children: [
		{ path: "adminDashboard", element: <AdminDashboard stats={dummyStats}/> },
		{ path: "userManagement", element: <UserManagement users={dummyUsers}/> }, 
		{ path: "fieldManagement", element: <FieldManagement requests={initialData}/> },
	],
};

export default adminRoutes;
