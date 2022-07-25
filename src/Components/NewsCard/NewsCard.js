import React, { useEffect, useRef, useState } from "react";
import cross from "../../Assets/cross.svg";
import useStore from "../../Store/useStore";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import like from "../../Assets/news/Like.png";
import liked from "../../Assets/news/Liked.png";
import comment from "../../Assets/news/Comment.png";
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
} from "firebase/firestore";
import Comment from "./Comment";
import useAnalytics from "../../Hooks/useAnalytics";

const NewsCard = () => {
  const { showNewsCard, setShowNewsCard, allNews, setAllNews, user, setUser } =
    useStore();
  const [activeIndex, setActiveIndex] = useState(showNewsCard - 1);
  const [showComment, setShowComment] = useState(false);
  const [direction, setDirection] = useState(
    window?.innerWidth > 768 ? "horizontal" : "vertical"
  );
  const [swiper, setSwiper] = useState();
  const nextRef = useRef();
  const prevRef = useRef();
  const db = getFirestore();
  const { addLog } = useAnalytics();

  const inCrease = async (newsId) => {
    addLog("like");
    // Update to Local
    const { likeCount, ...rest } = allNews.data.find(
      (item) => item.id === newsId
    );
    const updatedNews = { ...rest, likeCount: likeCount + 1 };
    const mergedNews = allNews.data.map((item) =>
      item.id === newsId ? updatedNews : item
    );
    setAllNews((prev) => ({ ...prev, data: mergedNews }));
    setUser((prev) => ({
      ...prev,
      likedNews: prev?.likedNews ? [...prev?.likedNews, newsId] : [newsId],
    }));
    // Update to DB
    const newsRef = doc(db, "news", newsId);
    const userRef = doc(db, "users", user?.userId);
    await updateDoc(newsRef, {
      likeCount: increment(1),
    });
    await updateDoc(userRef, {
      likedNews: arrayUnion(newsId),
    });
  };
  const deCrease = async (newsId) => {
    addLog("unlike");
    // Update to Local
    const { likeCount, ...rest } = allNews.data.find(
      (item) => item.id === newsId
    );
    const updatedNews = { ...rest, likeCount: likeCount - 1 };
    const mergedNews = allNews.data.map((item) =>
      item.id === newsId ? updatedNews : item
    );
    const updatedUser = user?.likedNews?.filter((item) => item !== newsId);
    setAllNews((prev) => ({ ...prev, data: mergedNews }));
    setUser((prev) => ({ ...prev, likedNews: updatedUser }));
    // Update to DB
    const newsRef = doc(db, "news", newsId);
    const userRef = doc(db, "users", user?.userId);
    await updateDoc(newsRef, {
      likeCount: increment(-1),
    });
    await updateDoc(userRef, {
      likedNews: arrayRemove(newsId),
    });
  };

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
      <div className="fixed inset-0 top-0 left-0 bg-[#030303f6] z-30 flex items-center justify-center">
        <img
          onClick={() => {
            addLog("hide_newscard");
            setShowNewsCard(false);
          }}
          className="bg-[#ffffff86] absolute top-4 right-4 lg:top-8 lg:right-8 w-5 md:w-7 lg:w-9 rounded-full cursor-pointer hover:bg-white"
          src={cross}
          alt=""
        />
        <div
          className={`absolute top-3 left-1/2 md:left-5 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 md:translate-x-0 rotate-90 md:rotate-0 text-[#ffffff86] hover:text-white text-4xl md:text-6xl lg:text-8xl  cursor-pointer select-none ${
            activeIndex === 0 ? "invisible" : "visible"
          }`}
          ref={prevRef}
        >
          <MdNavigateBefore />
        </div>
        <div
          className={`absolute bottom-3 right-1/2 md:right-5 md:bottom-1/2 translate-x-1/2 md:translate-y-1/2 md:translate-x-0 rotate-90 md:rotate-0 text-[#ffffff86] hover:text-white text-4xl md:text-6xl lg:text-8xl cursor-pointer select-none ${
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
          className="w-[95%] max-w-[450px] h-[80vh] bg-white rounded-md overflow-hidden"
        >
          {allNews?.data?.map((item, index) => (
            <SwiperSlide key={index} className="flex flex-col justify-between">
              <div className="w-full overflow-y-scroll scrollbar">
                <div
                  style={{
                    backgroundImage: `url("${item?.blob[0]?.path}")`,
                  }}
                  className="bg-cover bg-center bg-no-repeat aspect-[7/4]"
                />

                <div className="px-5">
                  <p className="font-semibold mt-2 text-lg">{item?.title}</p>
                  <p style={{ lineHeight: "200%" }} className="mt-2 text-sm">
                    {item?.description}
                  </p>
                </div>
              </div>

              <div className="p-2">
                <div className="flex items-center justify-center gap-7 font-medium">
                  <div className="flex items-center justify-center gap-1 ">
                    <img
                      onClick={() =>
                        user?.likedNews?.includes(item?.id)
                          ? deCrease(item?.id)
                          : inCrease(item?.id)
                      }
                      src={user?.likedNews?.includes(item?.id) ? liked : like}
                      className="cursor-pointer w-8"
                      alt=""
                    />

                    <p>{item?.likeCount}</p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <img
                      onClick={() => {
                        addLog("show_comments");
                        setShowComment(item?.id);
                      }}
                      className="cursor-pointer w-8"
                      src={comment}
                      alt=""
                    />
                    <p>{item?.commentCount}</p>
                  </div>
                </div>
              </div>
              {showComment === item?.id && (
                <Comment
                  setShowComment={setShowComment}
                  newsId={item?.id}
                  setData={false}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      ;
    </>
  );
};

export default NewsCard;
