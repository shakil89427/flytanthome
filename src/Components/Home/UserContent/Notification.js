import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import useStore from "../../../Store/useStore";
import blog from "../../../Assets/blog.png";
import sponsorship from "../../../Assets/sponsorship.png";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const navigate = useNavigate();
  const divRef = useRef();
  const { user, notifications } = useStore();
  const [sorted, setSorted] = useState([]);
  const [allData, setAllData] = useState([]);

  const loadMore = () => {
    setAllData(sorted.slice(0, allData?.length + 20));
  };

  useEffect(() => {
    if (sorted?.length < 1) return;
    if (allData?.length < 1) {
      setAllData(sorted.slice(0, 20));
    } else {
      setAllData(sorted.slice(0, allData?.length));
    }
  }, [sorted]);

  useEffect(() => {
    if (notifications.length < 1 || !user?.userId) return;
    const filtered = notifications?.filter(
      (doc) => doc?.receiverId === user?.userId || doc?.receiverId === ""
    );
    const sortedData = filtered?.sort(
      (a, b) => b?.creationDate - a?.creationDate
    );
    setSorted(sortedData);
  }, [notifications, user]);

  useEffect(() => {
    divRef.current.scrollIntoView();
    window.scroll(0, 0);
  }, []);

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
  };

  return (
    <div ref={divRef} className="pt-5 pb-14">
      <p className="font-semibold text-xl md:text-2xl mb-8">Notifications</p>
      {allData?.map((item) => (
        <div
          key={item?.id}
          className="flex items-start justify-between mb-6 border-b pb-6 border-gray-100 cursor-pointer"
          onClick={() =>
            changeRoute(
              item?.campId
                ? { campId: item?.campId }
                : item?.blogUrl
                ? { blogUrl: item?.blogUrl }
                : item?.senderId
                ? { sender: item?.senderId }
                : false
            )
          }
        >
          <div className="flex items-start justify-center gap-2 lg:gap-5">
            {/* Left */}
            {item?.senderProfileImageUrl && (
              <div>
                <div
                  style={{
                    backgroundImage: `url(${item?.senderProfileImageUrl})`,
                  }}
                  className="bg-cover bg-center bg-no-repeat w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full "
                />
              </div>
            )}
            {item?.blogUrl && (
              <div>
                <div
                  style={{
                    backgroundImage: `url(${blog})`,
                  }}
                  className="bg-cover bg-center bg-no-repeat w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full "
                />
              </div>
            )}
            {item?.campId && (
              <div>
                <div
                  style={{
                    backgroundImage: `url(${sponsorship})`,
                  }}
                  className="bg-cover bg-center bg-no-repeat w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full "
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
            <div className="rounded-md border ml-2">
              <img
                className="aspect-[4/2] w-24 md:w-28"
                src={item?.postImageUrl}
                alt=""
              />
            </div>
          )}
        </div>
      ))}
      {sorted?.length !== allData?.length && (
        <button
          onClick={loadMore}
          className="block bg-black text-white px-5 py-2 rounded-lg mx-auto font-medium"
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default Notification;
