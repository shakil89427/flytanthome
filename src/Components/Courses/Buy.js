import React, { useEffect } from "react";
import ok from "../../Assets/ok.png";
import cross from "../../Assets/cross.svg";

const Buy = ({ course, setShowBuy }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <>
      <div
        onClick={() => setShowBuy(false)}
        className="fixed top-0 left-0 w-screen h-screen bg-[#6362625b] z-20"
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[600px] max-h-[85vh] p-14 bg-white overflow-y-scroll scrollbar z-30 rounded-md">
        <img
          onClick={() => setShowBuy(false)}
          src={cross}
          alt=""
          className="absolute top-5 right-5 w-6 cursor-pointer"
        />
        <p className="text-lg lg:text-xl  text-center font-medium">
          Unlock Full Course
        </p>
        <div className="relative flex items-center justify-center w-full mt-5 mb-10">
          <p className="relative z-20 bg-white px-2">You will Get</p>
          <div className="absolute w-full h-[2px] bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
        </div>
        <div className="flex flex-col gap-5">
          {course?.whatYouWillLearn?.map((item) => (
            <div key={item} className="flex items-start gap-5">
              <img src={ok} alt="" className="w-4 mt-2" />
              <p>{item}</p>
            </div>
          ))}
        </div>
        <div className="relative flex items-center justify-center w-full mt-10 mb-5">
          <p className="relative z-20 bg-white px-2">Just at</p>
          <div className="absolute w-full h-[2px] bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
        </div>
      </div>
    </>
  );
};

export default Buy;
