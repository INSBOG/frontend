import { createBrowserRouter } from "react-router-dom";
import Protected from "./middlewares/Protected";
import Public from "./middlewares/Public";
import AdminHome from "./pages/admin/pages/Home";
import ChangePasswordPage from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/Home";
import Custom404 from "./pages/NotFound";
import RegisterPage from "./pages/Register";
import Permisions from "./pages/admin/pages/Permisions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Public />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/change-password",
    element: <Protected />,
    children: [
      {
        index: true,
        element: <ChangePasswordPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Protected />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Protected />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "users/permissions",
        element: <Permisions />
      }
    ],
  },
  {
    path: "*",
    element: <Custom404 />,
  },
]);

export default router;
