import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../../Components/Spinner/Spinner";
import youtube from "../../Assets/profileSocials/youtube.png";
import views from "../../Assets/profileSocials/youtube/views.png";
import likes from "../../Assets/profileSocials/youtube/likes.png";
import comments from "../../Assets/profileSocials/youtube/comments.png";

const styles = {
  connect:
    "flex flex-col items-center gap-5 mt-40 text-gray-500 text-sm font-medium",
  notFound: "mt-20 text-center",
  topicsMain: "flex justify-between border-b-2 py-8",
  topicWrapper: "flex flex-col items-center gap-3",
  topic:
    "w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-xl font-medium",
  topicName: "text-sm font-medium",
  channelContainer: "py-8 border-b-2 flex justify-center gap-2",
  channelBg: "w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat",
  channelTitle: "text-xl font-medium mt-3 mb-2",
  channelDescription: "text-sm pr-5 text",
  latest: "text-xl font-medium",
  videoBg:
    "h-48 bg-cover bg-center bg-no-repeat relative rounded-md overflow-hidden",
  videoStatistic:
    "absolute inset-0 bg-[#0a0a0a8c] text-white flex items-center justify-center text-sm text-center opacity-0 hover:opacity-100 duration-150",
  videoInner: "grid grid-cols-3 gap-x-5 gap-y-3 items-center",
  videoTitle:
    "absolute w-full bottom-0 left-0 bg-[#0a0a0a8c] py-1 px-5 text-white",
};

const Youtube = ({ details }) => {
  const [channelInfo, setChannelInfo] = useState({});
  const [videos, setVideos] = useState([]);
  const [viewsPerVideo, setViewsPerVideo] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
      setChannelInfo(response1.data.items[0]);
      setVideos(response3.data.items);
    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videos?.length) {
      const totalviews = videos.reduce((total, current) => {
        return total + parseInt(current.statistics.viewCount);
      }, 0);
      setViewsPerVideo(totalviews / videos.length);
      setLoading(false);
    }
  }, [videos]);

  useEffect(() => {
    if (details?.linkedAccounts?.Youtube?.channelId) {
      setLoading(true);
      getData(details?.linkedAccounts?.Youtube?.channelId);
    }
  }, [details]);

  return (
    <div>
      {loading && (
        <div className="relative py-10">
          <Spinner position={true} />
        </div>
      )}
      {!details?.linkedAccounts?.Youtube?.channelId && details.access && (
        <div className={styles.connect}>
          <p>No account linked</p>
          <a
            href={`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube.readonly&response_type=token&state=youtubev3&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
          >
            <img className="w-1/2 mx-auto" src={youtube} alt="" />
          </a>
          <p>Click here to link your youtube</p>
        </div>
      )}
      {!details?.linkedAccounts?.Youtube?.channelId && !details.access && (
        <p className={styles.notFound}>No data found</p>
      )}
      {error && <p className={styles.notFound}>{error}</p>}
      {!loading && videos?.length > 0 && (
        <div>
          <div className={styles.topicsMain}>
            <div className={styles.topicWrapper}>
              <p className={styles.topic}>
                {channelInfo?.statistics?.subscriberCount}
              </p>
              <p className={styles.topicName}>Subscriber</p>
            </div>
            <div className={styles.topicWrapper}>
              <p className={styles.topic}>{viewsPerVideo}</p>
              <p className={styles.topicName}>Views/Video</p>
            </div>
            <div className={styles.topicWrapper}>
              <p className={styles.topic}>
                {channelInfo?.statistics?.viewCount}
              </p>
              <p className={styles.topicName}>Views</p>
            </div>
            <div className={styles.topicWrapper}>
              <p className={styles.topic}>
                {parseFloat(
                  channelInfo?.statistics?.viewCount /
                    channelInfo?.statistics?.subscriberCount /
                    100
                ).toFixed(2)}
                %
              </p>
              <p className={styles.topicName}>Engagement</p>
            </div>
          </div>
          <div className={styles.channelContainer}>
            <div className="w-fit">
              <div
                style={{
                  backgroundImage: `url(${channelInfo?.snippet?.thumbnails?.high?.url})`,
                }}
                className={styles.channelBg}
              />
            </div>
            <span className="w-fit">
              <p className={styles.channelTitle}>
                {channelInfo?.snippet?.title}
              </p>
              <p className={styles.channelDescription}>
                {channelInfo?.snippet?.description}
              </p>
            </span>
          </div>
          <div className="py-8">
            <p className={styles.latest}>Latest videos</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {videos.map((video) => (
                <div
                  key={video.id}
                  style={{
                    backgroundImage: `url(${video.snippet.thumbnails.high.url})`,
                  }}
                  className={styles.videoBg}
                >
                  <div className={styles.videoStatistic}>
                    <div className={styles.videoInner}>
                      <img className="w-6" src={views} alt="" />
                      <img className="w-6" src={likes} alt="" />
                      <img className="w-6" src={comments} alt="" />
                      <p>{video.statistics.viewCount}</p>
                      <p>{video.statistics.likeCount}</p>
                      <p>{video.statistics.commentCount}</p>
                    </div>
                  </div>
                  <p className={styles.videoTitle}>{video.snippet.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Youtube;
