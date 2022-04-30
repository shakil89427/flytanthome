import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useYoutubeConnect = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const token = location?.hash
    ?.split("access_token=")[1]
    ?.split("&token_type")[0];

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
    // const channelId = response.data.items[0].id
    console.log(response.data);
  };

  useEffect(() => {
    if (loading) return;
    setLoading(() => true);
    console.log("1");
    if (token) {
      getplayLists(token);
    }
  }, []);
};

export default useYoutubeConnect;
