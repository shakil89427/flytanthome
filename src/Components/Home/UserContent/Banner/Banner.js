import React, { useState } from "react";
import playstore from "../../../../Assets/playstoreWhite.png";
import { AiFillApple } from "react-icons/ai";
import { BsPlayCircle } from "react-icons/bs";
import bannerBg from "../../../../Assets/publicHome/bannerBg.png";
import cross from "../../../../Assets/cross.svg";

const Banner = () => {
  const [play, setPlay] = useState(false);
  return (
    <div className="bg-[#ecebebf8] p-5 lg:p-10 rounded-lg">
      <div className="flex flex-col items-start lg:flex-row lg:items-center justify-center gap-y-10">
        <div className="w-full lg:w-6/12 text-black">
          <h1
            style={{ lineHeight: "120%" }}
            className="text-3xl lg:text-[40px] font-bold mb-3"
          >
            Connecting <br /> Brands & Influencers
          </h1>
          <p className="text-md lg:text-xl  my-5 w-[230px] lg:w-full text-gray-600">
            Find influencers and Brands of your niche
          </p>
          <div className="flex gap-4  mt-14 flex-wrap text-white">
            <a
              href="https://play.google.com/store/apps/details?id=influencer.marketing.flytant"
              target="_blank"
              rel="noreferrer"
              className="flex items-center pl-2 bg-black w-40 rounded-lg gap-1 py-2 hover:scale-105 duration-150"
            >
              <img className="w-8 mx-1" src={playstore} alt="" />
              <span>
                <p className="text-xs font-medium">GET IT ON</p>
                <p className="font-semibold text-lg leading-none">Play Store</p>
              </span>
            </a>
            <a
              href="https://apps.apple.com/in/app/flytant/id1530158515"
              target="_blank"
              rel="noreferrer"
              className="flex items-center pl-1  bg-black w-40 rounded-lg gap-1 py-2 hover:scale-105 duration-150"
            >
              <AiFillApple className="text-4xl" />
              <span>
                <p className="text-[11px] font-medium">DOWNLOAD ON THE</p>
                <p className="font-semibold text-lg leading-none">App Store</p>
              </span>
            </a>
          </div>
        </div>
        <div className="w-full lg:w-6/12 ">
          <div className="rounded-3xl relative text-white aspect-[12/8]">
            {play ? (
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/i0Nxig4oTz8?autoplay=1"
                title="Flytant"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;fullscreen"
                allowFullScreen
              ></iframe>
            ) : (
              <img className="w-full h-full" src={bannerBg} alt="" />
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
                className="absolute bottom-8 left-8 text-5xl cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
