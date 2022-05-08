import { useLocation } from "react-router-dom";

const useCheckCode = () => {
  const location = useLocation();
  if (location?.search?.includes("state=twitter")) {
    const code = location?.search?.split("code=")[1];
    console.log(code);
    localStorage.setItem("twitterCode", code);
    window.close();
  }
};

export default useCheckCode;
