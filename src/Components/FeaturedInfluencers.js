import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillLinkedin,
  AiFillYoutube,
} from "react-icons/ai";
import { MdNavigateNext } from "react-icons/md";
import { featuredStyles } from "../Styles/HomeStyles";

const FeaturedInfluencers = ({ featured }) => {
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
    <div className="pl-5 lg:pr-5 py-8 relative">
      <h1 className={featuredStyles.heading}>Featured Influencers</h1>
      <div className="my-5">
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
          {featured.map((item, index) => (
            <SwiperSlide onClick={() => console.log(index)} key={index}>
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
        <div className={featuredStyles.next} ref={nextRef}>
          <MdNavigateNext />
        </div>
      </div>
    </div>
  );
};

export default FeaturedInfluencers;
