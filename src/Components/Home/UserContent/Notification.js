import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import useStore from "../../../Store/useStore";
import Spinner2 from "../../Spinner/Spinner2";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import blog from "../../../Assets/blog.png";
import sponsorship from "../../../Assets/sponsorship.png";
import { useNavigate } from "react-router-dom";
import defaultUser from "../../../Assets/defaultUser.png";
import News from "../../../Assets/News.png";
import useAnalytics from "../../../Hooks/useAnalytics";

const Notification = () => {
  const navigate = useNavigate();
  const divRef = useRef();
  const { user, notifications, setNotifications, setShowSingleCard } =
    useStore();
  const [loading, setLoading] = useState(false);
  const { addLog } = useAnalytics();
  const db = getFirestore();

  const changeRoute = (info) => {
    if (!info) return;
    if (info?.campId) {
      navigate(`/sponsorshipdetails/${info?.campId}`);
    }
    if (info?.sender) {
      navigate(`/profile/${info?.sender}`);
    }
    if (info?.blogUrl) {
      const last = info?.blogUrl.split("https://flytant.com/blogdetails/")[1];
      navigate(`/blogdetails/${last}`);
    }
    if (info?.newsId) {
      setShowSingleCard(info?.newsId);
    }
  };

  const getNotifications = async (q) => {
    setLoading(true);
    try {
      const response = await getDocs(q);
      const data = response?.docs?.map((item) => {
        return { ...item.data(), id: item.id };
      });
      if (response?.empty || data?.length < 20) {
        setNotifications((prev) => {
          return {
            data: [...prev.data, ...data],
            lastVisible: false,
          };
        });
      } else {
        setNotifications((prev) => {
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
    if (notifications?.data?.length && notifications?.lastVisible) {
      const colRef = collection(db, "notifications");
      const q = query(
        colRef,
        where("receiverId", "in", [user?.userId, ""]),
        orderBy("creationDate", "desc"),
        startAfter(notifications?.lastVisible),
        limit(20)
      );
      getNotifications(q);
    }
  };

  useEffect(() => {
    if (notifications?.data?.length < 1) {
      const colRef = collection(db, "notifications");
      const q = query(
        colRef,
        where("receiverId", "in", [user?.userId, ""]),
        orderBy("creationDate", "desc"),
        limit(20)
      );
      getNotifications(q);
    }
    divRef.current.scrollIntoView();
    window.scroll(0, 0);
  }, []);

  return (
    <div ref={divRef} className="pt-5 pb-14">
      <p className="font-semibold text-xl md:text-2xl mb-8">Notifications</p>
      {notifications?.data?.map((item) => (
        <div
          key={item?.id}
          className="flex items-start justify-between mb-6 border-b pb-6 border-gray-100 cursor-pointer"
          onClick={() => {
            addLog("notification");
            changeRoute(
              item?.campId
                ? { campId: item?.campId }
                : item?.blogUrl
                ? { blogUrl: item?.blogUrl }
                : item?.senderId
                ? { sender: item?.senderId }
                : item?.newsId
                ? { newsId: item?.newsId }
                : false
            );
          }}
        >
          <div className="flex items-start justify-center gap-2 lg:gap-5">
            {/* Left */}
            {item?.senderProfileImageUrl && item?.type !== 11 && (
              <div>
                <div
                  style={{
                    backgroundImage: `url(${
                      item?.senderProfileImageUrl?.includes("default")
                        ? defaultUser
                        : item?.senderProfileImageUrl
                    })`,
                  }}
                  className="bg-cover bg-center bg-no-repeat w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full "
                />
              </div>
            )}
            {item?.senderProfileImageUrl && item?.type === 11 && (
              <div>
                <div
                  style={{
                    backgroundImage: `url(${News})`,
                  }}
                  className="bg-cover bg-center bg-no-repeat w-[30px] h-[30px] md:w-[40px] md:h-[40px] "
                />
              </div>
            )}
            {item?.blogUrl && (
              <div>
                <div
                  style={{
                    backgroundImage: `url(${blog})`,
                  }}
                  className="bg-cover bg-center bg-no-repeat w-[30px] h-[30px] md:w-[40px] md:h-[40px] "
                />
              </div>
            )}
            {item?.campId && (
              <div>
                <div
                  style={{
                    backgroundImage: `url(${sponsorship})`,
                  }}
                  className="bg-cover bg-center bg-no-repeat w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
                />
              </div>
            )}

            {/* Center */}
            <div>
              <p className="font-medium text-sm md:text-md lg:text-lg">
                {item?.senderUsername || item?.title}
              </p>
              {item?.body && <p className="text-xs md:text-sm">{item?.body}</p>}
              <p className="text-xs text-gray-500 mt-2">
                {moment.unix(item?.creationDate).fromNow()}
              </p>
            </div>
          </div>

          {/* Right */}
          {item?.postImageUrl && (
            <div>
              <div
                style={{
                  backgroundImage: `url("${item?.postImageUrl}")`,
                }}
                className="bg-cover bg-center bg-no-repeat aspect-[4/2] w-24 md:w-28 rounded-md border ml-2"
              />
            </div>
          )}
        </div>
      ))}
      <div className="mt-10 flex items-center justify-center">
        {loading ? (
          <div className="py-3">
            <Spinner2 />
          </div>
        ) : (
          notifications?.lastVisible &&
          notifications?.data?.length > 19 && (
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

export default Notification;
