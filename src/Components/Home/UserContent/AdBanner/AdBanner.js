import React from "react";
import { useNavigate } from "react-router-dom";
import adBannerBg from "../../../../Assets/userHome/adBannerBg.png";
import useAnalytics from "../../../../Hooks/useAnalytics";

const AdBanner = () => {
  const navigate = useNavigate();
  const { addLog } = useAnalytics();
  return (
    <div
      onClick={() => {
        addLog("ad_banner");
        navigate("/subscription");
      }}
      className="flex-col items-center justify-center cursor-pointer"
    >
      <div
        style={{ backgroundImage: `url(${adBannerBg})` }}
        className="aspect-[5/3] lg:aspect-[12/3] bg-cover bg-center bg-no-repeat flex items-center justify-center border"
      >
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">30% off</h1>
          <h3 className="text-sm md:text-lg lg:text-xl font-medium mt-2 mb-4">
            Buy Flytant Subscription Today
          </h3>
          <button className="bg-black text-white px-4 py-2 rounded-md text-sm lg:text-lg hover:scale-105 duration-150 font-medium">
            Avail 30% discount now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
