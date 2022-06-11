import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css";
import useStore from "../../../../Store/useStore";

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

const PopularAll = () => {
  const navigate = useNavigate();
  const { popularInfluencers, setPopularInfluencers } = useStore();
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const colRef = collection(db, "users");
  const divRef = useRef();

  useEffect(() => {
    divRef.current.scrollIntoView();
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
      if (response?.empty) {
        setPopularInfluencers((prev) => {
          return {
            data: [...prev.data],
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
    if (popularInfluencers?.data?.length && popularInfluencers?.lastVisible) {
      const q = query(
        colRef,
        where("shouldShowInfluencer", "==", true),
        orderBy("socialScore", "desc"),
        startAfter(popularInfluencers?.lastVisible),
        limit(20)
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
        limit(20)
      );
      getPopular(q);
    }
  }, []);
  return (
    <div ref={divRef} className="pt-5 pb-14">
      <h1 className="font-semibold text-xl md:text-2xl mb-5">
        Popular Influencers
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
        {popularInfluencers?.data?.map((item, index) => (
          <div
            onClick={() => navigate(`/profile/${item?.id}`)}
            key={index}
            className="cursor-pointer border rounded-xl overflow-hidden pb-5"
          >
            <div
              style={{
                backgroundImage: `url(https://blog.prepscholar.com/hubfs/feature_rainbow_seven_colors.png)`,
              }}
              className="bg-cover bg-center bg-no-repeat aspect-[4/2]"
            />
            <div className="px-5 flex items-center justify-between -translate-y-1/2">
              <div
                style={{
                  backgroundImage: `url(${item?.profileImageUrl})`,
                }}
                className="bg-cover bg-center bg-no-repeat w-[25%] aspect-square rounded-full border-2"
              />
              <p className="flex items-center justify-center w-[20%] aspect-square bg-white rounded-full font-semibold border">
                {item?.socialScore}
              </p>
            </div>
            <div className="px-5">
              <p className="text-lg font-semibold">
                {item?.name.length > 15
                  ? item?.name.slice(0, 15) + "..."
                  : item?.name}
              </p>
              <p className="text-gray-500">@{item?.username}</p>
              <p className="mt-5 text-sm text-gray-700">
                {item?.bio?.length > 50
                  ? item?.bio?.slice(0, 50) + "..."
                  : item?.bio}
              </p>
              <p></p>
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
