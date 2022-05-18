import React from "react";
import NavBar from "../NavBar/NavBar";
import { AiFillAndroid, AiFillApple } from "react-icons/ai";
import "./CSS/Banner.css";
import blackDots from "../../Assets/blackDots.png";

const Banner = ({ data }) => {
  return (
    <div className="relative">
      <div className="bgmain" />
      <NavBar color={"transparent"} />
      <div className="py-32 r-box">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-14 md:gap-5 lg:gap-20">
          <div
            style={{
              backgroundImage:
                "linear-gradient(45deg, black,  rgb(59, 58, 58))",
            }}
            className=" text-white px-8 lg:px-14 py-14 rounded-2xl"
          >
            <h1
              style={{ lineHeight: "120%" }}
              className="text-3xl lg:text-5xl md:w-1/2 font-bold"
            >
              Flytant {data.title}
            </h1>
            <p className="text-lg font-medium mt-10 mb-14 lg:pr-36 relative before:content[''] before:absolute before:w-28 before:h-[3px] before:bg-white before:-bottom-5 before:left-0 after:content[''] after:absolute after:w-4 after:h-[3px] after:bg-white after:-bottom-5 after:left-32">
              {data.info}
            </p>
            <div className="flex flex-col xl:flex-row gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=influencer.marketing.flytant"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 w-44 bg-white text-black pl-5 rounded-lg py-2 hover:scale-105 duration-150"
              >
                <AiFillAndroid className="text-3xl" />
                <span>
                  <p className="text-xs">Download our</p>
                  <p className="font-bold">Android App</p>
                </span>
              </a>
              <a
                href="https://apps.apple.com/in/app/flytant/id1530158515"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 w-44 bg-white text-black pl-5 rounded-lg py-2 hover:scale-105 duration-150"
              >
                <AiFillApple className="text-3xl" />
                <span>
                  <p className="text-xs">Download on the</p>
                  <p className="font-bold">App Store</p>
                </span>
              </a>
            </div>
          </div>
          <div className="">
            <img className="rounded-lg w-full" src={data.img} alt="" />
          </div>
        </div>
        <img className="mt-10" src={blackDots} alt="" />
      </div>
    </div>
  );
};

export default Banner;
