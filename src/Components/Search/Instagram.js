import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import defaultUser from "../../Assets/defaultUser.png";
import millify from "millify";
import moment from "moment";
import likes from "../../Assets/profileSocials/tiktok/like.png";
import comment from "../../Assets/profileSocials/tiktok/comment.png";
import DownloadApp from "../DownloadApp/DownloadApp";
import useAnalytics from "../../Hooks/useAnalytics";

const Instagram = ({ username }) => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState({ fetched: false });
  const [avg, setAvg] = useState({ likes: 0, engagement: 0, socialScore: 0 });
  const [showDownload, setShowDownload] = useState(false);
  const { addLog } = useAnalytics();

  const getImage = async (url, id) => {
    try {
      const {
        data: { image },
      } = await axios.post("https://flytant.herokuapp.com/getimage", {
        url,
      });
      setImages((prev) => {
        const newinfo = { ...prev };
        newinfo[id] = image;
        return newinfo;
      });
    } catch (err) {}
  };

  useEffect(() => {
    if (info?.profile_pic_url && !images?.fetched) {
      setImages({ fetched: true });
      getImage(info?.profile_pic_url, "profileImg");
      info?.edge_owner_to_timeline_media?.edges?.forEach((item) => {
        if (item?.node?.thumbnail_src) {
          getImage(item?.node?.thumbnail_src, item?.node?.id);
        }
      });
    }
  }, [info, images]);

  useEffect(() => {
    axios
      .post("https://flytant.herokuapp.com/instagramsearch", { username })
      .then((res) => {
        setInfo(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (info?.edge_owner_to_timeline_media?.edges?.length > 0) {
      const totalLikes = info?.edge_owner_to_timeline_media?.edges?.reduce(
        (total, current) => {
          return total + current?.node?.edge_liked_by?.count;
        },
        0
      );
      const likes = Math.round(
        totalLikes / info?.edge_owner_to_timeline_media?.edges?.length
      );
      const engagement = parseFloat(
        likes / info?.edge_followed_by?.count
      ).toFixed(2);
      const socialScore = Math.ceil(engagement * 10);
      setAvg({
        likes,
        engagement,
        socialScore: socialScore > 99 ? 99 : socialScore,
      });
    }
  }, [info]);

  if (loading) return <Spinner />;

  if (!info?.full_name) {
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
                  backgroundImage: images?.profileImg
                    ? `url(data:image/png;base64,${images?.profileImg})`
                    : `url(${defaultUser})`,
                }}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-center bg-no-repeat bg-cover border"
              />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold mt-4 break-words">
              {info?.full_name}
            </p>
          </div>
          <div>
            <p className="border w-[65px] aspect-square rounded-full flex items-center justify-center mb-3 text-3xl border-gray-400 mx-auto">
              {avg?.socialScore}
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
        {info?.biography && (
          <p className="text-gray-600 mt-8 break-words">{info?.biography}</p>
        )}
        {info?.full_name && (
          <div>
            <p className="font-medium mb-2 mt-8 text-gray-400">Name</p>
            <p className="text-lg font-medium">{info?.full_name}</p>
          </div>
        )}
      </div>

      {/* Right */}
      <div className="lg:pl-10 lg:border-l pt-5">
        <p className="text-2xl font-semibold mt-3">Social Account</p>
        <p className="relative font-semibold before:content-[''] before:absolute before:w-full before:h-[3px] before:bg-black before:-bottom-[2px] before:rounded-full text-black w-fit mt-5">
          Instagram
        </p>
        <div>
          <div className="flex justify-between border-b py-8">
            <div className="flex flex-col items-center gap-3">
              <p className="w-[65px] h-[65px] md:w-20 md:h-20 bg-[#E8E8E8] rounded-full flex items-center justify-center text-lg font-medium">
                {millify(info?.edge_followed_by?.count || 0)}
              </p>
              <p className="text-sm font-medium text-gray-500">Followers</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="w-[65px] h-[65px] md:w-20 md:h-20 bg-[#E8E8E8] rounded-full flex items-center justify-center text-lg font-medium">
                {millify(info?.edge_follow?.count || 0)}
              </p>
              <p className="text-sm font-medium text-gray-500">Following</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="w-[65px] h-[65px] md:w-20 md:h-20 bg-[#E8E8E8] rounded-full flex items-center justify-center text-lg font-medium">
                {millify(avg?.likes || 0)}
              </p>
              <p className="text-sm font-medium text-gray-500">Likes/Post</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="w-[65px] h-[65px] md:w-20 md:h-20 bg-[#E8E8E8] rounded-full flex items-center justify-center text-lg font-medium">
                {avg?.engagement}%
              </p>
              <p className="text-sm font-medium text-gray-500">Engagement</p>
            </div>
          </div>
          <div className="py-8 border-b flex gap-2">
            <div className="w-fit">
              <div
                style={{
                  backgroundImage: images?.profileImg
                    ? `url(data:image/png;base64,${images?.profileImg})`
                    : `url(${defaultUser})`,
                }}
                className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat border"
              />
            </div>
            <span className="w-fit">
              <p className="text-xl font-medium mt-3 mb-2">{info?.full_name}</p>
              <p className="text-sm pr-5 text text-gray-500">
                {info?.biography}
              </p>
            </span>
          </div>
          <p className="text-xl font-medium my-5">Latest Posts</p>
          <div className="">
            {info?.edge_owner_to_timeline_media?.edges?.map(({ node }) => (
              <div className="border my-3 py-6 rounded-md" key={node.id}>
                <div className="px-3 flex items-center gap-3">
                  <div
                    style={{
                      backgroundImage: images?.profileImg
                        ? `url(data:image/png;base64,${images?.profileImg})`
                        : `url(${defaultUser})`,
                    }}
                    className="w-12 h-12 rounded-full bg-cover bg-center bg-no-repeat border"
                  />
                  <span>
                    <p className="text-sm">{info?.full_name}</p>
                    <p className="text-xs text-gray-400">
                      {moment.unix(node?.taken_at_timestamp).fromNow()}
                    </p>
                  </span>
                </div>

                {node?.edge_media_to_caption?.edges?.map((item, index) => (
                  <p key={index} className="px-3 text-xs my-5 break-words">
                    {item?.node?.text}
                  </p>
                ))}
                {images[node?.id] && (
                  <img
                    src={`data:image/png;base64,${images[node?.id]}`}
                    className="w-full my-5"
                    alt=""
                  />
                )}

                <div className="pl-3 w-fit flex items-center gap-5 mt-5">
                  <div>
                    <img className="w-6 h-6 mb-1 mx-auto" src={likes} alt="" />
                    <p className="text-xs">
                      {millify(node?.edge_liked_by?.count || 0)} likes
                    </p>
                  </div>

                  <div>
                    <img
                      className="w-6 h-6 mb-1 mx-auto"
                      src={comment}
                      alt=""
                    />
                    <p className="text-xs">
                      {millify(node?.edge_media_to_comment?.count || 0)}{" "}
                      comments
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

export default Instagram;
