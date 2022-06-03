import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="z-50 fixed w-full h-screen bg-[#ffffff81] top-0 left-0 flex items-center justify-center">
      <ReactLoading type={"bars"} color={"#000000"} height={90} width={90} />
    </div>
  );
};

export default Loading;
