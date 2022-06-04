import React, { useEffect, useState } from "react";
import Spinner from "../../Components/Spinner/Spinner";
import youtube from "../../Assets/profileSocials/youtube.png";
import views from "../../Assets/profileSocials/youtube/views.png";
import likes from "../../Assets/profileSocials/youtube/likes.png";
import comments from "../../Assets/profileSocials/youtube/comments.png";
import useConnect from "../../Hooks/Youtube/useConnect";
import axios from "axios";
import useStore from "../../Store/useStore";
import millify from "millify";

const styles = {
  connect:
    "flex flex-col items-center gap-5 mt-40 text-gray-500 text-sm font-medium",
  notFound: "mt-20 text-center",
  topicsMain: "flex justify-between border-b-2 py-8",
  topicWrapper: "flex flex-col items-center gap-3",
  topic:
    "w-[65px] h-[65px] md:w-20 md:h-20 bg-gray-200 rounded-full flex items-center justify-center text-lg font-medium",
  topicName: "text-xs md:text-sm font-medium text-gray-500",
  channelContainer: "py-8 border-b-2 flex gap-2",
  channelBg: "w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat",
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

const Youtube = ({ details }) => {
  const { youtubeData, setYoutubeData } = useStore();
  const [info, setInfo] = useState({});
  const [viewsPerVideo, setViewsPerVideo] = useState(0);
  const [loading, setLoading] = useState(true);
  const { openPopup } = useConnect(setLoading);

  const getData = async (channelId) => {
    try {
      const response = await axios.post(
        "https://flytant.herokuapp.com/youtubedata",
        {
          channelId,
        }
      );
      const data = { ...response.data, validId: details.id };
      setInfo(data);
      setYoutubeData([...youtubeData, data]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (info?.videos?.length > 0) {
      const totalviews = info?.videos.reduce((total, current) => {
        return total + parseInt(current.statistics.viewCount);
      }, 0);
      setViewsPerVideo(totalviews / info?.videos?.length);
    }
  }, [info]);

  useEffect(() => {
    setInfo({});
    setLoading(true);
    if (details?.linkedAccounts?.Youtube?.channelId) {
      const valid = youtubeData.find((item) => item?.validId === details.id);
      if (valid?.validId) {
        setInfo(valid);
        setLoading(false);
      } else {
        getData(details.linkedAccounts.Youtube.channelId);
      }
    } else {
      setLoading(false);
    }
  }, [details]);

  return (
    <div>
      {loading && <Spinner />}
      {!loading &&
        !details?.linkedAccounts?.Youtube?.channelId &&
        details?.access && (
          <div className={styles.connect}>
            <p>No account linked</p>
            <p onClick={openPopup}>
              <img
                className="w-1/2 mx-auto cursor-pointer"
                src={youtube}
                alt=""
              />
            </p>
            <p>Click here to link your youtube</p>
          </div>
        )}
      {!details?.linkedAccounts?.Youtube?.channelId && !details?.access && (
        <div className={styles.connect}>
          <p>No account linked</p>
          <p>
            <img className="w-1/2 mx-auto" src={youtube} alt="" />
          </p>
        </div>
      )}
      {!loading && info?.snippet && (
        <div>
          <div className={styles.topicsMain}>
            <div className={styles.topicWrapper}>
              <p className={styles.topic}>
                {millify(info?.statistics?.subscriberCount)}
              </p>
              <p className={styles.topicName}>Subscriber</p>
            </div>
            <div className={styles.topicWrapper}>
              <p className={styles.topic}>{millify(viewsPerVideo)}</p>
              <p className={styles.topicName}>Views/Video</p>
            </div>
            <div className={styles.topicWrapper}>
              <p className={styles.topic}>
                {millify(info?.statistics?.viewCount)}
              </p>
              <p className={styles.topicName}>Views</p>
            </div>
            <div className={styles.topicWrapper}>
              <p className={styles.topic}>
                {info?.statistics?.viewCount !== "0" &&
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
                  backgroundImage: `url(${info?.snippet?.thumbnails?.high?.url})`,
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
      )}
      {!loading && info?.videos?.length > 0 && (
        <div className="py-8">
          <p className={styles.latest}>Latest videos</p>
          <div className="mt-3 grid grid-cols-2 gap-3 max-h-[600px] overflow-y-scroll">
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
                    <p>{millify(video?.statistics?.viewCount)}</p>
                    <p>{millify(video?.statistics?.likeCount)}</p>
                    <p>{millify(video?.statistics?.commentCount)}</p>
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
      {!loading && info?.videos?.length < 1 && (
        <p className={styles.notFound}>No Videos found</p>
      )}
    </div>
  );
};

export default Youtube;
