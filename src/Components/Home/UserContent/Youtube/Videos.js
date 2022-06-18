import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import useStore from "../../../../Store/useStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import antPlay from "../../../../Assets/antPlay.png";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../Spinner/Spinner";

/* Styles Start */
const styles = {
  heading: "font-semibold text-lg md:text-xl xl:text-2xl",
  prev: "hidden md:block absolute bg-white top-[35%] -left-3 z-10 w-14 px-1 text-5xl shadow-xl rounded-tr-3xl rounded-br-3xl cursor-pointer select-none",
  next: "hidden md:block absolute bg-white top-[35%] -right-3 z-10 w-14 px-1 text-5xl shadow-xl rounded-tl-3xl rounded-bl-3xl cursor-pointer select-none",
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
  const [loading, setLoading] = useState(true);
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
        .then((data) => {
          setFlytantYoutube(data?.data);
          setLoading(false);
        })
        .catch(() => {
          setNotify({ status: false, message: "Cannot get youtube data" });
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (flytantYoutube?.videos?.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className={styles.heading}>Videos</h1>
        <span
          onClick={() => navigate(`/allvideos`)}
          className="cursor-pointer font-medium text-sm md:text-md"
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
          {flytantYoutube?.videos?.slice(0, 10)?.map((video, index) => (
            <SwiperSlide key={index} className="rounded-lg overflow-hidden">
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
