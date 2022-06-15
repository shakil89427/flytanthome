import React, { useEffect, useRef, useState } from "react";
import useStore from "../../Store/useStore";
import views from "../../Assets/views.png";
import duration from "../../Assets/duration.png";
import ok from "../../Assets/ok.png";
import moment from "moment";
import qArrow from "../../Assets/qArrow.png";

const Index = () => {
  const { courses } = useStore();
  const [selected, setSelected] = useState(false);
  const divRef = useRef();

  useEffect(() => {
    divRef.current.scrollIntoView();
    window.scroll(0, 0);
  }, []);

  return (
    <div ref={divRef} className="pt-5 pb-14">
      {courses?.slice(0, 1)?.map((course) => (
        <div key={course?.courseId}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <p className="text-lg xl:text-xl font-semibold">
                {course?.title}
              </p>
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
                    <p className="font-semibold">
                      {course?.createdBy?.username}
                    </p>
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
                    {moment
                      .utc(course?.totalDuration * 1000)
                      .format("HH:mm:ss")}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{ backgroundImage: `url(${course?.featureGraphic})` }}
                className="aspect-[5/3] bg-cover bg-center bg-no-repeat rounded-lg"
              ></div>
              <button className="w-full bg-[#FF8E10] text-white mt-2 py-3 rounded-md font-medium">
                Get Started
              </button>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-lg lg:text-xl">
              <span className="font-semibold">What</span> You'll learn
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 text-gray-600">
              {course?.whatYouWillLearn?.map((item) => (
                <div key={item} className="flex items-start gap-5">
                  <img className="w-4 mt-2" src={ok} alt="" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <p className="text-lg lg:text-xl">
              <span className="font-semibold">Course</span> FAQs
            </p>
            <div className="grid grid-cols-1 gap-7 mt-10">
              {course?.faq?.map((item, index) => (
                <div key={index} className="bg-gray-100 rounded-lg relative">
                  <div
                    className="flex justify-between gap-5 items-start p-5 cursor-pointer select-none"
                    onClick={() =>
                      setSelected(selected === index ? false : index)
                    }
                  >
                    <p className="font-medium">{item?.question}</p>
                    <img
                      style={{
                        transform: selected === index && "rotate(90deg)",
                      }}
                      className="duration-150 w-8"
                      src={qArrow}
                      alt=""
                    />
                  </div>
                  <div
                    className={`overflow-hidden ${
                      selected === index ? "h-auto" : "h-0"
                    }`}
                  >
                    <p className="mx-5 mb-5 p-2 bg-white rounded-md text-gray-600 text-sm">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 p-5 lg:p-14 shadow-xl rounded-lg border grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-10 items-center">
            <div>
              <p className="text-lg lg:text-xl font-semibold mb-2">
                Still Confuse ?
              </p>
              <p className="text-sm">
                Can't find the answer you're looking for?
              </p>
              <p className="text-sm">
                Write us your query and we'll get you soon.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-black text-white px-10 py-3 rounded-md font-medium">
                Write us
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Index;
