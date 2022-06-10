import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import {
  AiFillInstagram,
  AiFillYoutube,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import millify from "millify";

/* Styles Start */
const styles = {
  heading: "font-semibold text-xl md:text-2xl",
  applied:
    "bg-[#F5B63A] text-white absolute top-4 right-0 px-3 py-1 rounded-tl-full rounded-bl-full shadow-xl",
  image: "w-full h-full rounded-md bg-cover bg-center bg-no-repeat",
  typeWrapper: "flex items-center justify-between",
  type: "px-3 py-1 my-2 rounded-2xl text-xs font-medium",
  title: "font-semibold my-1 text-lg break-words",
  bottomWrapper: "flex flex-col gap-2",
  followers: "text-xs font-medium text-gray-600",
  icons: "text-[#B4B4B4] flex items-center gap-1 text-lg",
  prev: "hidden md:block absolute bg-white top-[15%] -left-3 z-10 w-14 px-1 text-5xl shadow-xl rounded-tr-3xl rounded-br-3xl cursor-pointer select-none",
  next: "hidden md:block absolute bg-white top-[15%] -right-3 z-10 w-14 px-1 text-5xl shadow-xl rounded-tl-3xl rounded-bl-3xl cursor-pointer select-none",
};
/* Styles End */

const Sponsorships = ({ sponsorships, type, activeIndex, setActiveIndex }) => {
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

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className={styles.heading}>{type} Sponsorships</h1>
        <span
          onClick={() => navigate(`/${type.toLowerCase()}`)}
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
          onSlideChange={(val) => setActiveIndex(val?.realIndex)}
          initialSlide={activeIndex}
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
          {sponsorships.map((sponsorship, index) => (
            <SwiperSlide
              onClick={() => navigate(`/sponsorshipdetails/${sponsorship.id}`)}
              key={index}
              className="cursor-pointer"
            >
              <div>
                {sponsorship?.applied >= 20 && (
                  <p className={styles.applied}>
                    {sponsorship?.applied} applied
                  </p>
                )}
                <div className="w-full aspect-[9/8] border rounded-md">
                  <div
                    className={styles.image}
                    style={{
                      backgroundImage: `url(${sponsorship?.blob[0].path})`,
                    }}
                    alt=""
                  />
                </div>

                <div className="mt-2 mr-3">
                  <div className={styles.typeWrapper}>
                    {type === "Latest" && (
                      <p
                        style={{
                          backgroundColor: !sponsorship?.barter
                            ? "#FFDE2F"
                            : "#3FD5F5",
                        }}
                        className={styles.type}
                      >
                        {!sponsorship?.barter ? "Paid" : "Barter"}
                      </p>
                    )}
                    {type === "Latest" && (
                      <p className="text-xs">
                        {moment(sponsorship?.creationDate * 1000).fromNow()}
                      </p>
                    )}
                  </div>

                  <p className={styles.title}>
                    {sponsorship?.name.length > 15
                      ? sponsorship?.name.slice(0, 15) + "..."
                      : sponsorship?.name}
                  </p>

                  <div className={styles.bottomWrapper}>
                    <p className={styles.followers}>
                      Min {millify(sponsorship.minFollowers)} followers required
                    </p>

                    <div className="flex justify-between">
                      <div className={styles.icons}>
                        {sponsorship?.platforms?.includes("Instagram") && (
                          <AiFillInstagram />
                        )}
                        {sponsorship?.platforms?.includes("Twitter") && (
                          <AiFillYoutube />
                        )}

                        {sponsorship?.platforms?.includes("Twitter") && (
                          <AiFillTwitterSquare />
                        )}
                        {sponsorship?.platforms?.includes("Twitter") && (
                          <FaTiktok className="w-3" />
                        )}
                      </div>
                      {type !== "Latest" && (
                        <p className="text-xs">
                          {moment(sponsorship?.creationDate * 1000).fromNow()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className={`${styles.prev} ${
            activeIndex > 0 ? "visible" : "invisible"
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

export default Sponsorships;
