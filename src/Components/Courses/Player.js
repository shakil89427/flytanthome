import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Spinner2 from "../Spinner/Spinner2";
import useStore from "../../Store/useStore";
import JoLPlayer from "jol-player";
import { useRef } from "react";

const Player = () => {
  const { course, setSelectedScetion, selectedVideo, setSelectedVideo } =
    useStore();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const playerRef = useRef();

  const nextVideo = () => {
    course?.content?.forEach((item, index) => {
      if (
        item?.videoId === selectedVideo?.videoId &&
        index + 1 < course?.content?.length
      ) {
        setSelectedVideo(course?.content[index + 1]);
        setSelectedScetion(course?.content[index + 1].sectionName);
      }
    });
  };

  useEffect(() => {
    if (!selectedVideo?.videoId) return;
    setLoading(true);
    axios
      .post("https://arcane-castle-29935.herokuapp.com/getvideo", {
        videoId: selectedVideo?.videoId,
      })
      .then((res) => {
        const sorted = res.data.request.files.progressive.sort(
          (a, b) => a.height - b.height
        );
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
  }, [selectedVideo]);

  useEffect(() => {
    if (!selectedVideo?.videoId) {
      setSelectedVideo(course?.content[0]);
      setSelectedScetion(course?.content[0].sectionName);
    }
  }, []);

  return (
    <div className="mt-10">
      {loading && (
        <div
          style={{
            backgroundImage: `url(${
              selectedVideo?.thumbnail || "https://vumbnail.com/718275739.jpg"
            })`,
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
          ref={playerRef}
          className="aspect-[4/2] z-10"
          option={{
            videoSrc: videos?.length > 0 ? videos[0]?.url : "",
            poster:
              selectedVideo?.thumbnail || "https://vumbnail.com/718275739.jpg",
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
          onEndEd={nextVideo}
        />
      )}
    </div>
  );
};

export default Player;
