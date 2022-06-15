import React, { useEffect, useRef } from "react";
import useStore from "../../Store/useStore";
import views from "../../Assets/views.png";
import duration from "../../Assets/duration.png";
import moment from "moment";

const Index = () => {
  const { courses } = useStore();
  const divRef = useRef();

  useEffect(() => {
    divRef.current.scrollIntoView();
    window.scroll(0, 0);
  }, []);

  return (
    <div ref={divRef} className="pt-5 pb-14">
      {courses?.slice(0, 1)?.map((course) => (
        <div key={course?.courseId} className="grid grid-cols-2 gap-10">
          <div className="col-span-2 lg:col-span-1">
            <p className="text-lg xl:text-xl font-semibold">{course?.title}</p>
            <div className="flex items-end justify-between my-10">
              <div className="flex items-start gap-3">
                <div
                  style={{
                    backgroundImage: `url(${course?.createdBy?.userProfileImageUrl})`,
                  }}
                  className="bg-cover bg-center bg-no-repeat rounded-full w-[35px] h-[35px]"
                />
                <div className="">
                  <p className="text-xs text-gray-500">Created by</p>
                  <p className="font-semibold">{course?.createdBy?.username}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                {moment.unix(course?.creationDate).format("MMM,DD,yyyy")}
              </p>
            </div>
            <p className="text-sm mb-10">{course?.longDescription}</p>
            <div className="text-sm flex items-center gap-5">
              <div className="flex items-center gap-2">
                <img className="w-5" src={views} alt="" />
                <p className="text-gray-500 ">{course?.totalViews} Viewers</p>
              </div>
              <div className="flex items-center gap-2">
                <img className="w-5" src={duration} alt="" />
                <p>
                  {moment.utc(course?.totalDuration * 1000).format("HH:mm:ss")}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <div
              style={{ backgroundImage: `url(${course?.featureGraphic})` }}
              className="aspect-[5/3] bg-cover bg-center bg-no-repeat rounded-lg"
            ></div>
            <button className="w-full bg-[#FF8E10] text-white mt-2 py-3 rounded-md font-medium">
              Get Started
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Index;
