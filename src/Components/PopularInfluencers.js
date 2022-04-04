import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { PopularStyles } from "../Styles/HomeStyles";

const PopularInfluencers = () => {
  const arr = new Array(10).fill(Math.random());

  return (
    <div className="mb-10">
      <h1 className={PopularStyles.heading}>Popular Influencers</h1>
      <Swiper
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
        {arr.map((item, index) => (
          <SwiperSlide key={index} onClick={() => console.log(index)}>
            <div className="relative">
              <img
                className={PopularStyles.img}
                src={`https://picsum.photos/200/300?random=${Math.random()}`}
                alt=""
              />
              <p className={PopularStyles.tag}>Food</p>
              <div className={PopularStyles.profileWrapper}>
                <img
                  className={PopularStyles.profileImg}
                  src={`https://picsum.photos/200/300?random=${Math.random()}`}
                  alt=""
                />
                <p className="font-light text-sm">
                  by <span className="font-bold italic">Amya Shetty</span>
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
