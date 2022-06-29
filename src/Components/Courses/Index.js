import React, { useEffect, useRef, useState } from "react";
import useStore from "../../Store/useStore";
import views from "../../Assets/views.png";
import duration from "../../Assets/duration.png";
import ok from "../../Assets/ok.png";
import moment from "moment";
import qArrow from "../../Assets/qArrow.png";
import antPlay2 from "../../Assets/antPlay2.png";
import { useNavigate } from "react-router-dom";
import millify from "millify";

const Index = () => {
  const { user, courses } = useStore();
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();
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
              <p className="text-lg lg:text-xl xl:text-2xl font-semibold">
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
                  <div>
                    <p className="text-xs text-gray-500">Created by</p>
                    <p className="font-semibold text-lg">
                      {course?.createdBy?.username}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  {moment.unix(course?.creationDate).format("MMM,DD,yyyy")}
                </p>
              </div>
              <div className="lg:hidden mb-10">
                <div
                  onClick={() =>
                    navigate(`/courses/contents/${course?.courseId}`)
                  }
                  style={{ backgroundImage: `url(${course?.featureGraphic})` }}
                  className="aspect-[5/3] bg-cover bg-center bg-no-repeat rounded-lg flex items-center justify-center"
                >
                  <img
                    className="w-16 cursor-pointer hover:scale-105 duration-150"
                    src={antPlay2}
                    alt=""
                  />
                </div>
                <button
                  onClick={() =>
                    navigate(`/courses/contents/${course?.courseId}`)
                  }
                  className="w-full bg-[#FF8E10] text-white mt-5 py-3 rounded-md font-medium"
                >
                  {course?.courseBuyers?.includes(user?.userId)
                    ? "Continue with Course"
                    : "Get Started"}
                </button>
              </div>
              <p style={{ lineHeight: "200%" }} className="mb-10 text-gray-500">
                {course?.longDescription}
              </p>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <img className="w-5" src={views} alt="" />
                  <p className="text-gray-500 ">
                    {millify(course?.totalViews)} Viewers
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <img className="w-5" src={duration} alt="" />
                  <p className="text-gray-500">
                    {moment
                      .utc(course?.totalDuration * 1000)
                      .format("HH:mm:ss")}
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div
                onClick={() =>
                  navigate(`/courses/contents/${course?.courseId}`)
                }
                style={{ backgroundImage: `url(${course?.featureGraphic})` }}
                className="aspect-[5/3] bg-cover bg-center bg-no-repeat rounded-lg flex items-center justify-center"
              >
                <img
                  className="w-16 cursor-pointer hover:scale-105 duration-150"
                  src={antPlay2}
                  alt=""
                />
              </div>
              <button
                onClick={() =>
                  navigate(`/courses/contents/${course?.courseId}`)
                }
                className="w-full bg-[#FF8E10] text-white mt-5 py-3 rounded-md font-medium"
              >
                {course?.courseBuyers?.includes(user?.userId)
                  ? "Continue with Course"
                  : "Get Started"}
              </button>
            </div>
          </div>
          <div className="mt-20">
            <p className="text-lg lg:text-xl xl:text-2xl">
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
          <div className="mt-20">
            <p className="text-lg lg:text-xl xl:text-2xl">
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
                    <p className="mx-5 mb-5 p-2 bg-white rounded-md text-gray-600">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 p-5 lg:p-14 shadow-xl border rounded-lg grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-10 items-center">
            <div>
              <p className="text-lg lg:text-xl xl:text-2xl font-semibold mb-2">
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
              <a
                href="mailto:courses@flytant.com"
                target="_blank"
                rel="noreferrer"
                className="bg-black text-white px-10 py-3 rounded-md font-medium"
              >
                Write us
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Index;
