import { useLocation } from "react-router-dom";

const useCheckCode = () => {
  const location = useLocation();

  if (location?.search?.includes("state=access")) {
    localStorage.setItem("access", location?.search);
    window.close();
  }
  if (location?.hash?.includes("state=access")) {
    localStorage.setItem("access", location?.hash);
    window.close();
  }
};

export default useCheckCode;
