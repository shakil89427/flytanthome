import axios from "axios";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import twitter from "../../Assets/profileSocials/twitter.png";
import useConnect from "../../Hooks/Twitter/useConnect";
import useStore from "../../Store/useStore";
import Spinner from "../Spinner/Spinner";
import likes from "../../Assets/profileSocials/twitter/likes.png";
import retweet from "../../Assets/profileSocials/twitter/retweet.png";
import moment from "moment";

const Twitter = ({ details }) => {
  const { twitterData, setTwitterData } = useStore();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [avg, setAvg] = useState({ likes: 0, retweets: 0, rating: 0 });
  const { openPopup } = useConnect(setLoading);
  const db = getFirestore();

  /* Get user data */
  const getData = async (info) => {
    const userRef = doc(db, "users", details.id);
    try {
      const response = await axios.post(
        "https://flytant.herokuapp.com/twitterdata",
        info
      );
      if (response?.data?.error) {
        setLoading(false);
        const { Twitter, ...rest } = details.linkedAccounts;
        const updated = { linkedAccounts: rest };
        return await updateDoc(userRef, updated);
      }
      const responseData = { ...response.data.userInfo, validId: details.id };
      setData(responseData);
      setTwitterData([...twitterData, responseData]);
      setLoading(false);
      if (response?.data?.tokenInfo) {
        const updated = {
          linkedAccounts: {
            ...details.linkedAccounts,
            Twitter: response?.data?.tokenInfo,
          },
        };
        await updateDoc(userRef, updated);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  /* Check data exist or not */
  useEffect(() => {
    if (details?.linkedAccounts?.Twitter) {
      const valid = twitterData.find((item) => item.validId === details.id);
      if (valid?.validId) {
        setData(valid);
        setLoading(false);
      } else {
        getData(details?.linkedAccounts?.Twitter);
      }
    } else {
      setLoading(false);
    }
  }, [details]);

  useEffect(() => {
    if (data?.tweets?.length > 0) {
      const totalLikes = data?.tweets?.reduce((total, current) => {
        return total + current?.public_metrics?.like_count;
      }, 0);
      const likes = Math.round(totalLikes / data?.tweets?.length);
      const totalRetweets = data?.tweets?.reduce((total, current) => {
        return total + current?.public_metrics?.retweet_count;
      }, 0);
      const retweets = Math.round(totalRetweets / data?.tweets?.length);
      setAvg((prev) => {
        return { ...prev, likes, retweets };
      });
    }
  }, [data]);

  return (
    <>
      {loading && <Spinner />}
      {!loading && !data?.id && details.access && (
        <div className="flex flex-col items-center gap-5 mt-40 text-gray-500 text-sm font-medium">
          <p>No account linked</p>
          <p onClick={openPopup}>
            <img className="w-1/2 mx-auto" src={twitter} alt="" />
          </p>
          <p>Click here to link your twitter</p>
        </div>
      )}
      {!loading && !data?.id && !details.access && (
        <p className="mt-20 text-center">No data found</p>
      )}
      {!loading && data?.id && (
        <div>
          <div className="flex justify-between border-b-2 py-8">
            <div className="flex flex-col items-center gap-3">
              <p className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-xl font-medium">
                {data?.public_metrics?.followers_count}
              </p>
              <p className="text-sm font-medium">Followers</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-xl font-medium">
                {avg.likes}
              </p>
              <p className="text-sm font-medium">Likes/Tweet</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-xl font-medium">
                {avg.retweets}
              </p>
              <p className="text-sm font-medium">Retweet/Tweet</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-xl font-medium">
                {avg.rating}%
              </p>
              <p className="text-sm font-medium">Avg RT</p>
            </div>
          </div>
          <div className="py-8 border-b-2 flex gap-2">
            <div className="w-fit">
              <div
                style={{
                  backgroundImage: `url(${data?.profile_image_url})`,
                }}
                className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat"
              />
            </div>
            <span className="w-fit">
              <p className="text-xl font-medium mt-3 mb-2">{data?.name}</p>
              <p className="text-sm pr-5 text">{data?.description}</p>
            </span>
          </div>
          <p className="text-xl font-medium my-5">Latest Tweets</p>
          {data?.tweets?.map((tweet) => (
            <div className="border my-3 py-6 rounded-md" key={tweet.id}>
              <div className="px-3 flex items-center gap-3">
                <div
                  style={{
                    backgroundImage: `url(${data?.profile_image_url})`,
                  }}
                  className="w-12 h-12 rounded-full bg-cover bg-center bg-no-repeat"
                />
                <span>
                  <p className="text-sm">{data?.name}</p>
                  <p className="text-xs text-gray-400">
                    {moment(tweet?.created_at).fromNow()}
                  </p>
                </span>
              </div>

              <p className="px-3 text-xs my-5">{tweet?.text}</p>
              {tweet?.attachments?.media_keys?.map((key) => (
                <div key={key}>
                  {data.media.map(
                    (item, index) =>
                      item.media_key === key && (
                        <img
                          key={index}
                          src={item.url}
                          className="w-full mb-5"
                          alt=""
                        />
                      )
                  )}
                </div>
              ))}
              <div className="pl-3 w-fit flex items-center gap-5">
                <div>
                  <img className="w-6 h-6 mb-1 mx-auto" src={likes} alt="" />
                  <p className="text-xs">
                    {tweet?.public_metrics?.like_count} likes
                  </p>
                </div>
                <div>
                  <img className="w-6 h-6 mb-1 mx-auto" src={retweet} alt="" />
                  <p className="text-xs">
                    {tweet?.public_metrics?.retweet_count} retweets
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Twitter;
