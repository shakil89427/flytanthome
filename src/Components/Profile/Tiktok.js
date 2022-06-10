import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTiktok } from "react-icons/fa";
import useConnect from "../../Hooks/Tiktok/useConnect";
import useStore from "../../Store/useStore";
import like from "../../Assets/profileSocials/tiktok/like.png";
import comment from "../../Assets/profileSocials/tiktok/comment.png";
import share from "../../Assets/profileSocials/tiktok/share.png";
import Spinner from "../Spinner/Spinner";
import millify from "millify";
const Tiktok = ({ details }) => {
  const { tiktokData, setTiktokData } = useStore();
  const [data, setData] = useState({});
  const [avg, setAvg] = useState({ likes: 0, engagement: 0 });
  const [loading, setLoading] = useState(true);
  const { openPopup } = useConnect(setLoading);

  const getData = async (userId) => {
    try {
      const response = await axios.post(
        "https://flytant.herokuapp.com/tiktokdata",
        {
          userId,
        }
      );
      const responseData = { ...response.data, validId: details.id };
      setData(responseData);
      setTiktokData([...tiktokData, responseData]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data?.videos?.length > 0) {
      const totalLikes = data?.videos?.reduce((total, current) => {
        return total + current?.like_count;
      }, 0);
      setAvg({ ...avg, likes: Math.round(totalLikes / data?.videos?.length) });
    }
  }, [data]);

  useEffect(() => {
    setData({});
    setLoading(true);
    if (details?.linkedAccounts?.Tiktok?.access_token) {
      const valid = tiktokData.find((item) => item.validId === details.id);
      if (valid?.validId) {
        setData(valid);
        setLoading(false);
      } else {
        getData(details?.id);
      }
    } else {
      setLoading(false);
    }
  }, [details]);

  return (
    <>
      {loading && <Spinner />}
      {!loading &&
        !details?.linkedAccounts?.Tiktok?.access_token &&
        details?.access && (
          <div className="flex flex-col items-center gap-5 mt-40 text-gray-500 text-sm font-medium">
            <p>No account linked</p>
            <p
              onClick={openPopup}
              className="bg-black text-white text-3xl p-5 rounded-full cursor-pointer"
            >
              <FaTiktok />
            </p>
            <p>Click here to link your tiktok</p>
          </div>
        )}
      {!loading &&
        !details?.linkedAccounts?.Tiktok?.access_token &&
        !details?.access && (
          <div className="flex flex-col items-center gap-5 mt-40 text-gray-500 text-sm font-medium">
            <p>No account linked</p>
            <p className="bg-black text-white text-3xl p-5 rounded-full">
              <FaTiktok />
            </p>
          </div>
        )}
      {!loading && data?.display_name && (
        <div>
          <div className="flex justify-between border-b-2 py-8">
            <div className="flex flex-col items-center gap-3">
              <p className="w-[65px] h-[65px] md:w-20 md:h-20 bg-gray-200 rounded-full flex items-center justify-center text-lg font-medium">
                2
              </p>
              <p className="text-sm font-medium text-gray-500">Followers</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="w-[65px] h-[65px] md:w-20 md:h-20 bg-gray-200 rounded-full flex items-center justify-center text-lg font-medium">
                3
              </p>
              <p className="text-sm font-medium text-gray-500">Following</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="w-[65px] h-[65px] md:w-20 md:h-20 bg-gray-200 rounded-full flex items-center justify-center text-lg font-medium">
                {millify(avg?.likes)}
              </p>
              <p className="text-sm font-medium text-gray-500">Likes/Video</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="w-[65px] h-[65px] md:w-20 md:h-20 bg-gray-200 rounded-full flex items-center justify-center text-lg font-medium">
                {avg?.engagement}
              </p>
              <p className="text-sm font-medium text-gray-500">Engagement</p>
            </div>
          </div>
          <div className="py-8 border-b-2 items-center flex gap-2">
            <div
              style={{
                backgroundImage: `url(${data?.avatar_url})`,
              }}
              className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat"
            />
            <p className="text-xl font-medium">{data?.display_name}</p>
          </div>
          <p className="text-xl font-medium my-5">Latest Post</p>
          <div className="">
            {data?.videos?.map((video) => (
              <div key={video?.id} className="flex flex-col w-full gap-4">
                <div className="border rounded-md overflow-hidden">
                  <img src={video?.cover_image_url} alt="" />
                  <p className="text-xs my-3 px-3 break-words">
                    {video?.video_description}
                  </p>
                  <div className="pl-3 w-fit flex items-center gap-5 my-5">
                    <div>
                      <img className="w-6 h-6 mb-1 mx-auto" src={like} alt="" />
                      <p className="text-xs">
                        {millify(video?.like_count)} likes
                      </p>
                    </div>
                    <div>
                      <img
                        className="w-6 h-6 mb-1 mx-auto"
                        src={comment}
                        alt=""
                      />
                      <p className="text-xs">
                        {millify(video?.comment_count)} Comments
                      </p>
                    </div>
                    <div>
                      <img
                        className="w-6 h-6 mb-1 mx-auto"
                        src={share}
                        alt=""
                      />
                      <p className="text-xs">
                        {millify(video?.share_count)} Share
                      </p>
                    </div>
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

export default Tiktok;
