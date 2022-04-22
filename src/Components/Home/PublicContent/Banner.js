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
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1400px] mx-auto py-20 md:py-32 lg:py-36 gap-20 md:gap-10 lg:gap-20 px-5 lg:px-10">
        <div className="text-white w-fit mx-auto">
          <h1
            style={{ lineHeight: "120%" }}
            className="text-5xl font-bold mb-3"
          >
            Connecting <br /> Brands & Influencers
          </h1>
          <p className="text-xl  my-5">
            Find influencers and Brands of your niche
          </p>
          <div className="flex flex-col md:flex-row gap-3 text-black mt-10">
            <a
              href="https://firebasestorage.googleapis.com/v0/b/flytant-app.appspot.com/o/androidApp%2FFlytant1.0.2%2FUpdated%2FFlytant.apk?alt=media&token=cc06343b-0789-40a7-99e7-aafbc948b00e"
              target="_blank"
              rel="noreferrer"
              className="flex items-center pl-3 bg-white w-44 rounded-lg gap-1 py-2"
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
              className="flex items-center pl-3  bg-white w-44 rounded-lg gap-1 py-2"
            >
              <AiFillApple className="text-3xl" />
              <span>
                <p className="text-xs">Download on the</p>
                <p className="font-bold">App Store</p>
              </span>
            </a>
          </div>
        </div>
        <div
          style={{
            backgroundImage:
              "linear-gradient(to right,black,rgb(68, 12, 12),black,rgb(17, 17, 82),black)",
          }}
          className="rounded-xl relative text-white w-full h-72 sm:h-96 md:h-[310px] lg:h-[360px]"
        >
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
            <img className="h-full block mx-auto" src={bannerBg} alt="" />
          )}
          {play ? (
            <GiCrossMark
              onClick={() => setPlay(false)}
              className="absolute -top-6 right-0 text-2xl cursor-pointer"
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
  );
};

export default Banner;
