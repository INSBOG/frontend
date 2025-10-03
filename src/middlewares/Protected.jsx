import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUserData from "../hooks/auth/useUserData";

const Protected = () => {
  const location = useLocation();

  const { isAuthenticated, user, isPasswordExpired } = useUserData();

  if (!isAuthenticated) return <Navigate to="/" />;

  if (location.pathname.includes("/admin") && !user?.admin)
    return <Navigate to="/dashboard" />;

  if (user?.temp_password) return <Navigate to="/" />;

  if (!location.pathname.includes("change-password") && isPasswordExpired())
    return <Navigate to="/change-password" />;

  return <Outlet />;
};

export default Protected;
