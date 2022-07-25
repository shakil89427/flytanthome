import React, { useEffect, useRef } from "react";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";
import { useState } from "react";
import useStore from "../../../Store/useStore";
import moment from "moment";
import Spinner2 from "../../Spinner/Spinner2";
import useAnalytics from "../../../Hooks/useAnalytics";

const AllNews = () => {
  const { allNews, setAllNews, setShowNewsCard } = useStore();
  const [loading, setLoading] = useState(false);
  const divRef = useRef();
  const db = getFirestore();
  const colRef = collection(db, "news");
  const { addLog } = useAnalytics();

  const getNews = async (q) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getDocs(q);
      const data = response?.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      if (response?.empty || data?.length < 12) {
        setAllNews((prev) => {
          return {
            data: [...prev.data, ...data],
            lastVisible: false,
          };
        });
      } else {
        setAllNews((prev) => {
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
    if (allNews?.data?.length && allNews?.lastVisible) {
      const q = query(
        colRef,
        orderBy("creationDate", "desc"),
        startAfter(allNews?.lastVisible),
        limit(12)
      );
      getNews(q);
    }
  };

  useEffect(() => {
    if (!allNews?.data?.length) {
      const q = query(colRef, orderBy("creationDate", "desc"), limit(12));
      getNews(q);
    }
  }, []);

  useEffect(() => {
    divRef.current.scrollIntoView();
    window.scroll(0, 0);
  }, []);

  return (
    <div ref={divRef} className="pt-5 pb-14">
      <h1 className="font-semibold text-lg md:text-xl xl:text-2xl mb-5">
        News
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-14">
        {allNews?.data?.map((item, index) => (
          <div
            onClick={() => {
              addLog("show_newscard");
              setShowNewsCard(index + 1);
            }}
            key={item?.id}
            className="cursor-pointer rounded-tl-xl rounded-tr-xl overflow-hidden relative pb-5"
          >
            <div>
              <div
                style={{
                  backgroundImage: `url("${item?.blob[0]?.path}")`,
                }}
                className="bg-cover bg-center bg-no-repeat aspect-[5/4]"
              />
              <p className="font-semibold mt-2">
                {item?.title?.length > 40
                  ? item?.title?.slice(0, 40) + "..."
                  : item?.title}
              </p>
              <p className="absolute bottom-0 left-0 text-xs text-gray-500">
                {moment.unix(item?.creationDate).fromNow()}
              </p>
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
          allNews?.lastVisible &&
          allNews?.data?.length > 9 && (
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

export default AllNews;
