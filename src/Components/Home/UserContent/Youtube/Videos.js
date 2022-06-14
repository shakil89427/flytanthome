import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import useStore from "../../../../Store/useStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

/* Styles Start */
const styles = {
  heading: "font-semibold text-xl md:text-2xl",
  prev: "hidden md:block absolute bg-white top-[15%] -left-3 z-10 w-14 px-1 text-5xl shadow-xl rounded-tr-3xl rounded-br-3xl cursor-pointer select-none",
  next: "hidden md:block absolute bg-white top-[15%] -right-3 z-10 w-14 px-1 text-5xl shadow-xl rounded-tl-3xl rounded-bl-3xl cursor-pointer select-none",
};
/* Styles End */

const Youtube = () => {
  const {
    flytantYoutube,
    setFlytantYoutube,
    flytantIndex,
    setFlytantIndex,
    setNotify,
  } = useStore();
  const navigate = useNavigate();
  const [swiper, setSwiper] = useState();
  const nextRef = useRef();
  const prevRef = useRef();

  useEffect(() => {
    if (swiper) {
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  useEffect(() => {
    if (!flytantYoutube?.id) {
      axios
        .post("https://flytant.herokuapp.com/youtubedata", {
          channelId: "UC_r46_UgBvaG2k94LDjEIWQ",
        })
        .then((data) => setFlytantYoutube(data?.data))
        .catch((err) =>
          setNotify({ status: false, message: "Cannot get youtube data" })
        );
    }
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className={styles.heading}>Videos</h1>
        <span
          onClick={() => navigate(`/allvideos`)}
          className="cursor-pointer font-medium"
        >
          View all
        </span>
      </div>
      <div className="my-5 relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: nextRef?.current,
          }}
          onSlideChange={(val) => setFlytantIndex(val?.realIndex)}
          initialSlide={flytantIndex}
          onSwiper={setSwiper}
          slidesPerView={1.3}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 2.3,
            },
            1024: {
              slidesPerView: 3.3,
            },
            1366: {
              slidesPerView: 4,
            },
          }}
        >
          {flytantYoutube?.videos?.map((video, index) => (
            <SwiperSlide
              key={index}
              className="cursor-pointer rounded-lg overflow-hidden"
            >
              <div className="relative ">
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
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className={`${styles.prev} ${
            flytantIndex > 0 ? "visible" : "invisible"
          }`}
          ref={prevRef}
        >
          <MdNavigateBefore />
        </div>
        <div className={styles.next} ref={nextRef}>
          <MdNavigateNext />
        </div>
      </div>
    </div>
  );
};

export default Youtube;
