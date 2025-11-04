// src/router.tsx
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/user/home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/user/Profile";
import Book from "../pages/user/Book";
import Play from "../pages/user/Play";
import MatchDetail from "../pages/user/discoverDetail/MatchDetail";
// import TrainPage from "../pages/user/train";
import VenueDetail from "../components/mainUser/Page_book/bookDetail/VenueDetail";
import BookCart from "../components/mainUser/Page_book/bookCart/BookCart";
import PrivateRoute from "../components/PrivateRoute";
import adminRoutes from "./adminRoutes";
import CheckoutPage from "../components/mainUser/Page_book/checkout/CheckoutPage";
import PaymentSuccess from "../components/mainUser/Page_book/bookCart/PaymentSuccess";
import PaymentFailed from "../components/mainUser/Page_book/bookCart/PaymentFailed";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

const router = createBrowserRouter([
	{ path: "/", element: <Home /> },
	{ path: "/login", element: <Login /> },
	{ path: "/register", element: <Register /> },
	{ path: "/forgot-password", element: <ForgotPassword /> },
	{ path: "/reset-password", element: <ResetPassword /> },
	{ path: "/play", element: <Play /> },
	{ path: "/play/:id", element: <MatchDetail /> },
	{ path: "/book", element: <Book /> },
	{ path: "/experience-details/:nav/:id", element: <VenueDetail /> },
	{ path: "/booking/:id", element: <BookCart /> },
	{ path: "/checkout", element: <CheckoutPage /> },
	{ path: "/payment-success", element: <PaymentSuccess /> },
	{ path: "/payment-failed", element: <PaymentFailed /> },

	{
		element: <PrivateRoute roles={["user", "admin", "owner"]} />,
		children: [{ path: "/profile", element: <Profile /> }],
	},
	{
		element: <PrivateRoute roles={["admin"]} />,
		children: [adminRoutes],
	},

	{
		path: "*",
		element: <div className="p-8 text-center">404 - Page Not Found</div>,
	},
]);

export default router;
