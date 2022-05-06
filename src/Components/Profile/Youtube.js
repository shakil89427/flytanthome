import axios from "axios";
import React, { useEffect, useState } from "react";
import youtube from "../../Assets/profileSocials/youtube.png";

const Youtube = ({ details }) => {
  const [channelInfo, setChannelInfo] = useState({});
  const [videos, setVideos] = useState([]);

  // const getItems = async (channelId) => {
  //   try {
  //     const response = await axios.get(
  //       "https://www.googleapis.com/youtube/v3/search",
  //       {
  //         params: {
  //           part: "snippet",
  //           channelId,
  //           maxResults: 20,
  //           order: "date",
  //           type: "video",
  //           key: process.env.REACT_APP_GOOGLE_API_KEY,
  //         },
  //       }
  //     );
  //     setVideos(response?.data?.items);
  //     console.log(response?.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getChannelInfo = async (channelId) => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          id: channelId,
          part: "snippet,statistics",
          key: process.env.REACT_APP_GOOGLE_API_KEY,
        },
      }
    );
    const data = response.data.items.map((item) => {
      return {
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        statistics: item.statistics,
      };
    });
    setChannelInfo(data[0]);
    console.log(data[0]);
  };

  useEffect(() => {
    if (details?.linkedAccounts?.Youtube?.channelId) {
      getChannelInfo(details?.linkedAccounts?.Youtube?.channelId);
    }
  }, [details]);

  return (
    <div className="">
      {/* <div className="flex flex-col items-center gap-5 mt-40 text-gray-500 text-sm font-medium">
          <p>No account linked</p>
          <a
            href={`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube.readonly&response_type=token&state=youtubev3&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
          >
            <img className="w-1/2 mx-auto" src={youtube} alt="" />
          </a>
          <p>Click here to link your youtube</p>
        </div> */}

      <div className="">
        <div className="flex justify-between border-b-2 py-8">
          <div className="flex flex-col items-center gap-3">
            <p className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-xl font-medium">
              {channelInfo?.statistics?.subscriberCount}
            </p>
            <p className="text-sm font-medium">Subscriber</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <p className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-xl font-medium">
              10
            </p>
            <p className="text-sm font-medium">Views/Video</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <p className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-xl font-medium">
              {channelInfo?.statistics?.viewCount}
            </p>
            <p className="text-sm font-medium">Views</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <p className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-xl font-medium">
              {parseFloat(
                channelInfo?.statistics?.viewCount /
                  channelInfo?.statistics?.subscriberCount /
                  100
              ).toFixed(2)}
              %
            </p>
            <p className="text-sm font-medium">Engagement</p>
          </div>
        </div>
        <div className="py-8 border-b-2 flex justify-center gap-2">
          <div className="w-fit">
            <div
              style={{
                backgroundImage: `url(${channelInfo?.thumbnail})`,
              }}
              className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat"
            />
          </div>
          <span className="w-fit">
            <p className="text-xl font-medium mt-3 mb-2">
              {channelInfo?.title}
            </p>
            <p className="text-sm pr-5 text">{channelInfo?.description}</p>
          </span>
        </div>
        <div className="py-8">
          <p className="text-xl font-medium">Latest videos</p>
          <div className="mt-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Youtube;
