import React, { useState } from "react";
import "./CSS/Banner.css";
import NavBar from "../../NavBar/NavBar";
import bannerBg from "../../../Assets/publicHome/bannerBg.png";
import { AiFillApple } from "react-icons/ai";
import { BsPlayCircle } from "react-icons/bs";
import cross from "../../../Assets/cross.svg";
import playstore from "../../../Assets/playstore.png";

const Banner = () => {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative lg:min-h-screen">
      <div className="polygon" />
      <NavBar color={"transparent"} />
      <div className="flex flex-col md:flex-row gap-20 md:gap-10 r-box py-20 md:py-28 lg:py-0 lg:translate-y-[15vh] lg:px-14">
        <div className="text-white md:w-1/2">
          <h1
            style={{ lineHeight: "120%" }}
            className="text-5xl lg:text-[52px] font-bold mb-3"
          >
            Connecting <br /> Brands & Influencers
          </h1>
          <p className="text-lg lg:text-2xl  my-5">
            Find influencers and Brands of your niche
          </p>
          <div className="flex gap-3 text-black mt-14 flex-wrap">
            <a
              href="https://play.google.com/store/apps/details?id=influencer.marketing.flytant"
              target="_blank"
              rel="noreferrer"
              className="flex items-center pl-3 bg-white w-44 rounded-lg gap-1 py-2 hover:scale-105 duration-150"
            >
              <img className="w-6 mx-1" src={playstore} alt="" />
              <span>
                <p className="text-sm font-medium leading-none">GET IT ON</p>
                <p className="font-bold text-xl leading-none mt-1">
                  Play Store
                </p>
              </span>
            </a>
            <a
              href="https://apps.apple.com/in/app/flytant/id1530158515"
              target="_blank"
              rel="noreferrer"
              className="flex items-center pl-3  bg-white w-44 rounded-lg gap-1 py-2 hover:scale-105 duration-150"
            >
              <AiFillApple className="text-3xl" />
              <span>
                <p className="text-[11px] font-medium leading-none">
                  DOWNLOAD ON THE
                </p>
                <p className="font-bold text-xl leading-none mt-1">App Store</p>
              </span>
            </a>
          </div>
        </div>
        <div className="rounded-3xl relative text-white md:w-1/2 h-72 sm:h-[390px] md:h-[240px] lg:h-[370px] xl:h-[390px]">
          {play ? (
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/i0Nxig4oTz8?autoplay=1"
              title="Flytant"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;fullscreen"
              allowfullscreen
            ></iframe>
          ) : (
            <img
              className="w-full h-full absolute bottom-0"
              src={bannerBg}
              alt=""
            />
          )}
          {play ? (
            <img
              onClick={() => setPlay(false)}
              className="absolute top-0 right-0 text-2xl cursor-pointer bg-white"
              src={cross}
              alt=""
            />
          ) : (
            <BsPlayCircle
              onClick={() => setPlay(true)}
              className="absolute bottom-8 left-8 text-5xl lg:text-6xl cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
