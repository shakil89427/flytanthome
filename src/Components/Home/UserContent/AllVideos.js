import React, { useEffect } from "react";
import axios from "axios";
import useStore from "../../../Store/useStore";
import { useState } from "react";
import { useRef } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Spinner from "../../Spinner/Spinner";

const All = () => {
  const { flytantYoutube, setFlytantYoutube, setNotify } = useStore();
  const [loading, setLoading] = useState(true);
  const divRef = useRef();

  useEffect(() => {
    divRef.current.scrollIntoView();
  }, []);

  useEffect(() => {
    if (!flytantYoutube?.id) {
      axios
        .post("https://flytant.herokuapp.com/youtubedata", {
          channelId: "UC_r46_UgBvaG2k94LDjEIWQ",
        })
        .then((data) => {
          setFlytantYoutube(data?.data);
          setLoading(false);
        })
        .catch((err) => {
          setNotify({ status: false, message: "Something went wrong" });
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div ref={divRef} className="pt-5 pb-14">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="font-semibold text-xl md:text-2xl mb-5">Videos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
            {flytantYoutube?.videos?.map((video, index) => (
              <div
                key={index}
                className="cursor-pointer rounded-lg overflow-hidden"
              >
                <div className="relative">
                  <img src={video?.snippet?.thumbnails?.high?.url} alt="" />
                  <p className="absolute text-white bottom-0 right-1 text-sm bg-black">
                    {video?.contentDetails?.duration
                      .replace("PT", "")
                      .replace("H", ":")
                      .replace("M", ":")
                      .replace("S", "")}
                  </p>
                </div>
                <div className="flex gap-3 mt-2">
                  <div
                    style={{
                      backgroundImage: `url(${flytantYoutube?.snippet?.thumbnails?.medium?.url})`,
                    }}
                    className="bg-cover bg-center bg-no-repeat aspect-square rounded-full w-[35px] h-[35px]"
                  />
                  <div className="">
                    <p className="text-sm ">
                      {video?.snippet?.title?.length > 40
                        ? video?.snippet?.title?.slice(0, 40) + "..."
                        : video?.snippet?.title}
                    </p>
                    <div className="flex items-center gap-1 text-xs mt-2 text-gray-500 font-medium">
                      <p>{flytantYoutube?.snippet?.title}</p>
                      <BsFillCheckCircleFill className="" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default All;
