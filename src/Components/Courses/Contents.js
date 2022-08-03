import React, { useEffect, useRef } from "react";
import { useState } from "react";
import useStore from "../../Store/useStore";
import moment from "moment";
import lock from "../../Assets/lock.png";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Buy from "./Buy";
import Player from "./Player";
import useAnalytics from "../../Hooks/useAnalytics";

const Contents = () => {
  const {
    user,
    course,
    setCourse,
    setShowLogin,
    selectedSection,
    setSelectedScetion,
    selectedVideo,
    setSelectedVideo,
    mixpanelLog,
  } = useStore();
  const [showBuy, setShowBuy] = useState(false);
  const divRef = useRef();
  const navigate = useNavigate();
  const { addLog } = useAnalytics();

  useEffect(() => {
    if (course?.title) {
      let priceData = {};
      if (user?.countryCode === "IN") {
        priceData.priceNow = course?.inPrice;
        priceData.pricePrev = course?.inStrikePrice;
        priceData.currency = "INR";
        priceData.symbol = "₹";
      } else {
        priceData.priceNow = course?.usPrice;
        priceData.pricePrev = course?.usStrikePrice;
        priceData.currency = "USD";
        priceData.symbol = "$";
      }
      setCourse({ ...course, priceData });
      mixpanelLog("visited_course_details");
    } else {
      navigate("/courses");
    }
  }, []);

  useEffect(() => {
    divRef.current.scrollIntoView();
    window.scroll(0, 0);
  }, [selectedVideo]);

  return (
    <div ref={divRef} className="pt-5 pb-14">
      {showBuy && <Buy course={course} setShowBuy={setShowBuy} />}
      <div className="flex items-start gap-5">
        <div>
          <div
            style={{
              backgroundImage: `url(${course?.createdBy?.userProfileImageUrl})`,
            }}
            className="bg-cover bg-center bg-no-repeat rounded-full w-[35px] h-[35px]"
          />
        </div>
        <p className="text-lg lg:text-xl xl:text-2xl font-semibold">
          {course?.title}
        </p>
      </div>
      {selectedVideo?.locked &&
      (!user?.userId || !course?.courseBuyers?.includes(user?.userId)) ? (
        <div
          style={{
            backgroundImage: `url(${
              selectedVideo?.thumbnail || "https://vumbnail.com/718275739.jpg"
            })`,
          }}
          className="aspect-[4/2] bg-cover bg-center bg-no-repeat rounded-lg flex items-center justify-center mt-10 overflow-hidden relative"
        >
          <div className="bg-[#42424275] absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-white text-center lg:text-lg">
              For Your plan only preview is available
            </p>
            <button
              onClick={() => {
                !user?.userId ? setShowLogin(true) : setShowBuy(true);
                addLog("unlock_course");
                mixpanelLog("clicked_unlock_course");
              }}
              className="block mx-auto bg-white px-7 py-3 mt-2 rounded-md font-medium"
            >
              Unlock Course
            </button>
          </div>
        </div>
      ) : (
        <Player />
      )}

      {(!user?.userId || !course?.courseBuyers?.includes(user?.userId)) && (
        <button
          onClick={() => {
            !user?.userId ? setShowLogin(true) : setShowBuy(true);
            addLog("unlock_full_course");
            mixpanelLog("clicked_unlock_full_course");
          }}
          className="mt-7 bg-black text-white py-4 font-medium px-8 block mx-auto rounded-md"
        >
          Unlock full Course
        </button>
      )}

      <p className="text-lg lg:text-xl xl:text-2xl mt-10">
        <span className="font-semibold">Course</span> Details
      </p>
      {course?.sectionName?.map((item, index) => (
        <div
          key={index}
          className={`rounded-lg relative ${
            selectedSection === item?.name
              ? "bg-black text-white"
              : "bg-gray-100 text-black"
          }`}
        >
          <div
            className="flex justify-between gap-5 items-start p-2 lg:p-5 cursor-pointer select-none mt-8"
            onClick={() => {
              setSelectedScetion(
                selectedSection === item?.name ? false : item?.name
              );
              addLog("video_section");
              mixpanelLog("clicked_video_section");
            }}
          >
            <div className="flex items-start gap-2 lg:gap-5">
              <p className="text-md font-semibold">{index + 1}.</p>
              <div>
                <p className="text-md font-semibold">{item?.name}</p>
                <span
                  className={`text-sm ${
                    selectedSection === item?.name
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                >
                  {moment.utc(item?.duration * 1000).format("mm:ss")} |{" "}
                  {item?.chapter} chapter
                </span>
              </div>
            </div>
            <div className="w-fit">
              <FiChevronRight
                style={{
                  transform: selectedSection === item?.name && "rotate(90deg)",
                  color: selectedSection === item?.name ? "white" : "black",
                }}
                className="text-3xl duration-150"
              />
            </div>
          </div>
          <div
            className={`overflow-hidden ${
              selectedSection === item?.name ? "h-auto" : "h-0"
            }`}
          >
            <div className="border-t border-gray-600 mx-4 lg:mx-10 text-sm">
              {course?.content?.map(
                (video, index) =>
                  video?.sectionName?.toLowerCase() ===
                    item?.name?.toLowerCase() && (
                    <div
                      onClick={() => {
                        video?.videoId?.length > 5 && setSelectedVideo(video);
                        addLog("video");
                        mixpanelLog("select_video");
                      }}
                      key={index}
                      className="flex items-start justify-between gap-2 lg:gap-5 my-5 cursor-pointer"
                    >
                      <div className="flex items-start gap-2 lg:gap-5">
                        {video?.locked &&
                        (!user?.userId ||
                          !course?.courseBuyers?.includes(user?.userId)) ? (
                          <div className="w-[25px]">
                            <img src={lock} alt="" />
                          </div>
                        ) : (
                          <div className="w-fit">
                            {selectedVideo?.videoId !== video?.videoId ? (
                              <AiFillPlayCircle className="text-[25px]" />
                            ) : (
                              <AiFillPauseCircle className="text-[25px]" />
                            )}
                          </div>
                        )}
                        <p className="text-sm">{video?.subSectionName}</p>
                      </div>
                      <p className="text-sm">
                        {moment.utc(video?.duration * 1000).format("mm:ss")}
                      </p>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contents;
