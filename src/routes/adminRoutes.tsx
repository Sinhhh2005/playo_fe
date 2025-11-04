import AdminLayout from "../pages/admin/AdminLayout";
import UserManagement from "../components/mainAdmin/UserManagement";
import AdminDashboard from "../components/mainAdmin/AdminDashboard";
import FieldManagement from "../components/mainAdmin/FieldManagement";
import SportManagement from "../components/mainAdmin/SportManagement";
import BookingManagement from "../components/mainAdmin/BookingManagement";
import SlotVenueManagement from "../components/mainAdmin/SlotVenueManagement";
import PaymentManagement from "../components/mainAdmin/PaymentManagement";

const dummyStats = {
	users: 1200,
	fields: 45,
	bookings: 350,
	revenue: 15000000,
};

const adminRoutes = {
	path: "admin",
	element: <AdminLayout />,
	children: [
		{
			path: "adminDashboard",
			element: <AdminDashboard stats={dummyStats} />,
		},
		{ path: "userManagement", element: <UserManagement /> },
		{ path: "fieldManagement", element: <FieldManagement /> },
		{ path: "sportManagement", element: <SportManagement /> },
		{ path: "bookingManagement", element: <BookingManagement /> },
		{ path: "slotVenueManagement", element: <SlotVenueManagement /> },
		{ path: "paymentManagement", element: <PaymentManagement /> },
	],
};

export default adminRoutes;
