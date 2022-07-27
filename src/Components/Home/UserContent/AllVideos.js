import React, { useEffect } from "react";
import axios from "axios";
import useStore from "../../../Store/useStore";
import { useState } from "react";
import { useRef } from "react";
import antPlay from "../../../Assets/antPlay.png";
import Back from "../../../Assets/userHome/drawerItems/back.png";
import Spinner from "../../Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import useAnalytics from "../../../Hooks/useAnalytics";

const All = () => {
  const {
    flytantYoutube,
    setFlytantYoutube,
    flytantShow,
    setFlytantShow,
    setNotify,
  } = useStore();
  const [loading, setLoading] = useState(true);
  const divRef = useRef();
  const navigate = useNavigate();
  const { addLog } = useAnalytics();

  useEffect(() => {
    if (flytantYoutube?.videos?.length > 0 && flytantShow?.length < 1) {
      setFlytantShow(flytantYoutube?.videos?.slice(0, 12));
    }
  }, [flytantYoutube]);

  useEffect(() => {
    divRef.current.scrollIntoView();
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (!flytantYoutube?.id) {
      axios
        .post("https://arcane-castle-29935.herokuapp.com/youtubedata", {
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
          <div className="font-semibold text-lg md:text-xl xl:text-2xl mb-5 w-fit flex items-center gap-2">
            <img
              onClick={() => {
                addLog("back_previous_route");
                navigate(-1);
              }}
              src={Back}
              alt=""
              className="w-6 lg:w-7 xl:w-8 cursor-pointer"
            />
            <p>Videos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
            {flytantShow?.map((video, index) => (
              <div
                onClick={() => {
                  addLog("open_video_youtube");
                  window.open(
                    `https://www.youtube.com/watch?v=${video?.id}`,
                    "_blank"
                  );
                }}
                key={index}
                className="rounded-lg overflow-hidden cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={antPlay}
                    alt=""
                    className="absolute top-1/2 left-1/2 w-14 h-14 -translate-x-1/2 -translate-y-1/2 hover:scale-105 duration-150"
                  />
                  <div
                    style={{
                      backgroundImage: `url(${video?.snippet?.thumbnails?.medium?.url})`,
                    }}
                    className="bg-cover bg-center bg-no-repeat aspect-[5/4]"
                  />
                </div>
              </div>
            ))}
          </div>
          {flytantYoutube?.videos?.length !== flytantShow?.length && (
            <button
              onClick={() => {
                addLog("load_more");
                setFlytantShow(
                  flytantYoutube?.videos?.slice(0, flytantShow?.length + 12)
                );
              }}
              className="bg-black text-white px-7 font-medium hover:scale-105 duration-150 py-3 rounded-full mt-7 mx-auto block"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default All;
