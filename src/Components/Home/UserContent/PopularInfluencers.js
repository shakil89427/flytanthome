import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
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
import Spinner from "../../Spinner/Spinner";

/* Styles Start */
const styles = {
  heading: "font-semibold text-xl md:text-3xl mx-5 mb-10",
  img: "h-[450px] rounded-md bg-cover bg-center bg-no-repeat",
  tag: "absolute top-[80%] left-8 bg-green-400 px-5 py-1 rounded-xl text-sm text-white",
  profileWrapper: "flex items-center gap-2 mt-3",
  profileImg: "w-10 h-10 rounded-full bg-cover bg-center bg-no-repeat",
};
/* Styles End */

const PopularInfluencers = ({ popular }) => {
  const [influencers, setInfluencers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);
  const db = getFirestore();
  const colRef = collection(db, "users");

  const getPopular = async (q) => {
    if (activeIndex === "Last") return;
    try {
      const response = await getDocs(q);
      const data = response?.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });
      if (!data?.length) return setActiveIndex("Last");
      setLastVisible(response.docs[response.docs.length - 1]);
      setInfluencers((prev) => [...prev, ...data]);
    } catch (err) {}
  };

  useEffect(() => {
    if (!influencers?.length) return;
    const q = query(
      colRef,
      where("profileImageUrl", "!=", null),
      where("shouldShowInfluencer", "==", true),
      orderBy("profileImageUrl", "asc"),
      orderBy("socialScore", "desc"),
      startAfter(lastVisible),
      limit(20)
    );
    if (activeIndex === influencers?.length) {
      getPopular(q);
    }
  }, [activeIndex]);

  useEffect(() => {
    const q = query(
      colRef,
      where("profileImageUrl", "!=", null),
      where("shouldShowInfluencer", "==", true),
      orderBy("profileImageUrl", "asc"),
      orderBy("socialScore", "desc"),
      limit(20)
    );
    getPopular(q);
  }, []);

  return (
    <div style={{ padding: "0" }} className="mb-24 r-box">
      <h1 className={styles.heading}>Popular Influencers</h1>
      <Swiper
        onSlideChange={(val) => setActiveIndex(val?.realIndex + 6)}
        modules={[Autoplay]}
        autoplay
        speed={500}
        slidesPerView={1.5}
        initialSlide={1}
        spaceBetween={40}
        centeredSlides
        centeredSlidesBounds
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2.3,
          },
          768: {
            slidesPerView: 2.6,
          },
          1086: {
            slidesPerView: 3.5,
          },
        }}
      >
        {influencers.map((item, index) => (
          <SwiperSlide key={index} onClick={() => console.log(index)}>
            <div className="relative">
              <div
                className={styles.img}
                style={{
                  backgroundImage: `url(${item?.profileImageUrl})`,
                }}
                alt=""
              />
              <p className={styles.tag}>Food</p>
              <div className={styles.profileWrapper}>
                <div
                  className={styles.profileImg}
                  style={{
                    backgroundImage: `url(${item?.profileImageUrl})`,
                  }}
                  alt=""
                />
                <p className="font-light text-sm">
                  by <span className="font-bold italic">{item?.name}</span>
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularInfluencers;
