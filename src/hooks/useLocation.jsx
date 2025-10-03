import { useEffect, useState } from "react";

const useLocation = () => {
  const [data, setData] = useState();

  const getColombiaDepartments = async () => {
    fetch(
      "https://raw.githubusercontent.com/mreyeswilson/colombia-json/refs/heads/ins/colombia.min.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    getColombiaDepartments();
  }, []);

  return { data };
};

export default useLocation;
