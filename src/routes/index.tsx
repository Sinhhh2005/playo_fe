// src/router.tsx
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/user/home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/user/Profile";
import Book from "../pages/user/Book";
// import Admin from "../pages/admin/AdminLayout";
import adminRoutes from "./adminRoutes";
import PrivateRoute from "../components/PrivateRoute";
import TrainerDetailPage from "../pages/user/trainerDetail/TrainerDetailPage";

// các trang mới
import Play from "../pages/user/Play";
import MatchDetail from "../pages/user/discoverDetail/MatchDetail";
import TrainPage from "../pages/user/train";
import VenueDetail from "../components/mainUser/Page_book/bookDetail/VenueDetail";
import BookCart from "../components/mainUser/Page_book/bookCart/BookCart";
import ownerRoutes from "./ownerRoutes";

const router = createBrowserRouter([
	// Public routes
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/play",
		element: <Play />,
	},
	{
		path: "/book",
		element: <Book />,
	},
	{
		path: "/experience-details/:nav/:id",
		element: <VenueDetail />, // <-- thêm chi tiết venue
	},
	{
		path: "/booking/:id",
		element: <BookCart />, // <-- thêm chi tiết venue
	},
	{
		path: "/play/:id",
		element: <MatchDetail />,
	},
	{
		path: "/train",
		element: <TrainPage />,
	},
	{
		path: "/train/:id",
		element: <TrainerDetailPage />,
	},

	// Protected routes (user + admin)
	{
		element: <PrivateRoute roles={["user", "admin"]} />,
		children: [
			{
				path: "/profile",
				element: <Profile />,
			},
		],
	},

	{
		element: <PrivateRoute roles={["admin"]} />,
		children: [
			adminRoutes,
		],
	},
	ownerRoutes,

	// 404 fallback
	{
		path: "*",
		element: <div className="p-8 text-center">404 - Page Not Found</div>,
	},
]);

export default router;
