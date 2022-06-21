import React, { useEffect, useRef, useState } from "react";
import cross from "../../Assets/cross.svg";
import useStore from "../../Store/useStore";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper";
import "swiper/css";

const NewsCard = () => {
  const { showNewsCard, setShowNewsCard, allNews } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(
    window?.innerWidth > 768 ? "horizontal" : "vertical"
  );
  const [data, setData] = useState([]);
  const [swiper, setSwiper] = useState();
  const nextRef = useRef();
  const prevRef = useRef();

  useEffect(() => {
    const filtered = allNews?.data?.filter(
      (item) => item?.id !== showNewsCard?.id
    );
    setData([showNewsCard, ...filtered]);
  }, [allNews, showNewsCard]);

  useEffect(() => {
    if (swiper) {
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  const checkScreen = () => {
    if (window.innerWidth > 768) {
      setDirection("horizontal");
    } else {
      setDirection("vertical");
    }
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    window.addEventListener("resize", checkScreen);
    return () => {
      document.body.style.overflowY = "auto";
      window.removeEventListener("resize", checkScreen);
    };
  }, []);
  console.log(data);

  return (
    <>
      <div className="fixed inset-0 top-0 left-0 bg-[#030303ea] z-30 flex items-center justify-center">
        <img
          onClick={() => setShowNewsCard(false)}
          className="bg-[#ffffff86] absolute top-10 right-10 w-5 md:w-7 lg:w-9 rounded-full cursor-pointer hover:bg-white"
          src={cross}
          alt=""
        />
        <div
          className={`absolute top-7 left-1/2 md:left-5 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 md:translate-x-0 rotate-90 md:rotate-0 text-[#ffffff86] hover:text-white text-4xl md:text-6xl lg:text-8xl  cursor-pointer select-none ${
            activeIndex === 0 ? "invisible" : "visible"
          }`}
          ref={prevRef}
        >
          <MdNavigateBefore />
        </div>
        <div
          className={`absolute bottom-7 right-1/2 md:right-5 md:bottom-1/2 translate-x-1/2 md:translate-y-1/2 md:translate-x-0 rotate-90 md:rotate-0 text-[#ffffff86] hover:text-white text-4xl md:text-6xl lg:text-8xl cursor-pointer select-none ${
            activeIndex + 1 === allNews?.data?.length ? "invisible" : "visible"
          }`}
          ref={nextRef}
        >
          <MdNavigateNext />
        </div>
        <Swiper
          direction={direction}
          modules={[Navigation, Keyboard]}
          keyboard={{ enabled: true }}
          navigation={{
            nextEl: nextRef?.current,
          }}
          onSlideChange={(val) => setActiveIndex(val?.realIndex)}
          initialSlide={activeIndex}
          onSwiper={setSwiper}
          slidesPerView={1}
          className="w-[95%] max-w-[450px] h-[80vh] bg-white rounded-md overflow-hidden"
        >
          {data.map((item) => (
            <SwiperSlide key={item?.id} className="h-full">
              <div
                style={{
                  backgroundImage: `url(${item?.blob[0]?.path})`,
                }}
                className="bg-cover bg-center bg-no-repeat aspect-[5/4]"
              />
              <div className="px-5">
                <p className="font-semibold mt-2 text-lg">{item?.title}</p>
                <p className="mt-2">{item?.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      ;
    </>
  );
};

export default NewsCard;
