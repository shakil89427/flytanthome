import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css";
import useStore from "../../../../Store/useStore";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

/* Styles Start */
const styles = {
  heading: "font-semibold text-xl md:text-2xl",
  image: "w-full h-full rounded-md bg-cover bg-center bg-no-repeat",
  nameWrapper: "flex items-center justify-between",
  name: "text-lg md:text-xl text-black font-semibold",
  icons: "flex gap-2 text-[#B4B4B4] my-1 text-xl",
  options: "flex gap-2 flex-wrap mt-3",
  option: "bg-[#DDDDDD] text-xs px-3 py-1 rounded-xl",
  prev: "hidden md:block absolute bg-white top-[15%] -left-3 z-10 w-14 px-1 text-5xl shadow-xl rounded-tr-3xl rounded-br-3xl cursor-pointer select-none",
  next: "hidden md:block absolute bg-white top-[15%] -right-3 z-10 w-14 px-1 text-5xl shadow-xl rounded-tl-3xl rounded-bl-3xl cursor-pointer select-none",
};
/* Styles End */

const PopularInfluencers = () => {
  const navigate = useNavigate();
  const {
    popularInfluencers,
    setPopularInfluencers,
    popularIndex,
    setPopularIndex,
  } = useStore();
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const colRef = collection(db, "users");

  const [swiper, setSwiper] = useState();
  const nextRef = useRef();
  const prevRef = useRef();

  const getPopular = async (q) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getDocs(q);
      const data = [];
      response?.docs.forEach((item) => {
        const val = { ...item?.data(), id: item?.id };
        if (
          val?.profileImageUrl &&
          !val?.profileImageUrl?.toLowerCase().includes("default") &&
          val?.profileImageUrl !== ""
        ) {
          data.push(val);
        }
      });
      if (!data?.length) return setLoading(false);
      setPopularInfluencers((prev) => {
        return {
          data: [...prev.data, ...data],
          lastVisible: response?.docs[response?.docs?.length - 1],
        };
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (popularInfluencers?.data?.length) {
      const q = query(
        colRef,
        where("shouldShowInfluencer", "==", true),
        orderBy("socialScore", "desc"),
        startAfter(popularInfluencers?.lastVisible),
        limit(20)
      );
      if (popularIndex + 6 >= popularInfluencers?.data?.length) {
        getPopular(q);
      }
    }
  }, [popularIndex]);

  useEffect(() => {
    if (!popularInfluencers?.data?.length) {
      const q = query(
        colRef,
        where("shouldShowInfluencer", "==", true),
        orderBy("socialScore", "desc"),
        limit(20)
      );
      getPopular(q);
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
        <h1 className={styles.heading}>Popular Influencers</h1>
        <span
          onClick={() => navigate("/popularinfluencers")}
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
          onSlideChange={(val) => setPopularIndex(val?.realIndex)}
          initialSlide={popularIndex}
          onSwiper={setSwiper}
          slidesPerView={1.2}
          spaceBetween={20}
          breakpoints={{
            576: {
              slidesPerView: 2.2,
            },
            1024: {
              slidesPerView: 3.2,
            },
            1366: {
              slidesPerView: 4,
            },
          }}
          className="grid grid-cols-1"
        >
          {popularInfluencers?.data?.map((item, index) => (
            <SwiperSlide
              onClick={() => navigate(`/profile/${item?.id}`)}
              key={index}
              className="cursor-pointer border rounded-xl overflow-hidden"
            >
              <div className="pb-5">
                <div
                  style={{
                    backgroundImage: `url(https://blog.prepscholar.com/hubfs/feature_rainbow_seven_colors.png)`,
                  }}
                  className="bg-cover bg-center bg-no-repeat aspect-[4/2]"
                />
                <div className="px-5 flex items-center justify-between -translate-y-1/2">
                  <div
                    style={{
                      backgroundImage: `url(${item?.profileImageUrl})`,
                    }}
                    className="bg-cover bg-center bg-no-repeat w-[25%] aspect-square rounded-full border-2"
                  />
                  <p className="flex items-center justify-center w-[20%] aspect-square bg-white rounded-full font-semibold border">
                    {item?.socialScore}
                  </p>
                </div>
                <div className="px-5">
                  <p className="text-lg font-semibold">
                    {item?.name.length > 15
                      ? item?.name.slice(0, 15) + "..."
                      : item?.name}
                  </p>
                  <p className="text-gray-500">@{item?.username}</p>
                  <p className="mt-5 text-sm text-gray-700">
                    {item?.bio?.length > 50
                      ? item?.bio?.slice(0, 50) + "..."
                      : item?.bio}
                  </p>
                  <p></p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className={`${styles.prev} ${
            popularIndex > 0 ? "visible" : "invisible"
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

export default PopularInfluencers;
