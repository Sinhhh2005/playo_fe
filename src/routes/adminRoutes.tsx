import AdminLayout from "../pages/admin/AdminLayout";
import UserManagement from "../components/mainAdmin/UserManagement";
import AdminDashboard from "../components/mainAdmin/AdminDashboard";
import FieldManagement from "../components/mainAdmin/FieldManagement";


import type { FieldRequest } from "../types/field";


const dummyStats = {
	users: 1200,
	fields: 45,
	bookings: 350,
	revenue: 15000000,
};

const initialData: FieldRequest[] = [
  {
    id: 1,
    name: "Sân A",
    address: "Hà Nội",
    type: "Bóng đá",
    status: "Pending",
    price: 200000,
    createdAt: "2025-10-21T00:00:00Z",
  },
  {
    id: 2,
    name: "Sân B",
    address: "Hải Phòng",
    type: "Cầu lông",
    status: "Approved",
    price: 150000,
    createdAt: "2025-10-21T00:00:00Z",
  },
  {
    id: 3,
    name: "Sân C",
    address: "Đà Nẵng",
    type: "Bóng rổ",
    status: "Rejected",
    price: 250000,
    createdAt: "2025-10-21T00:00:00Z",
  },
];



const adminRoutes = {
	path: "admin",
	element: <AdminLayout />,
	children: [
		{ path: "adminDashboard", element: <AdminDashboard stats={dummyStats}/> },
		{ path: "userManagement", element: <UserManagement /> }, 
		{ path: "fieldManagement", element: <FieldManagement requests={initialData}/> },
	],
};

export default adminRoutes;
