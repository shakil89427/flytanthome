import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import AppStoreBtn from "../Assets/AppStoreBtn.png";
import PlayStoreBtn from "../Assets/PlayStoreBtn.png";
import AppBG from "../Assets/AppBG.png";

const LandingApp = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen">
      <div className="r-box flex items-center h-14 md:h-24">
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt=""
          className="cursor-pointer w-[130px] md:w-[185px]"
        />
      </div>
      <div className="r-box w-full flex flex-col xl:flex-row items-center px-5 gap-8 xl:gap-0 py-14 xl:py-0">
        <div className="text-white w-full xl:w-7/12 pl-5 xl:pl-0">
          <div className="flex flex-col gap-2 md:gap-4 lg:gap-5 xl:gap-6">
            <p className="text-3xl md:text-4xl lg:text-[52px] font-medium">
              Get <span className="font-bold">Sponsorships</span>
            </p>
            <p className="text-3xl md:text-4xl lg:text-[52px] font-medium">
              from <span className="font-bold">Brands</span> with{" "}
              <span className="font-bold">Flytant</span>
            </p>
            <p className="text-md lg:text-2xl lg:w-full">
              Easily get connect with brands and <br /> much more with Flytant
            </p>
          </div>

          <div className="flex gap-4 mt-14 flex-wrap">
            <a
              href="https://play.google.com/store/apps/details?id=influencer.marketing.flytant"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-105 duration-150 w-48"
            >
              <img src={PlayStoreBtn} alt="" />
            </a>
            <a
              href="https://apps.apple.com/in/app/flytant/id1530158515"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-105 duration-150 w-48"
            >
              <img src={AppStoreBtn} alt="" />
            </a>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(${AppBG})` }}
          className="w-full xl:w-5/12 aspect-[4/5] bg-contain bg-no-repeat bg-center"
        />
      </div>
    </div>
  );
};

export default LandingApp;
