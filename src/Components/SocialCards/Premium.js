import React from "react";
import { useNavigate } from "react-router-dom";
import premiumBg from "../../Assets/socialCards/premiumBg.png";
import useAnalytics from "../../Hooks/useAnalytics";

const Premium = () => {
  const navigate = useNavigate();
  const { addLog } = useAnalytics();
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(145deg, #121212 0%, #000000 100%)",
      }}
      className="pt-24 pb-24 lg:pb-60 text-white "
    >
      <div className="relative">
        <img src={premiumBg} alt="" className="w-full" />
        <div className="absolute w-full left-0 text-center bottom-0">
          <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
            Premium Social Card
          </p>
          <p className="text-md md:text-xl lg:text-2xl xl:text-3xl font-semibold mt-1 lg:mt-5">
            100K+ Influencers Already Using
          </p>
        </div>
      </div>
      <button
        style={{
          letterSpacing: ".4px",
        }}
        onClick={() => {
          addLog("get_card_now");
          navigate("/products");
        }}
        className="bg-white w-40 h-10 lg:w-48 lg:h-12  lg:text-lg hidden  lg:flex items-center justify-center rounded-md duration-150 hover:scale-105 font-medium invisible lg:visible text-black mx-auto mt-7"
      >
        Get Card Now
      </button>
    </div>
  );
};

export default Premium;
