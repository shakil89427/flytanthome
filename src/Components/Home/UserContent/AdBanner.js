import React from "react";
import adBannerBg from "../../../Assets/userHome/adBannerBg.png";

const AdBanner = () => {
  return (
    <div className="r-box">
      <img className="mb-5" src={adBannerBg} alt="" />
    </div>
    // <div style={{ padding: "0" }} className="relative mb-5 lg:my-10 r-box">
    //   <div
    //     className="h-48 md:h-60 lg:h-96 bg-cover bg-center bg-no-repeat"
    //     style={{ backgroundImage: `url(${adBannerBg})` }}
    //   />
    //   <h1 className="font-bold text-lg lg:text-3xl text-white absolute top-[50%]  right-[50%] translate-x-[50%]">
    //     Advertisement Banner
    //   </h1>
    // </div>
  );
};

export default AdBanner;
