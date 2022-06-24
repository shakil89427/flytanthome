import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import JoLPlayer from "jol-player";
import Spinner2 from "../Spinner/Spinner2";

const Player = ({ videoId, thumbnail }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post("https://flytant.herokuapp.com/getvideo", { videoId })
      .then(({ data }) => {
        const sorted = data.sort((a, b) => a.height - b.height);
        const maped = sorted.map((item) => {
          let name = "";
          if (item?.quality === "360p") {
            name = "SD";
          } else if (item?.quality === "540p") {
            name = "HD";
          } else if (item?.quality === "720p") {
            name = "FHD";
          } else {
            name = "BD";
          }
          return { ...item, name };
        });
        setVideos(maped);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [videoId]);

  return (
    <div className="mt-10">
      {loading && (
        <div
          style={{
            backgroundImage: `url(${thumbnail})`,
          }}
          className="aspect-[4/2] bg-cover bg-center bg-no-repeat relative"
        >
          <div className="absolute inset-0 flex items-center justify-center bg-[#aaaaaa63]">
            <Spinner2 />
          </div>
        </div>
      )}
      {!loading && (
        <JoLPlayer
          className="aspect-[4/2]"
          option={{
            videoSrc: videos?.length > 0 ? videos[0]?.url : "",
            poster: thumbnail,
            language: "en",
            pausePlacement: "center",
            isShowScreenshot: false,
            isShowMultiple: false,
            isShowWebFullScreen: false,
            isShowPicture: false,
            isToast: true,
            isShowPauseButton: true,
            quality: videos?.map(({ name, url }) => ({ name, url })),
          }}
        />
      )}
    </div>
  );
};

export default Player;
