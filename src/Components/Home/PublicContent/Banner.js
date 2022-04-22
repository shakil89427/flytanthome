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
    <div className="relative min-h-screen">
      <div className="polygon" />
      <NavBar color={"transparent"} />
      <div className="flex flex-col md:flex-row gap-20 md:gap-10 max-w-[1300px] px-5 mx-auto mt-14 md:mt-20 lg:mt-[10vh] lg:items-center">
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
          <div className="flex flex-col md:flex-row gap-3 text-black mt-14">
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
          className="rounded-3xl relative text-white md:w-1/2 h-72 sm:h-96 md:h-[280px] lg:h-[390px] mb-3 md:mb-0"
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
            <img className="absolute h-[90%] bottom-0 " src={bannerBg} alt="" />
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
