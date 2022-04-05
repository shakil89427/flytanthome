import React from "react";
import bannerImg from "../../Assets/Rectangle 1535.png";

const AdBanner = () => {
  return (
    <div className="relative my-10">
      <img className="w-full min-h-[250px]" src={bannerImg} alt="" />
      <h1 className="font-bold text-lg lg:text-3xl text-white absolute top-[50%]  right-[50%] translate-x-[50%]">
        advertisement banner
      </h1>
    </div>
  );
};

export default AdBanner;
