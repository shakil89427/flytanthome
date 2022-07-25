import React from "react";
import { useNavigate } from "react-router-dom";
import bannerBg from "../../Assets/socialCards/bannerBg.png";
import logo from "../../Assets/logo.png";
import useAnalytics from "../../Hooks/useAnalytics";

const Banner = () => {
  const navigate = useNavigate();
  const { addLog } = useAnalytics();
  return (
    <div className="r-box min-h-screen mb-24 md:mb-0">
      <div className="h-14 md:h-24 flex items-center justify-between">
        <img
          onClick={() => {
            addLog("nav_logo");
            navigate("/");
          }}
          className="cursor-pointer w-[130px] md:w-[185px]"
          src={logo}
          alt=""
        />
        <button
          style={{
            letterSpacing: ".4px",
          }}
          onClick={() => {
            addLog("get_card_now");
            navigate("/products");
          }}
          className="bg-white w-40 h-10 lg:w-48 lg:h-12  lg:text-lg  flex items-center justify-center rounded-md duration-150 hover:scale-105 font-medium invisible lg:visible"
        >
          Get Card Now
        </button>
      </div>
      <div className="w-full flex flex-col items-start md:flex-row md:items-center md:justify-between gap-10 pt-20 lg:pt-0">
        <div className="text-white w-full md:w-1/2 pl-5">
          <p
            style={{ lineHeight: "120%" }}
            className="text-4xl lg:text-[52px] font-bold mb-2"
          >
            Social Card
          </p>
          <p
            style={{ lineHeight: "120%" }}
            className="text-4xl lg:text-[52px] font-bold mb-3"
          >
            For Influencers
          </p>
          <p className="text-md lg:text-xl xl:text-2xl break-words my-5">
            Premium Card For <br /> Social Media Influencers
          </p>
          <p
            onClick={() => {
              addLog("get_your_card");
              navigate("/products");
            }}
            className="border-2 font-bold w-fit px-12 py-4 text-lg mt-14 rounded-full cursor-pointer select-none bg-white text-black hover:scale-105 duration-150"
          >
            GET YOUR CARD
          </p>
        </div>
        <div
          style={{ backgroundImage: `url(${bannerBg})` }}
          className="w-full md:w-1/2 aspect-square bg-contain bg-no-repeat bg-center"
        />
      </div>
    </div>
  );
};

export default Banner;
