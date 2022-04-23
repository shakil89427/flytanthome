import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { MdNavigateNext } from "react-icons/md";

/* Styles Start */
const styles = {
  heading: "font-semibold text-xl md:text-3xl",
  applied:
    "bg-[#F5B63A] text-white absolute top-4 right-0 px-3 py-1 rounded-tl-lg rounded-bl-lg",
  image: "h-72 rounded-md bg-cover bg-center bg-no-repeat",
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
    <div className="r-box py-8 relative">
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
                        {Math.round(
                          (Date.now() - sponsorship?.creationDate) / 86400000
                        )}{" "}
                        days ago
                      </p>
                    )}
                  </div>

                  <p className={styles.title}>{sponsorship?.name}</p>

                  <div className={styles.bottomWrapper}>
                    <p className={styles.followers}>
                      Min {sponsorship.minFollowers} followers required
                    </p>

                    <div className="flex justify-between">
                      <div className={styles.icons}>
                        {sponsorship?.platforms?.includes("Instagram") && (
                          <AiFillInstagram />
                        )}
                        {sponsorship?.platforms?.includes("Twitter") && (
                          <AiFillTwitterSquare />
                        )}
                        {sponsorship?.platforms?.includes("Facebook") && (
                          <AiFillFacebook />
                        )}
                      </div>
                      {type !== "Latest" && (
                        <p>
                          {Math.round(
                            (Date.now() - sponsorship?.creationDate) / 86400000
                          )}{" "}
                          days ago
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
