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
import { MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import moment from "moment";

/* Styles Start */
const styles = {
  heading: "font-semibold text-xl md:text-3xl",
  applied:
    "bg-[#F5B63A] text-white absolute top-4 right-0 px-3 py-1 rounded-tl-md rounded-bl-md",
  image: "h-72 rounded-md bg-cover bg-center bg-no-repeat",
  typeWrapper: "flex items-center justify-between",
  type: "px-3 py-1 my-2 rounded-2xl text-xs font-medium",
  title: "font-semibold my-1 text-lg md:text-xl",
  bottomWrapper: "flex flex-col gap-2",
  followers: "text-xs font-medium",
  icons: "text-[#B4B4B4] flex items-center gap-1 text-lg",
  next: "absolute bg-white top-[35%] -right-3 z-10 w-14 px-1 text-5xl shadow-xl rounded-tl-3xl rounded-bl-3xl cursor-pointer select-none",
};
/* Styles End */

const Sponsorships = ({ sponsorships, type, activeIndex, setActiveIndex }) => {
  const navigate = useNavigate();
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
    <div className="r-box my-28">
      <h1 className={styles.heading}>{type} Sponsorships</h1>
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
            768: {
              slidesPerView: 3.3,
            },
            1086: {
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
                <p className={styles.applied}>
                  {sponsorship?.applied ? sponsorship.applied : "0"} applied
                </p>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${sponsorship?.blob[0].path})`,
                  }}
                  alt=""
                />

                <div className="mt-2 mr-3">
                  <div className={styles.typeWrapper}>
                    {type === "Latest" && (
                      <p
                        style={{
                          backgroundColor: sponsorship?.barter
                            ? "#FFDE2F"
                            : "#3FD5F5",
                        }}
                        className={styles.type}
                      >
                        {sponsorship?.barter
                          ? "Paid Campaign"
                          : "Barter Campaign"}
                      </p>
                    )}
                    {type === "Latest" && (
                      <p className="text-xs">
                        {moment(sponsorship?.creationDate * 1000).fromNow()}
                      </p>
                    )}
                  </div>

                  <p className={styles.title}>{sponsorship?.name}</p>

                  <div className={styles.bottomWrapper}>
                    <p className={styles.followers}>
                      Min{" "}
                      {sponsorship.minFollowers < 1000
                        ? sponsorship.minFollowers
                        : Math.abs(sponsorship.minFollowers / 1000)
                            .toString()
                            .slice(0, 3) + "k"}{" "}
                      followers required
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
        <div className={styles.next} ref={nextRef}>
          <MdNavigateNext />
        </div>
      </div>
    </div>
  );
};

export default Sponsorships;
