import React from "react";
import adBannerBg from "../../../Assets/userHome/adBannerBg.png";

const AdBanner = () => {
  return (
    <div className="relative mb-5 lg:my-10">
      <div
        className="h-48 md:h-60 lg:h-96 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${adBannerBg})` }}
      />
      <h1 className="font-bold text-lg lg:text-3xl text-white absolute top-[50%]  right-[50%] translate-x-[50%]">
        Advertisement Banner
      </h1>
    </div>
  );
};

export default AdBanner;
