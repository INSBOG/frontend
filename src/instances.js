import axios from "axios";
import Cookie from "js-cookie";

const apiInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const protectedRoutes = ["/dashboard", "/admin"];
    const pathname  = window.location.pathname;
    if (
      error.response.status === 401 &&
      protectedRoutes.includes(pathname)
    ) {
      Cookie.remove("token");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
