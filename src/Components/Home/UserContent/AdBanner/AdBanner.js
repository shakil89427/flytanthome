import React from "react";
import { useNavigate } from "react-router-dom";
import adBannerBg from "../../../../Assets/userHome/adBannerBg.png";

const AdBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-col items-center justify-center">
      <div
        style={{ backgroundImage: `url(${adBannerBg})` }}
        className="aspect-[5/2] lg:aspect-[12/3] bg-cover bg-center bg-no-repeat flex items-center justify-center border"
      >
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">30% off</h1>
          <h3 className="text-md md:text-lg lg:text-xl font-medium mt-2 mb-4">
            Buy Flytant Subscription Today
          </h3>
          <button
            onClick={() => navigate("/subscription")}
            className="bg-black text-white px-4 py-2 rounded-md text-sm lg:text-lg hover:scale-105 duration-150 font-medium"
          >
            Avail 30% discount now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
