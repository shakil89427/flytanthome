import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css";
import { MdNavigateNext } from "react-icons/md";
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import moment from "moment";

const styles = {
  image: "h-72 rounded-md bg-cover bg-center bg-no-repeat",
  next: "absolute bg-white top-[40%] -right-3 z-10 w-14 px-1 text-5xl shadow-xl rounded-tl-3xl rounded-bl-3xl cursor-pointer select-none",
};

const Preview = ({
  name,
  description,
  images,
  gender,
  type,
  platforms,
  followers,
  categories,
  setPreview,
}) => {
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
    <div className="w-[95%] max-w-[550px] mx-auto relative">
      <button
        onClick={() => setPreview(false)}
        className="bg-black text-white px-5 py-2 rounded-md absolute -top-12 left-0"
      >
        Back
      </button>
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: nextRef?.current,
          }}
          initialSlide={0}
          onSwiper={setSwiper}
          slidesPerView={1}
        >
          {images?.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${URL.createObjectURL(item)})` }}
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          style={{ visibility: images?.length > 1 ? "visible" : "hidden" }}
          className={styles.next}
          ref={nextRef}
        >
          <MdNavigateNext />
        </div>
      </div>

      <div className="flex flex-col gap-7 my-5">
        <p className="text-2xl font-semibold">{name}</p>
        <p>Posted: {moment().format("MMM DD YYYY")} </p>

        {type?.price && (
          <p className=" border-2 w-fit px-5 py-1 border-black rounded-md">
            $ {type?.price}
          </p>
        )}

        <p className="bg-black text-white text-center py-2 rounded-md text-lg">
          View Influencers
        </p>

        {type.barter && (
          <p className="text-gray-500">{type.barterDescription}</p>
        )}

        <div>
          <p className="text-xl font-semibold mb-2">Description</p>
          <p className="text-gray-500">{description}</p>
        </div>

        <div className="">
          <p className="text-xl font-semibold mb-2">Categories</p>
          <div className="flex items-center gap-3 flex-wrap">
            {categories.map((c) => (
              <p
                className="py-1 px-6 bg-gray-200 w-fit rounded-3xl text-sm font-medium"
                key={c}
              >
                {c}
              </p>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xl font-semibold mb-2">Preffered gender</p>
          <p className="text-gray-500">{gender}</p>
        </div>

        <div className="">
          <p className="text-xl font-semibold mb-2">Minimum followers</p>
          <p>{followers}</p>
        </div>

        <div className="">
          <p className="text-xl font-semibold mb-2">Platform required</p>
          <div className="flex items-center gap-4 text-xs">
            {platforms?.includes("Instagram") && (
              <span className="flex flex-col gap-1 items-center">
                <AiOutlineInstagram className="text-3xl" />
                <p>Instagram</p>
              </span>
            )}
            {platforms?.includes("Youtube") && (
              <span className="flex flex-col gap-1 items-center">
                <AiOutlineYoutube className="text-3xl" />
                <p>Youtube</p>
              </span>
            )}
            {platforms?.includes("Twitter") && (
              <span className="flex flex-col gap-1 items-center">
                <AiOutlineTwitter className="text-3xl" />
                <p>Twitter</p>
              </span>
            )}
            {platforms?.includes("Tiktok") && (
              <span className="flex flex-col gap-1 items-center">
                <FaTiktok className="text-3xl p-1" />
                <p>Tiktok</p>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
