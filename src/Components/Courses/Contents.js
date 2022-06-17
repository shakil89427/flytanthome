import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../Store/useStore";
import antPlay2 from "../../Assets/antPlay2.png";
import moment from "moment";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Buy from "./Buy";

const Contents = () => {
  const { courses } = useStore();
  const [course, setCourse] = useState({});
  const [selectedSection, setSelectedScetion] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [showBuy, setShowBuy] = useState(false);
  const { id } = useParams();
  const divRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const matched = courses?.find((item) => item?.courseId === id);
    if (matched?.title) {
      setCourse(matched);
      setSelectedVideo(matched?.content[0]);
    } else {
      navigate("/courses");
    }
  }, [courses, id]);

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
      <div
        style={{
          backgroundImage: `url(${
            selectedVideo?.thumbnail ||
            "https://cdn.unenvironment.org/2022-03/field-ge4d2466da_1920.jpg"
          })`,
        }}
        className="aspect-[4/2] bg-cover bg-center bg-no-repeat rounded-lg flex items-center justify-center mt-10 overflow-hidden relative"
      >
        {selectedVideo?.locked ? (
          <div className="bg-[#42424275] absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-white text-center lg:text-lg">
              For Your plan only preview is available
            </p>
            <button
              onClick={() => setShowBuy(true)}
              className="block mx-auto bg-white px-7 py-3 mt-2 rounded-md font-medium"
            >
              Unlock Course
            </button>
          </div>
        ) : (
          <img
            className="w-16 cursor-pointer hover:scale-105 duration-150"
            src={antPlay2}
            alt=""
          />
        )}
      </div>
      <p className="text-lg lg:text-xl xl:text-2xl mt-10">
        <span className="font-semibold">Course</span> Details
      </p>
      {course?.sectionName?.map((item, index) => (
        <div
          key={index}
          className={`rounded-lg relative ${
            selectedSection === index
              ? "bg-black text-white"
              : "bg-gray-100 text-black"
          }`}
        >
          <div
            className="flex justify-between gap-5 items-start p-2 lg:p-5 cursor-pointer select-none mt-8"
            onClick={() =>
              setSelectedScetion(selectedSection === index ? false : index)
            }
          >
            <div className="flex items-start gap-2 lg:gap-5">
              <p className="text-md font-semibold">{index + 1}.</p>
              <div>
                <p className="text-md font-semibold">{item?.name}</p>
                <span
                  className={`text-sm ${
                    selectedSection === index ? "text-white" : "text-gray-500"
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
                  transform: selectedSection === index && "rotate(90deg)",
                  color: selectedSection === index ? "white" : "black",
                }}
                className="text-3xl duration-150"
              />
            </div>
          </div>
          <div
            className={`overflow-hidden ${
              selectedSection === index ? "h-auto" : "h-0"
            }`}
          >
            <div className="border-t border-gray-600 mx-4 lg:mx-10 text-sm">
              {course?.content?.map(
                (video) =>
                  video?.sectionName?.toLowerCase() ===
                    item?.name?.toLowerCase() && (
                    <div
                      onClick={() => setSelectedVideo(video)}
                      key={video?.videoId}
                      className="flex items-start justify-between gap-2 lg:gap-5 my-5 cursor-pointer"
                    >
                      <div className="flex items-start gap-2 lg:gap-5">
                        {selectedVideo?.videoId === video?.videoId ? (
                          <div className="w-fit">
                            <AiFillPlayCircle className="text-[25px]" />
                          </div>
                        ) : (
                          <div className="w-fit">
                            <AiFillPauseCircle className="text-[25px]" />
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
