import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillLinkedin,
} from "react-icons/ai";
import { MdNavigateNext } from "react-icons/md";

/* Styles Start */
const styles = {
  heading: "font-semibold text-xl md:text-3xl",
  applied:
    "bg-[#F5B63A] text-white absolute top-4 right-0 px-3 py-1 rounded-tl-lg rounded-bl-lg",
  image: "w-full h-72 rounded-md",
  typeWrapper: "flex items-center justify-between",
  type: "px-3 py-1 my-2 rounded-2xl text-xs font-medium",
  title: "font-semibold my-1",
  bottomWrapper: "flex flex-col gap-2",
  followers: "text-xs font-medium",
  icons: "text-[#B4B4B4] flex items-center gap-1 text-lg",
  next: "absolute bg-white top-[40%] right-0 z-10 w-14 px-1 text-5xl shadow-xl rounded-tl-3xl rounded-bl-3xl cursor-pointer",
};
/* Styles End */

const Sponsorships = ({ sponsorships, type }) => {
  const [swiper, setSwiper] = useState();
  const nextRef = useRef();

  useEffect(() => {
    if (swiper) {
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  return (
    <div className="pl-5 md:pl-10 lg:pr-10 py-8 relative">
      <h1 className={styles.heading}>{type} Sponsorships</h1>
      <div className="my-5">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: nextRef?.current,
          }}
          loop
          parallax
          observer
          observeParents
          initialSlide={1}
          onSwiper={setSwiper}
          slidesPerView={1.3}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 2.3,
            },
            768: {
              slidesPerView: 3.3,
            },
            1086: {
              slidesPerView: 4,
            },
          }}
        >
          {sponsorships.map((sponsorship, index) => (
            <SwiperSlide onClick={() => console.log(index)} key={index}>
              <div>
                <p className={styles.applied}>{sponsorship.applied} applied</p>
                <img
                  className={styles.image}
                  src={sponsorship.img + Math.random()}
                  alt=""
                />

                <div className="mt-2 mr-3">
                  <div className={styles.typeWrapper}>
                    <p
                      style={{
                        backgroundColor:
                          sponsorship.type === "Paid" ? "#FFDE2F" : "#3FD5F5",
                      }}
                      className={styles.type}
                    >
                      {sponsorship.type} Campaign
                    </p>
                    <p className="text-xs">{sponsorship.updated}</p>
                  </div>

                  <p className={styles.title}>{sponsorship.title}</p>

                  <div className={styles.bottomWrapper}>
                    <p className={styles.followers}>
                      Min {sponsorship.followers} followers required
                    </p>

                    <div className={styles.icons}>
                      <AiFillInstagram />
                      <AiFillFacebook />
                      <AiFillLinkedin />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.next} ref={nextRef}>
          <MdNavigateNext />
        </div>
      </div>
    </div>
  );
};

export default Sponsorships;
