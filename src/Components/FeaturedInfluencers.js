import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillLinkedin,
  AiFillYoutube,
} from "react-icons/ai";
import { featuredStyles } from "../Styles/HomeStyles";

const FeaturedInfluencers = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const arr2 = ["Fashion", "Makeup", "Beauty"];

  return (
    <div className="px-5 py-8">
      <h1 className={featuredStyles.heading}>Featured Influencers</h1>
      <div className="my-5">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="mySwiper"
        >
          {arr.map((item) => (
            <SwiperSlide key={item}>
              <img
                className={featuredStyles.image}
                src="https://picsum.photos/200"
                alt=""
              />
              <div className="px-4 mt-2">
                <div className={featuredStyles.nameWrapper}>
                  <p className={featuredStyles.name}>Andrew dale</p>
                  <p className="text-sm">M 21, Delhi</p>
                </div>
                <div className={featuredStyles.icons}>
                  <AiFillInstagram />
                  <AiFillFacebook />
                  <AiFillLinkedin />
                  <AiFillYoutube />
                </div>
                <div className={featuredStyles.options}>
                  {arr2.map((item) => (
                    <p key={item} className={featuredStyles.option}>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedInfluencers;
