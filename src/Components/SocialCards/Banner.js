import React from "react";
import { useNavigate } from "react-router-dom";
import bannerBg from "../../Assets/socialCards/bannerBg.png";
import logo from "../../Assets/logo.png";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="r-box min-h-screen">
      <div className="h-14 md:h-24 flex items-center justify-between">
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer w-[130px] md:w-[185px]"
          src={logo}
          alt=""
        />
        <button
          style={{
            letterSpacing: ".4px",
          }}
          onClick={() => navigate("/products")}
          className="bg-white w-40 h-10 lg:w-48 lg:h-12  lg:text-lg  flex items-center justify-center rounded-md duration-150 hover:scale-105 font-semibold"
        >
          Get Card Now
        </button>
      </div>
      <div className="w-full flex flex-col items-start md:flex-row md:items-center md:justify-between gap-10 pt-20 lg:pt-0">
        <div className="text-white w-full md:w-1/2 lg:pl-5">
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
            onClick={() => navigate("/products")}
            className="bg-white text-black w-fit px-6 py-3 mt-14 font-bold hover:scale-105 duration-150 text-lg rounded-full cursor-pointer select-none"
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
