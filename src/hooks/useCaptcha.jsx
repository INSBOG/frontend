import { useRef, useState } from "react";
import apiInstance from "../instances";

const useCaptcha = () => {
  const SITE_KEY = import.meta.env.VITE_SITE_KEY;
  const captchaRef = useRef();
  const [token, setToken] = useState();

  const handleValidate = async () => {
    try {
      const { data } = await apiInstance.post("/api/verify", { token });
      return data;
    } catch ({ response }) {
      console.error(response.data);
    }
  };

  return {
    handleValidate,
    SITE_KEY,
    captchaRef,
    setToken,
    token,
  };
};

export default useCaptcha;
