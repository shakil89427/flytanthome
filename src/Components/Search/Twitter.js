import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import defaultUser from "../../Assets/defaultUser.png";
import millify from "millify";
import moment from "moment";
import likes from "../../Assets/profileSocials/twitter/likes.png";
import retweet from "../../Assets/profileSocials/twitter/retweet.png";
import DownloadApp from "../DownloadApp/DownloadApp";
import useAnalytics from "../../Hooks/useAnalytics";

const Twitter = ({ username }) => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [showDownload, setShowDownload] = useState(false);
  const [avg, setAvg] = useState({ likes: 0, rating: 0 });
  const { addLog } = useAnalytics();

  useEffect(() => {
    if (info?.tweets?.length > 0) {
      const totalLikes = info?.tweets?.reduce((total, current) => {
        return total + current?.public_metrics?.like_count;
      }, 0);
      const likes = Math.round(totalLikes / info?.tweets?.length);
      const totalRetweets = info?.tweets?.reduce((total, current) => {
        return total + current?.public_metrics?.retweet_count;
      }, 0);
      const rating = Math.round(totalRetweets / info?.tweets?.length);
      setAvg({ likes, rating: rating > 100 ? 100 : rating });
    }
  }, [info]);

  useEffect(() => {
    axios
      .post("https://arcane-castle-29935.herokuapp.com/twittersearch", {
        username,
      })
      .then((res) => {
        setInfo(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!info?.name) {
    return <p className="text-center mt-20">Something went wrong</p>;
  }

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
                  backgroundImage: info?.profile_image_url
                    ? `url(${info?.profile_image_url})`
                    : `url(${defaultUser})`,
                }}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-center bg-no-repeat bg-cover border"
              />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold mt-4 break-words">
              {info?.name}
            </p>
          </div>
          <div className="invisible">
            <p className="border w-[65px] aspect-square rounded-full flex items-center justify-center mb-3 text-3xl border-gray-400 mx-auto">
              {millify(
                Math.round(info?.public_metrics?.followers_count / 1000000) || 0
              )}
            </p>
            <p className="text-xs md:text-md font-semibold text-center">
              Social Score
            </p>
          </div>
        </div>
        <p
          onClick={() => {
            addLog("connect");
            setShowDownload(true);
          }}
          className="py-3 w-60 sm:w-72 rounded-md font-medium bg-black text-white text-lg cursor-pointer text-center mt-10"
        >
          Connect
        </p>
        {info?.description && (
          <p className="text-gray-600 mt-8 break-words">{info?.description}</p>
        )}
        {info?.name && (
          <div>
            <p className="font-medium mb-2 mt-8 text-gray-400">Name</p>
            <p className="text-lg font-medium">{info?.name}</p>
          </div>
        )}
      </div>

      {/* Right */}
      <div className="lg:pl-10 lg:border-l pt-5">
        <p className="text-2xl font-semibold mt-3">Social Account</p>
        <p className="relative font-semibold before:content-[''] before:absolute before:w-full before:h-[3px] before:bg-black before:-bottom-[2px] before:rounded-full text-black w-fit mt-5">
          Twitter
        </p>
        <div>
          <div className="flex justify-between border-b py-8">
            <div className="flex flex-col items-center gap-3">
              <p className="w-[65px] h-[65px] md:w-20 md:h-20 bg-[#E8E8E8] rounded-full flex items-center justify-center text-lg font-medium">
                {millify(info?.public_metrics?.followers_count || 0)}
              </p>
              <p className="text-sm font-medium text-gray-500">Followers</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="w-[65px] h-[65px] md:w-20 md:h-20 bg-[#E8E8E8] rounded-full flex items-center justify-center text-lg font-medium">
                {millify(info?.public_metrics?.following_count || 0)}
              </p>
              <p className="text-sm font-medium text-gray-500">Following</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="w-[65px] h-[65px] md:w-20 md:h-20 bg-[#E8E8E8] rounded-full flex items-center justify-center text-lg font-medium">
                {millify(avg?.likes || 0)}
              </p>
              <p className="text-sm font-medium text-gray-500">Likes/Tweet</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="w-[65px] h-[65px] md:w-20 md:h-20 bg-[#E8E8E8] rounded-full flex items-center justify-center text-lg font-medium">
                {avg?.rating}%
              </p>
              <p className="text-sm font-medium text-gray-500">Avg RT</p>
            </div>
          </div>
          <div className="py-8 border-b flex gap-2">
            <div className="w-fit">
              <div
                style={{
                  backgroundImage: info?.profile_image_url
                    ? `url(${info?.profile_image_url})`
                    : `url(${defaultUser})`,
                }}
                className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat"
              />
            </div>
            <span className="w-fit">
              <p className="text-xl font-medium mt-3 mb-2">{info?.name}</p>
              <p className="text-sm pr-5 text text-gray-500">
                {info?.description}
              </p>
            </span>
          </div>
          <p className="text-xl font-medium my-5">Latest Tweets</p>
          <div className="">
            {info?.tweets?.map((tweet) => (
              <div className="border my-3 py-6 rounded-md" key={tweet.id}>
                <div className="px-3 flex items-center gap-3">
                  <div
                    style={{
                      backgroundImage: info?.profile_image_url
                        ? `url(${info?.profile_image_url})`
                        : `url(${defaultUser})`,
                    }}
                    className="w-12 h-12 rounded-full bg-cover bg-center bg-no-repeat"
                  />
                  <span>
                    <p className="text-sm">{info?.name}</p>
                    <p className="text-xs text-gray-400">
                      {moment(tweet?.created_at).fromNow()}
                    </p>
                  </span>
                </div>
                <p className="px-3 text-xs my-5 break-words">{tweet?.text}</p>
                {tweet?.attachments?.media_keys?.length > 0 &&
                  info?.media?.map(
                    (item, index) =>
                      item.media_key === tweet?.attachments?.media_keys[0] && (
                        <img
                          key={index}
                          src={item.url}
                          className="w-full mb-5"
                          alt=""
                        />
                      )
                  )}
                <div className="pl-3 w-fit flex items-center gap-5">
                  <div>
                    <img className="w-6 h-6 mb-1 mx-auto" src={likes} alt="" />
                    <p className="text-xs">
                      {millify(tweet?.public_metrics?.like_count || 0)} likes
                    </p>
                  </div>

                  <div>
                    <img
                      className="w-6 h-6 mb-1 mx-auto"
                      src={retweet}
                      alt=""
                    />
                    <p className="text-xs">
                      {millify(tweet?.public_metrics?.retweet_count || 0)}{" "}
                      retweets
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Twitter;
