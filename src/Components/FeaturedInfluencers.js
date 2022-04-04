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

const FeaturedInfluencers = ({ featured }) => {
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
          {featured.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                className={featuredStyles.image}
                src={item.img + Math.random()}
                alt=""
              />
              <div className="px-4 mt-2">
                <div className={featuredStyles.nameWrapper}>
                  <p className={featuredStyles.name}>{item.name}</p>
                  <p className="text-sm">{item.location}</p>
                </div>
                <div className={featuredStyles.icons}>
                  <AiFillInstagram />
                  <AiFillFacebook />
                  <AiFillLinkedin />
                  <AiFillYoutube />
                </div>
                <div className={featuredStyles.options}>
                  {item.options.map((option, index2) => (
                    <p key={index2} className={featuredStyles.option}>
                      {option}
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
