import PrivateRoute from "../components/PrivateRoute";
import OwnerLayout from "../pages/admin/OwerLayout";

const ownerRoutes = {
  path: "/owner",
  element: <PrivateRoute roles={["owner"]} />,
  children: [
    {
      path: "",
      element: <OwnerLayout />,
    },
  ],
};

export default ownerRoutes;
