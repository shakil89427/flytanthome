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

const PopularInfluencers = ({ popular }) => {
  const navigate = useNavigate();
  const [influencers, setInfluencers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const colRef = collection(db, "users");

  const [swiper, setSwiper] = useState();
  const nextRef = useRef();

  const getPopular = async (q) => {
    if (activeIndex === "Last" || loading) return;
    setLoading(true);
    try {
      const response = await getDocs(q);
      const data = response?.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      if (!data?.length) {
        setLoading(false);
        return setActiveIndex("Last");
      }
      setLastVisible(response.docs[response.docs.length - 1]);
      setInfluencers((prev) => [...prev, ...data]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!influencers?.length) return;
    const q = query(
      colRef,
      where("shouldShowInfluencer", "==", true),
      orderBy("socialScore", "desc"),
      startAfter(lastVisible),
      limit(20)
    );
    if (activeIndex >= influencers?.length) {
      getPopular(q);
    }
  }, [activeIndex]);

  useEffect(() => {
    const q = query(
      colRef,
      where("shouldShowInfluencer", "==", true),
      orderBy("socialScore", "desc"),
      limit(20)
    );
    getPopular(q);
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
      <h1 className={styles.heading}>Popular Influencers</h1>
      <div className="my-5">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: nextRef?.current,
          }}
          onSlideChange={(val) => setActiveIndex(val?.realIndex + 6)}
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
          {influencers.map((item, index) => (
            <SwiperSlide
              onClick={() => navigate(`/influencer/${item?.id}`)}
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

export default PopularInfluencers;
