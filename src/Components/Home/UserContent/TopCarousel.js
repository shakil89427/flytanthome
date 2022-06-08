import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const TopCarousel = () => {
  const images = [
    `https://picsum.photos/200/300?random=${Math.random()}`,
    `https://picsum.photos/200/300?random=${Math.random()}`,
    `https://picsum.photos/200/300?random=${Math.random()}`,
  ];
  return (
    <div>
      <Swiper
        spaceBetween={5}
        speed={500}
        autoplay={{ delay: 5000 }}
        pagination={true}
        modules={[Pagination, Autoplay]}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <div
              style={{ backgroundImage: `url(${image})` }}
              className="bg-cover bg-no-repeat bg-center aspect-[4/2] mb-10 rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopCarousel;
