import React, { useEffect } from "react";
import axios from "axios";
import useStore from "../../../Store/useStore";
import { useState } from "react";
import { useRef } from "react";
import antPlay from "../../../Assets/antPlay.png";

import Spinner from "../../Spinner/Spinner";

const All = () => {
  const { flytantYoutube, setFlytantYoutube, setNotify } = useStore();
  const [loading, setLoading] = useState(true);
  const divRef = useRef();

  useEffect(() => {
    divRef.current.scrollIntoView();
    window.scroll(0, 0);
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
          <h1 className="font-semibold text-lg md:text-xl xl:text-2xl mb-5">
            Videos
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
            {flytantYoutube?.videos?.map((video, index) => (
              <div
                onClick={() =>
                  window.open(
                    `https://www.youtube.com/watch?v=${video?.id}`,
                    "_blank"
                  )
                }
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
                    className="bg-cover bg-center bg-no-repeat aspect-[6/4]"
                  />
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
