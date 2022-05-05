import axios from "axios";
import React, { useEffect, useState } from "react";
import youtube from "../../Assets/profileSocials/youtube.png";

const Youtube = ({ details }) => {
  const [videos, setVideos] = useState([]);
  const getItems = async (channelId) => {
    try {
      const playlistsData = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlists",
        {
          params: {
            part: "id",
            channelId,
            key: process.env.REACT_APP_GOOGLE_API_KEY,
          },
        }
      );
      const playlistsItemsData = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",
        {
          params: {
            part: "snippet",
            playlistId: playlistsData?.data?.items[0].id,
            key: process.env.REACT_APP_GOOGLE_API_KEY,
          },
        }
      );
      const videoIds = playlistsItemsData?.data?.items?.map(
        (item) => item.snippet
      );
      setVideos(videoIds);
      console.log(videoIds);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (details?.linkedAccounts?.Youtube?.channelId) {
      getItems(details?.linkedAccounts?.Youtube?.channelId);
    }
  }, [details]);

  return (
    <div className="flex flex-col items-center gap-5 mt-40 text-gray-500 text-sm font-medium">
      <p>No account linked</p>
      <a
        href={`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube.readonly&response_type=token&state=youtubev3&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
      >
        <img className="w-1/2 mx-auto" src={youtube} alt="" />
      </a>
      <p>Click here to link your youtube</p>
    </div>
  );
};

export default Youtube;
