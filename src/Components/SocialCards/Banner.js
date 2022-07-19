import React from "react";
import { useNavigate } from "react-router-dom";
import bannerBg from "../../Assets/socialCards/bannerBg.png";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="r-box w-full flex flex-col xl:flex-row xl xl:items-center items-start pt-20 lg:pt-0">
      <div className="text-white w-full xl:w-1/2 lg:pl-5">
        <p
          style={{ lineHeight: "120%" }}
          className="text-3xl md:text-4xl lg:text-[52px] font-bold"
        >
          Social Card
        </p>
        <p
          style={{ lineHeight: "120%" }}
          className="text-3xl md:text-4xl lg:text-[52px] font-bold"
        >
          For Influencers
        </p>
        <p className="text-md lg:text-2xl break-words my-5">
          Premium Card For Social Media Influencers
        </p>
        <p
          onClick={() => navigate("/products")}
          className="bg-white text-black w-fit px-5 py-2 font-medium text-lg rounded-full cursor-pointer select-none"
        >
          Get your Card
        </p>
      </div>
      <div
        style={{ backgroundImage: `url(${bannerBg})` }}
        className="w-full xl:w-1/2 aspect-square bg-contain bg-no-repeat bg-center"
      />
    </div>
  );
};

export default Banner;
