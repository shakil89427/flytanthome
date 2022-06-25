import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useCheckCode = () => {
  const location = useLocation();

  useEffect(() => {
    if (location?.search?.includes("state=access")) {
      try {
        const key = location?.search?.split("state=")[1].slice(0, 19);
        localStorage.setItem(key, location?.search);
        window.close();
      } catch (err) {}
    }
    if (location?.hash?.includes("state=access")) {
      try {
        const key = location?.hash?.split("state=")[1].slice(0, 19);
        localStorage.setItem(key, location?.hash);
        window.close();
      } catch (err) {}
    }
  }, []);
};

export default useCheckCode;
