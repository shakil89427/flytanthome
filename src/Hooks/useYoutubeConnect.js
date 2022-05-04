import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useYoutubeConnect = () => {
  const location = useLocation();

  const getPlaylistsItems = async (playlistId) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",
        {
          params: {
            part: "contentDetails",
            playlistId,
            key: process.env.REACT_APP_GOOGLE_API_KEY,
          },
        }
      );
      const videoIds = response?.data?.items?.map(
        (item) => item.contentDetails
      );
      console.log(videoIds);
    } catch (err) {
      console.log(err);
    }
  };

  const getPlaylists = async (channelId) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlists",
        {
          params: {
            part: "id",
            channelId,
            key: process.env.REACT_APP_GOOGLE_API_KEY,
          },
        }
      );
      const playlists = response?.data?.items?.map((item) => item.id);
      console.log("Playlists", playlists);
      getPlaylistsItems(playlists[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const getChannels = async (token) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/channels",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            part: "id",
            mine: true,
          },
        }
      );
      const channels = response?.data?.items?.map((item) => item.id);
      console.log("Channels", channels);
      getPlaylists(channels[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (location?.hash?.includes("state=youtubev3")) {
      const token = location?.hash?.split("token=")[1]?.split("&token_type")[0];
      getChannels(token);
    }
  }, []);
};

export default useYoutubeConnect;
