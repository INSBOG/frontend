import { Navigate, Outlet } from "react-router-dom";
import useUserData from "../hooks/auth/useUserData";

const Public = () => {
  const { isAuthenticated, user } = useUserData();

  if (!user?.temp_password && isAuthenticated) return <Navigate to="/dashboard" />;

  return <Outlet />;
};

export default Public;
