// src/router.tsx
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/user/home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/user/Profile";
import Book from "../pages/user/Book";
import Play from "../pages/user/Play";
import MatchDetail from "../pages/user/discoverDetail/MatchDetail";
import TrainPage from "../pages/user/train";
import TrainerDetailPage from "../pages/user/trainerDetail/TrainerDetailPage";
import VenueDetail from "../components/mainUser/Page_book/bookDetail/VenueDetail";
import BookCart from "../components/mainUser/Page_book/bookCart/BookCart";
import PrivateRoute from "../components/PrivateRoute";
import adminRoutes from "./adminRoutes";
import ownerRoutes from "./ownerRoutes";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/play", element: <Play /> },
  { path: "/play/:id", element: <MatchDetail /> }, // ⚡ safe
  { path: "/train", element: <TrainPage /> },
  { path: "/train/:id", element: <TrainerDetailPage /> },
  { path: "/book", element: <Book /> },
  { path: "/experience-details/:nav/:id", element: <VenueDetail /> },
  { path: "/booking/:id", element: <BookCart /> },
  {
    element: <PrivateRoute roles={["user", "admin"]} />,
    children: [{ path: "/profile", element: <Profile /> }],
  },
  {
    element: <PrivateRoute roles={["admin"]} />,
    children: [adminRoutes],
  },
  ownerRoutes,
  { path: "*", element: <div className="p-8 text-center">404 - Page Not Found</div> },
]);

export default router;
