import React from "react";
import { useNavigate } from "react-router-dom";
import adBannerBg from "../../../../Assets/userHome/adBannerBg.png";

const AdBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="r-box">
      <div
        style={{ backgroundImage: `url(${adBannerBg})` }}
        className="aspect-[12/3] bg-cover bg-center bg-no-repeat flex items-center justify-center border"
      >
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            30% off
          </h1>
          <h3 className="text-lg md:text-xl lg:text-2xl font-medium mt-2 mb-5">
            Buy Flytant Subscription Today
          </h3>
          <button
            onClick={() => navigate("/subscription")}
            className="bg-black text-white px-5 py-3 rounded-md text-md md:text-lg hover:scale-105 duration-150 font-medium"
          >
            Avail 30% discount now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
