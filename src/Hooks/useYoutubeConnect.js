import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useYoutubeConnect = () => {
  const location = useLocation();

  const getplayLists = async (token) => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlists",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          part: "contentDetails",
          mine: true,
        },
      }
    );
    console.log(response.data);
  };

  useEffect(() => {
    if (location?.hash?.includes("state=youtubev3")) {
      const token = location?.hash?.split("token=")[1]?.split("&token_type")[0];
      getplayLists(token);
    }
  }, []);
};

export default useYoutubeConnect;
