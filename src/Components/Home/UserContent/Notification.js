import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import useStore from "../../../Store/useStore";
import blog from "../../../Assets/blog.png";
import sponsorship from "../../../Assets/sponsorship.png";

const Notification = () => {
  const divRef = useRef();
  const { user, notifications } = useStore();
  const [sorted, setSorted] = useState([]);
  const [allData, setAllData] = useState([]);

  const loadMore = () => {
    setAllData(sorted.slice(0, allData?.length + 20));
  };

  useEffect(() => {
    setAllData(sorted.slice(0, allData?.length + 20));
  }, [sorted]);

  useEffect(() => {
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
  }, []);

  return (
    <div ref={divRef} className="pt-5 pb-14">
      <p className="font-semibold text-xl md:text-2xl mb-8">Notifications</p>
      {allData?.map((item) => (
        <div
          key={item?.id}
          className="flex items-start justify-between mb-6 border-b pb-6 border-gray-100"
        >
          <div className="flex items-start justify-center gap-5">
            {/* Left */}
            {item?.senderProfileImageUrl && (
              <div
                style={{
                  backgroundImage: `url(${item?.senderProfileImageUrl})`,
                }}
                className="bg-cover bg-center bg-no-repeat w-[40px] h-[40px] rounded-full "
              />
            )}
            {item?.blogUrl && (
              <div
                style={{
                  backgroundImage: `url(${blog})`,
                }}
                className="bg-cover bg-center bg-no-repeat w-[40px] h-[40px] rounded-full"
              />
            )}
            {item?.campId && (
              <div
                style={{
                  backgroundImage: `url(${sponsorship})`,
                }}
                className="bg-cover bg-center bg-no-repeat w-[40px] h-[40px] rounded-full"
              />
            )}

            {/* Center */}
            <div>
              <p className="font-semibold">
                {item?.senderUsername || item?.title}
              </p>
              {item?.body && <p className="text-sm">{item?.body}</p>}
              <p className="text-xs text-gray-500 mt-2">
                {moment.unix(item?.creationDate).fromNow()}
              </p>
            </div>
          </div>

          {/* Right */}
          {item?.postImageUrl && (
            <div
              style={{
                backgroundImage: `url(${item?.postImageUrl})`,
              }}
              className="bg-cover bg-center bg-no-repeat w-28 h-14 rounded-md border "
            />
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
