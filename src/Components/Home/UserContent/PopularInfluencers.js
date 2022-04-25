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
} from "firebase/firestore";

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
  const db = getFirestore();
  const colRef = collection(db, "users");

  const getPopular = async () => {
    const temp = [];
    const q = query(
      colRef,
      where("profileImageUrl", "!=", null),
      where("shouldShowInfluencer", "==", true),
      orderBy("profileImageUrl", "asc"),
      orderBy("socialScore", "desc"),
      limit(20)
    );
    try {
      const response = await getDocs(q);
      response.forEach((data) => {
        temp.push({ id: data.id, ...data.data() });
      });
    } catch (err) {}
    setInfluencers(temp);
  };

  useEffect(() => {
    getPopular();
  }, []);

  return (
    <div style={{ padding: "0" }} className="mb-24 r-box">
      <h1 className={styles.heading}>Popular Influencers</h1>
      <Swiper
        modules={[Autoplay]}
        loop
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
