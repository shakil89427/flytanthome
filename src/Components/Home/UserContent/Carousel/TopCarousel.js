import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const TopCarousel = () => {
  const images = [
    "https://cdn.shortpixel.ai/spai/q_lossy+w_998+to_avif+ret_img/https://www.mindful.org/content/uploads/What-Happens-When-We-Reconnect-with-Nature.jpg",
    "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/24701-nature-natural-beauty.jpg/1280px-24701-nature-natural-beauty.jpg",
  ];
  return (
    <div className="w-full lg:w-[70%] lg:mx-auto">
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
              style={{
                backgroundImage: `url(${image})`,
              }}
              className="bg-cover bg-no-repeat bg-center aspect-[7/3] mb-10 rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopCarousel;
