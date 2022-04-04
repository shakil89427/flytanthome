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
import { featuredStyles, sponsorshipsStyles } from "../Styles/HomeStyles";

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
    <div className="px-5 py-8 relative">
      <h1 className={sponsorshipsStyles.heading}>{type} Sponsorships</h1>
      <div className="my-5 relative">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: nextRef?.current,
          }}
          parallax
          observer
          observeParents
          initialSlide={1}
          onSwiper={setSwiper}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1086: {
              slidesPerView: 4,
            },
          }}
        >
          {sponsorships.map((sponsorship, index) => (
            <SwiperSlide onClick={() => console.log(index)} key={index}>
              <div>
                <p className={sponsorshipsStyles.applied}>
                  {sponsorship.applied} applied
                </p>
                <img
                  className={featuredStyles.image}
                  src={sponsorship.img + Math.random()}
                  alt=""
                />

                <div className="mt-2 mr-2">
                  <div className={sponsorshipsStyles.typeWrapper}>
                    <p
                      style={{
                        backgroundColor:
                          sponsorship.type === "Paid" ? "#FFDE2F" : "#3FD5F5",
                      }}
                      className={sponsorshipsStyles.type}
                    >
                      {sponsorship.type} Campaign
                    </p>
                    <p className="text-sm">{sponsorship.updated}</p>
                  </div>

                  <p className={sponsorshipsStyles.title}>
                    {sponsorship.title}
                  </p>

                  <div className={sponsorshipsStyles.bottomWrapper}>
                    <p className={sponsorshipsStyles.followers}>
                      Min {sponsorship.followers} followers required
                    </p>

                    <div className={sponsorshipsStyles.icons}>
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
        <div className={sponsorshipsStyles.next} ref={nextRef}>
          <MdNavigateNext />
        </div>
      </div>
    </div>
  );
};

export default Sponsorships;
