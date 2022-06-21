import React, { useEffect, useRef } from "react";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import useStore from "../../../../Store/useStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../Spinner/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import moment from "moment";

const styles = {
  heading: "font-semibold text-lg md:text-xl xl:text-2xl",
  prev: "hidden md:block absolute bg-white top-[25%] -left-3 z-10 w-14 px-1 text-5xl shadow-xl rounded-tr-3xl rounded-br-3xl cursor-pointer select-none",
  next: "hidden md:block absolute bg-white top-[25%] -right-3 z-10 w-14 px-1 text-5xl shadow-xl rounded-tl-3xl rounded-bl-3xl cursor-pointer select-none",
};

const News = () => {
  const [swiper, setSwiper] = useState();
  const nextRef = useRef();
  const prevRef = useRef();
  const { allNews, setAllNews, newsIndex, setNewsIndex, setShowNewsCard } =
    useStore();
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const colRef = collection(db, "news");
      const q = query(colRef, orderBy("creationDate", "desc"), limit(10));
      const response = await getDocs(q);
      const data = response?.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      if (!data?.length) return setLoading(false);
      setAllNews({
        data,
        lastVisible: response?.docs[response?.docs?.length - 1],
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (allNews?.data?.length < 1) {
      getData();
    } else {
      setLoading(false);
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

  if (loading) {
    return <Spinner />;
  }
  if (allNews?.data?.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className={styles.heading}>News</h1>
        <span
          onClick={() => navigate(`/news`)}
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
          onSlideChange={(val) => setNewsIndex(val?.realIndex)}
          initialSlide={newsIndex}
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
          {allNews?.data?.slice(0, 10)?.map((item, index) => (
            <SwiperSlide
              onClick={() => setShowNewsCard(index)}
              key={item?.id}
              className="cursor-pointer rounded-tl-xl rounded-tr-xl overflow-hidden relative pb-5"
            >
              <div>
                <div
                  style={{
                    backgroundImage: `url(${item?.blob[0]?.path})`,
                  }}
                  className="bg-cover bg-center bg-no-repeat aspect-[5/4]"
                />
                <p className="font-semibold mt-2">
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
            newsIndex > 0 ? "visible" : "invisible"
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

export default News;
