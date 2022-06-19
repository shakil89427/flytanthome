import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import JoLPlayer from "jol-player";
import Spinner from "../Spinner/Spinner";
import useStore from "../../Store/useStore";

const Player = ({ videoId }) => {
  const { setNotify } = useStore();
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
        setNotify({ status: false, message: "Something went wrong" });
      });
  }, [videoId]);

  return (
    <div className="mt-8">
      {loading && <Spinner />}
      {!loading && videos?.length > 0 && (
        <JoLPlayer
          className="aspect-[4/2]"
          option={{
            videoSrc: videos[0]?.url,
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
