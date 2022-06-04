import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import likes from "../../Assets/profileSocials/tiktok/like.png";
import comment from "../../Assets/profileSocials/tiktok/comment.png";
import defaultUser from "../../Assets/defaultUser.png";
import instagram from "../../Assets/profileSocials/instagram.png";
import Spinner from "../../Components/Spinner/Spinner";
import useConnect from "../../Hooks/Instagram/useConnect";
import useStore from "../../Store/useStore";
import millify from "millify";

const Instagram = ({ details }) => {
  const { instagramData, setInstagramData, setNotify } = useStore();
  const [loading, setLoading] = useState(true);
  const { openPopup } = useConnect(setLoading);
  const [data, setData] = useState({});
  const [avg, setAvg] = useState({ likes: 0, engagement: 0 });

  const getImage = async (url, id) => {
    try {
      const {
        data: { image },
      } = await axios.post("https://flytant.herokuapp.com/getimage", {
        url,
      });
      setData((prev) => {
        const newData = { ...prev };
        newData[id] = image;
        return newData;
      });
    } catch (err) {}
  };

  useEffect(() => {
    if (data?.profile_pic_url) {
      const promises = [];
      promises.push(getImage(data?.profile_pic_url, "profileImg"));
      data?.edge_owner_to_timeline_media?.edges?.forEach((item) => {
        if (item?.node?.thumbnail_src) {
          promises.push(getImage(item?.node?.thumbnail_src, item?.node?.id));
        }
      });
      Promise.allSettled(promises)
        .then(() => {
          setInstagramData([
            ...instagramData,
            { ...data, validId: details?.id },
          ]);
        })
        .catch(() => {
          setNotify({ status: false, meessage: "Something went wrong" });
        });
    }
  }, [data]);

  const getFullData = async (userId) => {
    try {
      const response = await axios.post(
        "https://flytant.herokuapp.com/instadata",
        {
          userId,
        }
      );
      if (response?.data?.details?.graphql?.user) {
        setData(response?.data?.details?.graphql?.user);
        return setLoading(false);
      }
      if (details?.linkedAccounts?.Instagram?.details?.graphql?.user) {
        setData(details?.linkedAccounts?.Instagram?.details?.graphql?.user);
        return setLoading(false);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setNotify({ status: false, meessage: "Something went wrong" });
    }
  };

  useEffect(() => {
    setData({});
    setLoading(true);
    if (details?.linkedAccounts?.Instagram?.username) {
      const valid = instagramData.find((item) => item.validId === details.id);
      if (valid?.validId) {
        setData(valid);
        setLoading(false);
      } else {
        getFullData(details?.userId);
      }
    } else {
      setLoading(false);
    }
  }, [details]);

  useEffect(() => {
    if (data?.edge_owner_to_timeline_media?.edges?.length > 0) {
      const totalLikes = data?.edge_owner_to_timeline_media?.edges?.reduce(
        (total, current) => {
          return total + current?.node?.edge_liked_by?.count;
        },
        0
      );
      const likes = Math.round(
        totalLikes / data?.edge_owner_to_timeline_media?.edges?.length
      );
      const engagement = parseFloat(
        likes / data?.edge_followed_by?.count
      ).toFixed(2);
      setAvg({ likes, engagement });
    }
  }, [data]);

  return (
    <>
      {loading && <Spinner />}
      {!loading &&
        !details?.linkedAccounts?.Instagram?.username &&
        details.access && (
          <div className="flex flex-col items-center gap-5 mt-40 text-gray-500 text-sm font-medium">
            <p>No account linked</p>
            <p onClick={openPopup}>
              <img
                className="w-1/2 mx-auto cursor-pointer"
                src={instagram}
                alt=""
              />
            </p>
            <p>Click here to link your twitter</p>
          </div>
        )}
      {!loading &&
        !details?.linkedAccounts?.Instagram?.username &&
        !details.access && (
          <div className="flex flex-col items-center gap-5 mt-40 text-gray-500 text-sm font-medium">
            <p>No account linked</p>
            <p>
              <img className="w-1/2 mx-auto " src={instagram} alt="" />
            </p>
          </div>
        )}
      {!loading && data?.full_name && (
        <div>
          <div className="flex justify-between border-b-2 py-8">
            <div className="flex flex-col items-center gap-3">
              <p className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-lg font-medium">
                {millify(data?.edge_followed_by?.count)}
              </p>
              <p className="text-sm font-medium">Followers</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-lg font-medium">
                {millify(data?.edge_follow?.count)}
              </p>
              <p className="text-sm font-medium">Following</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-lg font-medium">
                {millify(avg.likes)}
              </p>
              <p className="text-sm font-medium">Likes/Post</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-lg font-medium">
                {avg.engagement}%
              </p>
              <p className="text-sm font-medium">Engagement</p>
            </div>
          </div>
          <div className="py-8 border-b-2 flex gap-2">
            <div className="w-fit">
              <div
                style={{
                  backgroundImage: data?.profileImg
                    ? `url(data:image/png;base64,${data?.profileImg})`
                    : `url(${defaultUser})`,
                }}
                className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat"
              />
            </div>
            <span className="w-fit">
              <p className="text-xl font-medium mt-3 mb-2">{data?.full_name}</p>
              <p className="text-sm pr-5 text">{data?.biography}</p>
            </span>
          </div>
          <p className="text-xl font-medium my-5">Latest Posts</p>
          <div className="max-h-[600px] overflow-y-scroll">
            {data?.edge_owner_to_timeline_media?.edges?.map(({ node }) => (
              <div className="border my-3 py-6 rounded-md" key={node.id}>
                <div className="px-3 flex items-center gap-3">
                  <div
                    style={{
                      backgroundImage: data?.profileImg
                        ? `url(data:image/png;base64,${data?.profileImg})`
                        : `url(${defaultUser})`,
                    }}
                    className="w-12 h-12 rounded-full bg-cover bg-center bg-no-repeat"
                  />
                  <span>
                    <p className="text-sm">{data?.full_name}</p>
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
                {data[node?.id] && (
                  <img
                    src={`data:image/png;base64,${data[node?.id]}`}
                    className="w-full mb-5"
                    alt=""
                  />
                )}

                <div className="pl-3 w-fit flex items-center gap-5">
                  <div>
                    <img className="w-6 h-6 mb-1 mx-auto" src={likes} alt="" />
                    <p className="text-xs">
                      {millify(node?.edge_liked_by?.count)} likes
                    </p>
                  </div>

                  <div>
                    <img
                      className="w-6 h-6 mb-1 mx-auto"
                      src={comment}
                      alt=""
                    />
                    <p className="text-xs">
                      {millify(node?.edge_media_to_comment?.count)} comments
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Instagram;
