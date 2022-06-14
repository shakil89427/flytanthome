import { fetchAndActivate, getString } from "firebase/remote-config";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../../../Store/useStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import moment from "moment";
/* Styles Start */
const styles = {
  heading: "font-semibold text-xl md:text-2xl",
  prev: "hidden md:block absolute bg-white top-[25%] -left-3 z-10 w-14 px-1 text-5xl shadow-xl rounded-tr-3xl rounded-br-3xl cursor-pointer select-none",
  next: "hidden md:block absolute bg-white top-[25%] -right-3 z-10 w-14 px-1 text-5xl shadow-xl rounded-tl-3xl rounded-bl-3xl cursor-pointer select-none",
};
/* Styles End */

const Stories = () => {
  const [swiper, setSwiper] = useState();
  const nextRef = useRef();
  const prevRef = useRef();
  const {
    blogsData,
    setBlogsData,
    remoteConfig,
    setNotify,
    setLoaded,
    blogIndex,
    setBlogIndex,
  } = useStore();
  const navigate = useNavigate();

  const getConfigs = async () => {
    try {
      await fetchAndActivate(remoteConfig);
      const temp = JSON.parse(getString(remoteConfig, "blogs"));
      const maped = temp?.map((item) => {
        const imgUrl = item?.content?.find((i) => i?.type === "image");
        const text = item?.content?.find((i) => i?.type === "text");
        return { ...item, imgUrl: imgUrl?.imgUrl, text: text.title };
      });
      const all = maped?.sort((a, b) => b?.creationDate - a?.creationDate);
      const carousel = all.filter((item) => item.slider);
      const notCarousel = all.filter((item) => !item.slider);
      setBlogsData({ all, carousel, notCarousel });
      setLoaded(notCarousel.slice(0, 5));
    } catch (err) {
      setNotify({ status: false, message: "Cannot get stories" });
    }
  };
  useEffect(() => {
    if (blogsData?.all?.length < 1) {
      getConfigs();
    }
  }, []);

  useEffect(() => {
    if (swiper) {
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className={styles.heading}>Top Stories</h1>
        <span
          onClick={() => navigate(`/blogs`)}
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
          onSlideChange={(val) => setBlogIndex(val?.realIndex)}
          initialSlide={blogIndex}
          onSwiper={setSwiper}
          slidesPerView={1.2}
          spaceBetween={20}
          breakpoints={{
            576: {
              slidesPerView: 2.3,
            },
            1024: {
              slidesPerView: 3.3,
            },
            1366: {
              slidesPerView: 4,
            },
          }}
          className="grid grid-cols-1"
        >
          {blogsData?.all?.map((item, index) => (
            <SwiperSlide
              onClick={() => navigate(`/blogdetails/${item?.blogId}`)}
              key={index}
              className="cursor-pointer rounded-tl-xl rounded-tr-xl overflow-hidden relative pb-5"
            >
              <div>
                <div
                  style={{
                    backgroundImage: `url(${item?.imgUrl})`,
                  }}
                  className="bg-cover bg-center bg-no-repeat aspect-[5/4]"
                />
                <p className="font-semibold">
                  {item?.title?.length > 40
                    ? item?.title?.slice(0, 40) + "..."
                    : item?.title}
                </p>
                <p className="absolute bottom-0 left-0 text-xs text-gray-500">
                  {moment.unix(item?.creationDate).fromNow()}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className={`${styles.prev} ${
            blogIndex > 0 ? "visible" : "invisible"
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

export default Stories;
