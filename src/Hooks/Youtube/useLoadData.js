import axios from "axios";
import { useEffect } from "react";

const useLoadData = (
  details,
  setChannelInfo,
  setError,
  setLoading,
  videos,
  setVideos,
  setViewsPerVideo
) => {
  const getData = async (channelId) => {
    try {
      const response1 = await axios.get(
        "https://www.googleapis.com/youtube/v3/channels",
        {
          params: {
            id: channelId,
            part: "snippet,statistics",
            key: process.env.REACT_APP_GOOGLE_API_KEY,
          },
        }
      );
      setChannelInfo(response1.data.items[0]);
      const response2 = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "id",
            channelId,
            maxResults: 20,
            order: "date",
            type: "video",
            key: process.env.REACT_APP_GOOGLE_API_KEY,
          },
        }
      );
      const videoIds = response2.data.items.map((item) => item.id.videoId);
      if (videoIds.length < 1) {
        setError("No videos found");
        return setLoading(false);
      }
      const response3 = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos",
        {
          params: {
            part: "snippet,statistics",
            id: videoIds.toString(),
            key: process.env.REACT_APP_GOOGLE_API_KEY,
          },
        }
      );
      setVideos(response3.data.items);
    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  /* Set views per video */
  useEffect(() => {
    if (videos?.length) {
      const totalviews = videos.reduce((total, current) => {
        return total + parseInt(current.statistics.viewCount);
      }, 0);
      setViewsPerVideo(totalviews / videos.length);
      setLoading(false);
    }
  }, [videos]);

  /* Check youtube connected or not */
  useEffect(() => {
    if (details?.linkedAccounts?.Youtube?.channelId) {
      setLoading(true);
      getData(details?.linkedAccounts?.Youtube?.channelId);
    }
  }, [details]);
  return;
};

export default useLoadData;
