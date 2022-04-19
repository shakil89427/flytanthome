import React, { useState } from "react";
import "./CSS/Banner.css";
import NavBar from "../../NavBar/NavBar";
import bannerBg from "../../../Assets/publicHome/bannerBg.png";
import { AiFillAndroid, AiFillApple } from "react-icons/ai";
import { BsPlayCircle } from "react-icons/bs";
import { GiCrossMark } from "react-icons/gi";

const Banner = () => {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative">
      <div className="polygon" />
      <NavBar color={"transparent"} />
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1200px] mx-auto py-36 gap-20 md:gap-10">
        <div className="text-white px-5">
          <h1
            style={{ lineHeight: "120%" }}
            className="text-5xl font-semibold mb-3"
          >
            Connecting <br /> Brands & Influencers
          </h1>
          <p className="text-md lg:text-lg  my-5">
            Find influencers and Brands of your niche
          </p>
          <div className="flex flex-col md:flex-row gap-3 text-black mt-10">
            <div className="flex items-center pl-3 bg-white w-44 rounded-lg gap-1 py-1">
              <AiFillAndroid className="text-3xl" />
              <span>
                <p className="text-xs">Download our</p>
                <p className="font-bold">Android App</p>
              </span>
            </div>
            <div className="flex items-center pl-3  bg-white w-44 rounded-lg gap-1 py-1">
              <AiFillApple className="text-3xl" />
              <span>
                <p className="text-xs">Download on the</p>
                <p className="font-bold">App Store</p>
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage:
              "linear-gradient(to right,black,rgb(68, 12, 12),black,rgb(17, 17, 82),black)",
          }}
          className="rounded-xl relative text-white"
        >
          {play ? (
            <iframe
              className="w-full"
              height="370"
              src="https://www.youtube.com/embed/i0Nxig4oTz8?autoplay=1"
              title="Flytant"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;fullscreen"
              allowfullscreen
            ></iframe>
          ) : (
            <img className="w-full" src={bannerBg} alt="" />
          )}
          {play ? (
            <GiCrossMark
              onClick={() => setPlay(false)}
              className="absolute -top-6 right-0 text-2xl cursor-pointer"
            />
          ) : (
            <BsPlayCircle
              onClick={() => setPlay(true)}
              className="absolute bottom-8 left-8 text-6xl cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
