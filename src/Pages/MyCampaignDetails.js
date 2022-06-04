import React, { useEffect, useRef, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
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
import millify from "millify";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../Store/useStore";
import Spinner from "../Components/Spinner/Spinner";

const styles = {
  image: "w-full h-full rounded-md bg-cover bg-center bg-no-repeat",
  next: "absolute bg-white top-[40%] -right-3 z-10 w-14 px-1 text-5xl shadow-xl rounded-tl-3xl rounded-bl-3xl cursor-pointer select-none",
};

const MyCampaignDetails = () => {
  const { user, myCampaigns } = useStore();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const navigate = useNavigate();
  const [swiper, setSwiper] = useState();
  const nextRef = useRef();

  useEffect(() => {
    if (!user?.userId) return;
    if (!id) return navigate("/mycampaigns", { replace: true });
    window.scroll(0, 0);
    const founded = myCampaigns?.find(
      (i) => i?.userId === user?.userId && i?.campaignId === id
    );
    if (founded?.campaignId) {
      setData(founded);
      return setLoading(false);
    }
    const colRef = collection(db, "sponsorship");
    const q = query(
      colRef,
      where("userId", "==", user?.userId),
      where("campaignId", "==", id)
    );
    getDocs(q)
      .then((res) => {
        const valid = res.docs[0];
        const allData = { ...valid.data(), id: valid.id };
        if (allData.campaignId) {
          setData(allData);
          setLoading(false);
        } else {
          setLoading(false);
          navigate("/mycampaigns", { replace: true });
        }
      })
      .catch((err) => {
        setLoading(false);
        navigate("/mycampaigns", { replace: true });
      });
  }, [user, id]);

  useEffect(() => {
    if (swiper) {
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  return (
    <>
      {loading && <Spinner />}
      {data?.name && !loading && (
        <div className="w-[95%] max-w-[550px] mx-auto my-24 px-5">
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
              {data?.blob?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-[12/7]">
                    <div
                      className={styles.image}
                      style={{
                        backgroundImage: `url(${item?.path})`,
                      }}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div
              style={{
                visibility: data?.blob?.length > 1 ? "visible" : "hidden",
              }}
              className={styles.next}
              ref={nextRef}
            >
              <MdNavigateNext />
            </div>
          </div>

          <div className="flex flex-col gap-7 my-5">
            <p className="text-2xl font-semibold">{data?.name}</p>
            <p>
              Posted: {moment.unix(data?.creationDate).format("MMM DD YYYY")}{" "}
            </p>

            {data?.price && (
              <p className=" border-2 font-semibold w-fit px-5 py-1 border-black rounded-md">
                $ {data?.price}
              </p>
            )}

            <p
              onClick={() => navigate(`/mycampaigns/details/influencers/${id}`)}
              className="border-2 border-black font-semibold cursor-pointer text-center py-2 rounded-md text-lg hover:bg-black hover:text-white duration-150"
            >
              View Influencers
            </p>

            {data?.barter && (
              <p className="text-gray-500">{data?.barterDescription}</p>
            )}

            <div>
              <p className="text-xl font-semibold mb-2">Description</p>
              <p className="text-gray-500">{data?.description}</p>
            </div>

            <div className="">
              <p className="text-xl font-semibold mb-2">Categories</p>
              <div className="flex items-center gap-3 flex-wrap">
                {data?.categories.map((c) => (
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
              <p className="text-gray-500">{data?.gender}</p>
            </div>

            <div className="">
              <p className="text-xl font-semibold mb-2">Minimum followers</p>
              <p>{millify(data?.minFollowers)}</p>
            </div>

            <div className="">
              <p className="text-xl font-semibold mb-2">Platform required</p>
              <div className="flex items-center gap-4 text-xs">
                {data?.platforms?.includes("Instagram") && (
                  <span className="flex flex-col gap-1 items-center">
                    <AiOutlineInstagram className="text-3xl" />
                    <p>Instagram</p>
                  </span>
                )}
                {data?.platforms?.includes("Youtube") && (
                  <span className="flex flex-col gap-1 items-center">
                    <AiOutlineYoutube className="text-3xl" />
                    <p>Youtube</p>
                  </span>
                )}
                {data?.platforms?.includes("Twitter") && (
                  <span className="flex flex-col gap-1 items-center">
                    <AiOutlineTwitter className="text-3xl" />
                    <p>Twitter</p>
                  </span>
                )}
                {data?.platforms?.includes("Tiktok") && (
                  <span className="flex flex-col gap-1 items-center">
                    <FaTiktok className="text-3xl p-1" />
                    <p>Tiktok</p>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyCampaignDetails;
