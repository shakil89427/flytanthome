import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import playstore from "../Assets/playstore.png";
import { AiFillApple } from "react-icons/ai";
import AppBG from "../Assets/AppBG.png";
import useAnalytics from "../Hooks/useAnalytics";

const LandingApp = () => {
  const navigate = useNavigate();
  const { addLog } = useAnalytics();

  return (
    <div className="bg-black pb-64">
      <div className="r-box flex items-center h-14 md:h-24">
        <img
          onClick={() => {
            addLog("nav_logo");
            navigate("/");
          }}
          src={logo}
          alt=""
          className="cursor-pointer w-[130px] md:w-[185px]"
        />
      </div>
      <div className="r-box w-full flex flex-col xl:flex-row items-start px-5">
        <div className="text-white w-full xl:w-7/12 pl-5 xl:pl-0 py-14 md:py-20 lg:py-0 lg:translate-y-[15vh]">
          <p
            style={{ lineHeight: "120%" }}
            className="text-3xl md:text-4xl lg:text-[52px] font-medium"
          >
            Get <span className="font-bold">Sponsorships</span>
          </p>
          <p
            style={{ lineHeight: "120%" }}
            className="text-3xl md:text-4xl lg:text-[52px] font-medium"
          >
            from <span className="font-bold">Brands</span> with{" "}
            <span className="font-bold">Flytant</span>
          </p>
          <p className="text-md lg:text-2xl break-words my-5">
            Download the Flytant App and Monetise <br /> Your Social Media
            Content
          </p>

          <div className="flex gap-4 text-black mt-14 flex-wrap">
            <a
              onClick={() => addLog("playstore_download")}
              href="https://play.google.com/store/apps/details?id=influencer.marketing.flytant"
              target="_blank"
              rel="noreferrer"
              className="flex items-center pl-2 bg-white w-44 rounded-lg gap-1 py-1 hover:scale-105 duration-150"
            >
              <img className="w-9 mx-1" src={playstore} alt="" />
              <span>
                <p className="text-sm font-medium">GET IT ON</p>
                <p className="font-semibold text-xl leading-none">Play Store</p>
              </span>
            </a>
            <a
              onClick={() => addLog("appstore_download")}
              href="https://apps.apple.com/in/app/flytant/id1530158515"
              target="_blank"
              rel="noreferrer"
              className="flex items-center pl-1  bg-white w-44 rounded-lg gap-1 py-1 hover:scale-105 duration-150"
            >
              <AiFillApple className="text-5xl" />
              <span>
                <p className="text-[11px] font-medium">DOWNLOAD ON THE</p>
                <p className="font-semibold text-xl leading-none">App Store</p>
              </span>
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
