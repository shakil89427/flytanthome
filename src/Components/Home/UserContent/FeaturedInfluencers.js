import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css";
import useStore from "../../../Store/useStore";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillLinkedin,
  AiFillYoutube,
} from "react-icons/ai";
import { MdNavigateNext } from "react-icons/md";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

/* Styles Start */
const styles = {
  heading: "font-semibold text-xl md:text-3xl",
  image: "h-72 rounded-md bg-cover bg-center bg-no-repeat",
  nameWrapper: "flex items-center justify-between",
  name: "text-lg md:text-xl text-black font-semibold",
  icons: "flex gap-2 text-[#B4B4B4] my-1 text-xl",
  options: "flex gap-2 flex-wrap mt-3",
  option: "bg-[#DDDDDD] text-xs px-3 py-1 rounded-xl",
  next: "absolute bg-white top-[40%] right-0 z-10 w-14 px-1 text-5xl shadow-xl rounded-tl-3xl rounded-bl-3xl cursor-pointer",
};
/* Styles End */

const FeaturedInfluencers = () => {
  const navigate = useNavigate();
  const {
    featuredInfluencers,
    setFeaturedInfluencers,
    featuredIndex,
    setFeaturedIndex,
  } = useStore();
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const colRef = collection(db, "users");

  const [swiper, setSwiper] = useState();
  const nextRef = useRef();

  const getFeatured = async (q) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getDocs(q);
      const data = response?.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      if (!data?.length) return setLoading(false);
      setFeaturedInfluencers((prev) => {
        return {
          data: [...prev.data, ...data],
          lastVisible: response?.docs[response?.docs?.length - 1],
        };
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (featuredInfluencers?.data?.length) {
      const q = query(
        colRef,
        where("shouldShowTrending", "==", true),
        orderBy("socialScore", "desc"),
        startAfter(featuredInfluencers?.lastVisible),
        limit(20)
      );
      if (featuredIndex + 6 >= featuredInfluencers?.data?.length) {
        getFeatured(q);
      }
    }
  }, [featuredIndex]);

  useEffect(() => {
    if (!featuredInfluencers?.data?.length) {
      const q = query(
        colRef,
        where("shouldShowTrending", "==", true),
        orderBy("socialScore", "desc"),
        limit(20)
      );
      getFeatured(q);
    }
  }, []);

  useEffect(() => {
    if (swiper) {
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);
  return (
    <div className="r-box py-12 mt-5 relative">
      <h1 className={styles.heading}>Featured Influencers</h1>
      <div className="my-5">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: nextRef?.current,
          }}
          onSlideChange={(val) => setFeaturedIndex(val?.realIndex)}
          initialSlide={featuredIndex}
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
          {featuredInfluencers?.data?.map((item, index) => (
            <SwiperSlide
              onClick={() => navigate(`/profile/${item?.id}`)}
              key={index}
              className="cursor-pointer"
            >
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${item?.profileImageUrl})` }}
                alt=""
              />
              <div className="pr-4 mt-2">
                <div className={styles.nameWrapper}>
                  <p className={styles.name}>{item?.name}</p>
                  <p className="text-sm">
                    {item?.gender?.charAt(0)}{" "}
                    {new Date().getFullYear() -
                      item?.dateOfBirth?.slice(
                        item?.dateOfBirth?.length - 4,
                        item?.dateOfBirth?.length
                      )}
                    , {item?.countryCode.toUpperCase()}
                  </p>
                </div>
                <div className={styles.icons}>
                  {item?.linkedAccounts?.Instagram && <AiFillInstagram />}
                  {item?.linkedAccounts?.Facebook && <AiFillFacebook />}
                  {item?.linkedAccounts?.Linkedin && <AiFillLinkedin />}
                  {item?.linkedAccounts?.Youtube && <AiFillYoutube />}
                </div>
                <div className={styles.options}>
                  {item?.categories?.map((option, index2) => (
                    <p key={index2} className={styles.option}>
                      {option}
                    </p>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.next} ref={nextRef}>
          <MdNavigateNext />
        </div>
      </div>
    </div>
  );
};

export default FeaturedInfluencers;
