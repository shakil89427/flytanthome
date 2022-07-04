import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Spinner from "../Spinner/Spinner";
import millify from "millify";
import views from "../../Assets/profileSocials/youtube/views.png";
import likes from "../../Assets/profileSocials/youtube/likes.png";
import comments from "../../Assets/profileSocials/youtube/comments.png";
import DownloadApp from "../DownloadApp/DownloadApp";

const styles = {
  connect:
    "flex flex-col items-center gap-5 mt-40 text-gray-500 text-sm font-medium",
  notFound: "mt-20 text-center",
  topicsMain: "flex justify-between border-b py-8",
  topicWrapper: "flex flex-col items-center gap-3",
  topic:
    "w-[65px] h-[65px] md:w-20 md:h-20 bg-[#E8E8E8] rounded-full flex items-center justify-center text-lg font-medium",
  topicName: "text-xs md:text-sm font-medium text-gray-500",
  channelContainer: "py-8 border-b flex gap-2",
  channelBg: "w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat border",
  channelTitle: "text-xl font-medium mt-3 mb-2",
  channelDescription: "text-sm pr-5 text text-gray-500",
  latest: "text-xl font-medium",
  videoBg:
    "h-48 bg-cover bg-center bg-no-repeat relative rounded-md overflow-hidden",
  videoStatistic:
    "absolute inset-0 bg-[#0a0a0a8c] text-white flex items-center justify-center text-sm text-center opacity-0 hover:opacity-100 duration-150",
  videoInner: "grid grid-cols-3 gap-x-5 gap-y-3 items-center",
  videoTitle:
    "absolute w-full bottom-0 left-0 bg-[#0a0a0a8c] py-1 px-2 text-white text-sm break-words",
};

const Youtube = ({ channelId }) => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [viewsPerVideo, setViewsPerVideo] = useState(0);
  const [showDownload, setShowDownload] = useState(false);

  useEffect(() => {
    axios
      .post("https://flytant.herokuapp.com/youtubedata", { channelId })
      .then((res) => {
        setInfo(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (info?.videos?.length > 0) {
      const totalviews = info?.videos.reduce((total, current) => {
        return total + parseInt(current.statistics.viewCount);
      }, 0);
      setViewsPerVideo(Math.ceil(totalviews / info?.videos?.length));
    }
  }, [info]);

  if (loading) return <Spinner />;

  if (!info?.snippet?.title) {
    return <p className="text-center mt-20">Something went wrong</p>;
  }
  console.log(info);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[1100px] px-5 gap-y-10 mx-auto pb-24">
      {showDownload && <DownloadApp setShowDownload={setShowDownload} />}
      {/* Left */}
      <div className="lg:pr-10 pt-5">
        <div className="flex items-start justify-between gap-5  ">
          <div className="flex items-start gap-3">
            <div>
              <div
                style={{
                  backgroundImage: `url(${info?.snippet?.thumbnails?.default?.url})`,
                }}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-center bg-no-repeat bg-cover border"
              />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold mt-4 break-words">
              {info?.snippet?.title}
            </p>
          </div>
          <div>
            <div className="border w-[65px] aspect-square rounded-full flex items-center justify-center mb-3 text-3xl border-gray-400">
              0
            </div>
          </div>
        </div>
        <p
          onClick={() => setShowDownload(true)}
          className="py-3 w-60 sm:w-72 rounded-md font-medium bg-black text-white text-lg cursor-pointer text-center mt-10"
        >
          Connect
        </p>
        {info?.snippet?.description && (
          <p className="text-gray-600 mt-8 break-words">
            {info?.snippet?.description}
          </p>
        )}
        {info?.snippet?.title && (
          <div>
            <p className="font-medium mb-2 mt-8 text-gray-400">Name</p>
            <p className="text-lg font-medium">{info?.snippet?.title}</p>
          </div>
        )}
      </div>

      {/* Right */}
      <div className="lg:pl-10 lg:border-l pt-5">
        <p className="text-2xl font-semibold mt-3">Social Account</p>
        <p className="relative font-semibold before:content-[''] before:absolute before:w-full before:h-[3px] before:bg-black before:-bottom-[2px] before:rounded-full text-black w-fit mt-5">
          Youtube
        </p>
        <div>
          <div className={styles.topicsMain}>
            <div className={styles.topicWrapper}>
              <p className={styles.topic}>
                {millify(info?.statistics?.subscriberCount || 0)}
              </p>
              <p className={styles.topicName}>Subscriber</p>
            </div>
            <div className={styles.topicWrapper}>
              <p className={styles.topic}>{millify(viewsPerVideo || 0)}</p>
              <p className={styles.topicName}>Views/Video</p>
            </div>
            <div className={styles.topicWrapper}>
              <p className={styles.topic}>
                {millify(info?.statistics?.viewCount || 0)}
              </p>
              <p className={styles.topicName}>Views</p>
            </div>
            <div className={styles.topicWrapper}>
              <p className={styles.topic}>
                {info?.statistics?.viewCount !== "0" &&
                info?.statistics?.subscriberCount &&
                info?.statistics?.subscriberCount !== "0"
                  ? parseFloat(
                      parseInt(info?.statistics?.viewCount) /
                        parseInt(info?.statistics?.subscriberCount) /
                        100
                    ).toFixed(2)
                  : 0}
                %
              </p>
              <p className={styles.topicName}>Engagement</p>
            </div>
          </div>
          <div className={styles.channelContainer}>
            <div className="w-fit">
              <div
                style={{
                  backgroundImage: `url(${info?.snippet?.thumbnails?.default?.url})`,
                }}
                className={styles.channelBg}
              />
            </div>
            <span className="w-fit">
              <p className={styles.channelTitle}>{info?.snippet?.title}</p>
              <p className={styles.channelDescription}>
                {info?.snippet?.description}
              </p>
            </span>
          </div>
        </div>
        {info?.videos?.length > 0 && (
          <div className="py-8">
            <p className={styles.latest}>Latest videos</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {info?.videos?.map((video) => (
                <div
                  key={video.id}
                  style={{
                    backgroundImage: `url(${video?.snippet?.thumbnails?.high?.url})`,
                  }}
                  className={styles.videoBg}
                >
                  <div className={styles.videoStatistic}>
                    <div className={styles.videoInner}>
                      <img className="w-6" src={views} alt="" />
                      <img className="w-6" src={likes} alt="" />
                      <img className="w-6" src={comments} alt="" />
                      <p>{millify(video?.statistics?.viewCount || 0)}</p>
                      <p>{millify(video?.statistics?.likeCount || 0)}</p>
                      <p>{millify(video?.statistics?.commentCount || 0)}</p>
                    </div>
                  </div>
                  <p className={styles.videoTitle}>
                    {video?.snippet?.title.slice(0, 40)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {info?.videos?.length < 1 && (
          <p className={styles.notFound}>No Videos found</p>
        )}
      </div>
    </div>
  );
};

export default Youtube;
