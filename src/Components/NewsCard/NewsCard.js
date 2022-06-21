import React, { useEffect, useRef, useState } from "react";
import cross from "../../Assets/cross.svg";
import useStore from "../../Store/useStore";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { AiFillHeart, AiFillMessage } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper";
import "swiper/css";
import {
  getFirestore,
  doc,
  increment,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { IoIosArrowRoundBack } from "react-icons/io";

const NewsCard = () => {
  const { showNewsCard, setShowNewsCard, allNews, setAllNews, user, setUser } =
    useStore();
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(showNewsCard - 1);
  const [showComment, setShowComment] = useState(false);
  const [direction, setDirection] = useState(
    window?.innerWidth > 768 ? "horizontal" : "vertical"
  );
  const [swiper, setSwiper] = useState();
  const nextRef = useRef();
  const prevRef = useRef();
  const db = getFirestore();

  const changeLike = async (newsId) => {
    if (loading) return;
    setLoading(true);
    try {
      const newsRef = doc(db, "news", newsId);
      const userRef = doc(db, "users", user?.userId);
      const status = user?.likedNews?.includes(newsId) ? true : false;
      await updateDoc(newsRef, {
        likeCount: increment(status ? -1 : 1),
      });
      await updateDoc(userRef, {
        likedNews: status ? arrayRemove(newsId) : arrayUnion(newsId),
      });
      const newsUpdatedData = await getDoc(newsRef);
      const newsFinalData = {
        ...newsUpdatedData.data(),
        id: newsUpdatedData.id,
      };
      const newsMerged = allNews?.data?.map((item) =>
        item?.id === newsId ? newsFinalData : item
      );
      const userUpdatedData = await getDoc(userRef);
      const userFinalData = {
        ...userUpdatedData.data(),
        id: userUpdatedData.id,
      };
      setAllNews({ ...allNews, data: newsMerged });
      setUser(userFinalData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(allNews.data);
  }, [allNews]);

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
          onSlideChange={(val) => {
            setShowComment(false);
            setActiveIndex(val?.realIndex);
          }}
          initialSlide={activeIndex}
          onSwiper={setSwiper}
          slidesPerView={1}
          className="w-[95%] max-w-[400px] h-[700px] bg-white rounded-md overflow-hidden"
        >
          {allNews?.data?.map((item) => (
            <SwiperSlide
              key={item?.id}
              className="h-full relative overflow-hidden"
            >
              <div
                style={{
                  backgroundImage: `url(${item?.blob[0]?.path})`,
                }}
                className="bg-cover bg-center bg-no-repeat aspect-[5/4]"
              />
              <div className="px-5">
                <p className="font-semibold mt-2 text-lg">{item?.title}</p>
                <p className="mt-2 max-h-[200px] overflow-y-scroll scrollbar text-sm">
                  {item?.description}
                </p>
              </div>
              <div className="absolute bottom-5 left-0 w-full flex items-center justify-center z-10">
                <div className="flex items-center gap-7 font-medium">
                  <div className="flex items-center justify-center gap-1 ">
                    <AiFillHeart
                      onClick={() => changeLike(item?.id)}
                      className={`text-3xl cursor-pointer ${
                        user?.likedNews?.includes(item?.id)
                          ? "text-black"
                          : "text-gray-400"
                      }`}
                    />
                    <p>{item?.likeCount}</p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <AiFillMessage
                      onClick={() => setShowComment(true)}
                      className="text-3xl cursor-pointer"
                    />
                    <p>{item?.commentCount}</p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  transform: `translateY(${showComment ? 0 : "100%"})`,
                }}
                className="absolute inset-0 top-0 left-0 z-20 bg-white duration-150"
              >
                <div className="border-b pl-2">
                  <IoIosArrowRoundBack
                    onClick={() => setShowComment(false)}
                    className="text-3xl cursor-pointer"
                  />
                </div>
                <div className="p-2 w-full h-full text-center">
                  <p>Here will show comment for</p>
                  <p>NewsId : {item?.id}</p>
                </div>
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
