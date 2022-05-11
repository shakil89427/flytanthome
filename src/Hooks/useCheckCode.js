import { useLocation } from "react-router-dom";

const useCheckCode = () => {
  const location = useLocation();

  if (location?.search?.includes("state=twitter")) {
    const code = location?.search?.split("code=")[1];
    localStorage.setItem("twitterCode", code);
    window.close();
  }
  if (location?.search?.includes("state=instagram")) {
    const code = location?.search?.split("code=")[1]?.split("&state")[0];
    localStorage.setItem("instaCode", code);
    window.close();
  }
  if (location?.hash?.includes("state=youtubev3")) {
    const token = location?.hash?.split("token=")[1]?.split("&token_type")[0];
    localStorage.setItem("youtubeToken", token);
    window.close();
  }
  if (location?.search?.includes("state=tiktok")) {
    const token = location?.search?.split("code=")[1]?.split("&scopes")[0];
    localStorage.setItem("tiktokCode", token);
    window.close();
  }
};

export default useCheckCode;
