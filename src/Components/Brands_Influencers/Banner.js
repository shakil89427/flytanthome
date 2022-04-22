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
      <div className="py-20 px-5 max-w-[1400px] mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-14 lg:gap-5">
          <div
            style={{
              backgroundImage: "linear-gradient(45deg, black, rgb(53, 52, 52))",
            }}
            className=" text-white px-10 py-14 rounded-2xl"
          >
            <h1
              style={{ lineHeight: "120%" }}
              className="text-5xl font-semibold"
            >
              Flytant
            </h1>
            <h1
              style={{ lineHeight: "120%" }}
              className="text-5xl font-semibold"
            >
              {data.title}
            </h1>
            <p className="text-lg font-medium pr-28 mt-10 mb-14 relative before:content[''] before:absolute before:w-28 before:h-[3px] before:bg-white before:-bottom-5 before:left-0 after:content[''] after:absolute after:w-4 after:h-[3px] after:bg-white after:-bottom-5 after:left-32">
              {data.info}
            </p>
            <div className="flex gap-3">
              <a
                href="https://firebasestorage.googleapis.com/v0/b/flytant-app.appspot.com/o/androidApp%2FFlytant1.0.2%2FUpdated%2FFlytant.apk?alt=media&token=cc06343b-0789-40a7-99e7-aafbc948b00e"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 w-44 bg-white text-black pl-5 rounded-lg py-2 cursor-pointer"
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
                className="flex items-center gap-2 w-44 bg-white text-black pl-5 rounded-lg py-2 cursor-pointer"
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
            <img
              className="rounded-lg w-[80%] block ml-auto"
              src={data.img}
              alt=""
            />
          </div>
        </div>
        <img className="mt-10" src={blackDots} alt="" />
      </div>
    </div>
  );
};

export default Banner;
