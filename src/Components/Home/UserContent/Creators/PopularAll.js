import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css";
import useStore from "../../../../Store/useStore";
import Back from "../../../../Assets/userHome/drawerItems/back.png";

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
import Spinner2 from "../../../Spinner/Spinner2";
import useAnalytics from "../../../../Hooks/useAnalytics";

const PopularAll = () => {
  const navigate = useNavigate();
  const { popularInfluencers, setPopularInfluencers } = useStore();
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const colRef = collection(db, "users");
  const divRef = useRef();
  const { addLog } = useAnalytics();

  useEffect(() => {
    divRef.current.scrollIntoView();
    window.scroll(0, 0);
  }, []);

  const getPopular = async (q) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getDocs(q);
      const data = [];
      response?.docs.forEach((item) => {
        const val = { ...item?.data(), id: item?.id };
        if (
          val?.profileImageUrl &&
          !val?.profileImageUrl?.toLowerCase().includes("default") &&
          val?.profileImageUrl !== ""
        ) {
          data.push(val);
        }
      });
      if (response?.empty || data?.length < 12) {
        setPopularInfluencers((prev) => {
          return {
            data: [...prev.data, ...data],
            lastVisible: false,
          };
        });
      } else {
        setPopularInfluencers((prev) => {
          return {
            data: [...prev.data, ...data],
            lastVisible: response?.docs[response?.docs?.length - 1],
          };
        });
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const loadMore = () => {
    addLog("load_more");
    if (popularInfluencers?.data?.length && popularInfluencers?.lastVisible) {
      const q = query(
        colRef,
        where("shouldShowInfluencer", "==", true),
        orderBy("socialScore", "desc"),
        startAfter(popularInfluencers?.lastVisible),
        limit(12)
      );
      getPopular(q);
    }
  };

  useEffect(() => {
    if (!popularInfluencers?.data?.length) {
      const q = query(
        colRef,
        where("shouldShowInfluencer", "==", true),
        orderBy("socialScore", "desc"),
        limit(12)
      );
      getPopular(q);
    }
  }, []);
  return (
    <div ref={divRef} className="pt-5 pb-14">
      <div className="font-semibold text-lg md:text-xl xl:text-2xl mb-5 w-fit flex items-center gap-2">
        <img
          onClick={() => {
            addLog("back_previous_route");
            navigate(-1);
          }}
          src={Back}
          alt=""
          className="w-6 lg:w-7 xl:w-8 cursor-pointer"
        />
        <p>Popular Influencers</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
        {popularInfluencers?.data?.map((item, index) => (
          <div
            onClick={() => {
              addLog("influencer_profile");
              navigate(`/profile/${item?.id}`);
            }}
            key={index}
            className="cursor-pointer border rounded-xl overflow-hidden"
          >
            <div>
              <div
                style={{
                  backgroundImage: `url(${item?.profileImageUrl})`,
                }}
                className="bg-cover bg-center bg-no-repeat aspect-[5/4]"
              />
              <div className="pr-5 flex items-center justify-end -translate-y-1/2">
                <p className="flex items-center justify-center w-[20%] aspect-square bg-white rounded-full font-semibold border">
                  {item?.socialScore}
                </p>
              </div>
              <div className="px-5 -translate-y-1/2">
                <p className="text-lg font-semibold">
                  {item?.name.length > 15
                    ? item?.name.slice(0, 15) + "..."
                    : item?.name}
                </p>
                <p className="text-gray-500">@{item?.username}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex items-center justify-center">
        {loading ? (
          <div className="py-3">
            <Spinner2 />
          </div>
        ) : (
          popularInfluencers?.lastVisible && (
            <button
              onClick={loadMore}
              className="bg-black text-white px-7 font-medium hover:scale-105 duration-150 py-3 rounded-full"
            >
              Load More
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default PopularAll;
