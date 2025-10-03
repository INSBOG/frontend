import { useEffect, useState } from "react";
import apiInstance from "../instances";

const useUpload = () => {
  const [dptos, setDptos] = useState();

  useEffect(() => {
    apiInstance.get("/api/locations").then(({ data: res }) => {
      setDptos(res.data);
    });
  }, []);

  return { dptos };
};

export default useUpload;
