import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useSocialCheck = () => {
  const location = useLocation();

  useEffect(() => {
    if (location?.hash?.includes("state=youtubev3")) {
      const token = location?.hash?.split("token=")[1]?.split("&token_type")[0];
      window.opener.postMessage({ token, youtube: true });
      window.close();
    }
    if (location?.search?.includes("state=instagram")) {
      const code = location?.search?.split("code=")[1]?.split("&state")[0];
      window.opener.postMessage({ code, instagram: true });
      window.close();
    }
  }, []);
};

export default useSocialCheck;
