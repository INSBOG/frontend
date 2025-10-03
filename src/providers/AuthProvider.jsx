import dayjs from "dayjs";
import { createContext, useEffect, useState } from "react";
import apiInstance from "../instances";
import Loading from "../pages/Loading";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = () => {
    setLoading(true);
    apiInstance
      .get("/api/session")
      .then(({ data }) => {
        setUser(data.data);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setUser(null);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signIn = () => {
    setIsAuthenticated(true);
    setLoading(false);
    window.location.href = "/dashboard";
  };

  const signOut = () =>
    apiInstance.get("/api/logout").then(() => {
      setUser(null);
      setIsAuthenticated(false);
    });

  const isAdmin = () => user?.admin;

  const isPasswordExpired = () => user?.password_exp < dayjs().unix();

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        signIn,
        signOut,
        isAuthenticated,
        loading,
        isPasswordExpired,
        checkSession,
      }}
    >
      {!loading ? children : <Loading />}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
