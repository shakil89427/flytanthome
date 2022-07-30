import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAnalytics from "../Hooks/useAnalytics";
import logo from "../Assets/logo.png";
import bannerBg from "../Assets/socialCards/bannerBg.png";
import bigBg from "../Assets/socialCards/bigBg.png";
import smallBg from "../Assets/socialCards/smallBg.png";
import animation from "../Assets/socialCards/animation.mp4";
import card1 from "../Assets/socialCards/impression/card1.png";
import card2 from "../Assets/socialCards/impression/card2.png";
import card3 from "../Assets/socialCards/impression/card3.png";
import customizecard1 from "../Assets/socialCards/customize/card1.png";
import customizecard2 from "../Assets/socialCards/customize/card2.png";
import customizecard3 from "../Assets/socialCards/customize/card3.png";
import followersBg from "../Assets/socialCards/followersBg.png";
import analyticsBg from "../Assets/socialCards/analyticsBg.png";
import works1 from "../Assets/socialCards/howItWorks/works1.png";
import works2 from "../Assets/socialCards/howItWorks/works2.png";
import works3 from "../Assets/socialCards/howItWorks/works3.png";
import works4 from "../Assets/socialCards/howItWorks/works4.png";
import premiumBg from "../Assets/socialCards/premiumBg.png";

const SocialCard = () => {
  const { addLog } = useAnalytics();
  const navigate = useNavigate();
  const imgRef = useRef();
  const [text, setText] = useState("");
  const images = [customizecard1, customizecard2, customizecard3];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const works = [
    { title: "Get Your Card", img: works1 },
    { title: "Create Profile", img: works2 },
    { title: "Activate Card", img: works3 },
    { title: "Make Connections", img: works4 },
  ];

  useEffect(() => {
    let active = card1;
    const startAnimation = setInterval(() => {
      imgRef.current.className = "duration-1000 scale-0 opacity-0";
      setTimeout(() => {
        if (active === card1) {
          active = card2;
          imgRef.current.src = card2;
        } else if (active === card2) {
          active = card3;
          imgRef.current.src = card3;
        } else {
          active = card1;
          imgRef.current.src = card1;
        }
        imgRef.current.className = "duration-1000 scale-100 opacity-1";
      }, 1000);
    }, 3000);

    return () => clearInterval(startAnimation);
  }, []);

  useEffect(() => {
    addLog("user_visited_socialcard_page");
  }, []);

  return (
    <div className="bg-black flex flex-col items-center gap-24 md:gap-0 text-white">
      {/* Banner */}
      <div className="r-box min-h-screen ">
        <div className="h-14 md:h-24 flex items-center justify-between">
          <img
            onClick={() => {
              addLog("nav_logo");
              navigate("/");
            }}
            className="cursor-pointer w-[130px] md:w-[185px]"
            src={logo}
            alt=""
          />
          <button
            style={{
              letterSpacing: ".4px",
            }}
            onClick={() => {
              addLog("get_card_now");
              navigate("/products");
            }}
            className="bg-white text-black w-40 h-10 lg:w-48 lg:h-12  lg:text-lg  flex items-center justify-center rounded-md duration-150 hover:scale-105 font-medium invisible lg:visible "
          >
            Get Card Now
          </button>
        </div>
        <div className="w-full flex flex-col items-start md:flex-row md:items-center md:justify-between gap-10 pt-20 lg:pt-0">
          <div className=" w-full md:w-1/2 pl-5">
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
              onClick={() => {
                addLog("get_your_card");
                navigate("/products");
              }}
              className="border-2 font-bold w-fit px-12 py-4 text-lg mt-14 rounded-full cursor-pointer select-none bg-white text-black hover:scale-105 duration-150"
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

      {/* Sharing */}
      <div className="min-h-screen flex items-center justify-center socialcardbg w-full">
        <div className="r-box  flex flex-col-reverse items-start md:flex-row md:items-center md:justify-between gap-10">
          <video
            autoPlay
            muted
            loop
            className="aspect-square  bg-cover bg-center bg-no-repeat rounded-xl border border-[#4d4d4d9d] w-full md:w-1/2 lg:w-5/12 flex items-center justify-center"
          >
            <source src={animation} type="video/mp4" />
          </video>

          <div
            onClick={() => {
              addLog("share_profile");
              navigate("/products");
            }}
            style={{
              backgroundImage: `url(${smallBg})`,
            }}
            className="cursor-pointer border border-[#4d4d4d9d] bg-cover bg-bottom bg-no-repeat p-7 pb-10 rounded-xl w-full md:w-1/2 lg:w-5/12 bg-black"
          >
            <p
              style={{ lineHeight: "120%" }}
              className="text-4xl lg:text-5xl font-semibold"
            >
              One Tap Sharing
            </p>
            <p className="text-md lg:text-2xl pr-5 mt-8 mb-10 font-light">
              Instantly Share Your Profile with Anyone by Tapping your Card on
              their Phone. Other Users do not need a Card or an App to connect.
              Make Unlimited Connections with Your Social Card.
            </p>
            <p className="w-fit border py-3 px-10 md:px-14 rounded-3xl text-xl bg-black hover:bg-white hover:text-black duration-150 font-medium">
              SHARE PROFILE
            </p>
          </div>
        </div>
      </div>

      {/* Impression */}

      <div className="min-h-screen flex items-center justify-center socialcardbg w-full">
        <div className="r-box  flex flex-col items-start md:flex-row md:items-center md:justify-between gap-10">
          <div
            onClick={() => {
              addLog("buy_now");
              navigate("/products");
            }}
            style={{
              backgroundImage: `url(${smallBg})`,
            }}
            className="cursor-pointer border border-[#4d4d4d9d] bg-cover bg-bottom bg-no-repeat p-7 pb-10 rounded-xl w-full md:w-1/2 lg:w-5/12 bg-black"
          >
            <p
              style={{ lineHeight: "120%" }}
              className="text-4xl lg:text-5xl font-semibold"
            >
              Instant Impression
            </p>
            <p className="text-md lg:text-2xl pr-5 mt-8 mb-10 font-light">
              The High Quality Flytant Social Card has an Immaculate Look and
              Feel. Leave an Instant impression and exchange contacts with your
              Social Card.
            </p>
            <p className="w-fit border py-3 px-10 md:px-14 rounded-3xl text-xl bg-black hover:bg-white hover:text-black duration-150 font-medium">
              BUY NOW
            </p>
          </div>
          <div
            style={{ backgroundImage: `url(${bigBg})` }}
            className="aspect-square p-5 lg:p-10 bg-cover bg-center bg-no-repeat rounded-xl border border-[#4d4d4d9d] w-full md:w-1/2 lg:w-5/12 flex items-center justify-center bg-black"
          >
            <img ref={imgRef} src={card1} alt="" />
          </div>
        </div>
      </div>

      {/* Customize */}
      <div className="min-h-screen flex items-center justify-center socialcardbg w-full">
        <div className="r-box  flex flex-col-reverse items-start md:flex-row md:items-center md:justify-between gap-10">
          <div
            style={{ backgroundImage: `url(${bigBg})` }}
            className="aspect-square p-5 lg:p-10 bg-cover bg-center bg-no-repeat rounded-xl border border-[#4d4d4d9d] w-full md:w-1/2 lg:w-5/12 flex items-center justify-center gap-10 bg-black"
          >
            <div className="w-full grid grid-cols-3 gap-x-5 gap-y-10">
              <div className="col-span-3 relative overflow-hidden ">
                <img src={selectedImage} alt="" className="w-full" />
                <p className="absolute right-3 bottom-3 xl:right-7 xl:bottom-7 xl:text-lg font-semibold   px-3">
                  {text?.length > 0 ? text?.toUpperCase() : "Your Name Here"}
                </p>
              </div>
              {images.map((item, index) => (
                <div
                  onClick={() => {
                    addLog("blob_change");
                    setSelectedImage(item);
                  }}
                  key={index}
                  className={`bg-[#323232] cursor-pointer rounded-lg p-3 ${
                    selectedImage === item
                      ? "border border-neutral-300"
                      : "border-0"
                  }`}
                >
                  <img src={item} alt="" className="w-full" />
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url(${smallBg})`,
            }}
            className="border border-[#4d4d4d9d] bg-cover bg-bottom bg-no-repeat p-7 pb-10 rounded-xl w-full md:w-1/2 lg:w-5/12 bg-black"
          >
            <p
              style={{ lineHeight: "120%" }}
              className="text-4xl lg:text-5xl font-semibold"
            >
              Customizable <br /> Social Card
            </p>
            <p className="text-md mt-8 font-light">Give a try</p>
            <input
              placeholder="Enter your name"
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              className="border-0 outline-none w-[80%] mt-2 mb-10 p-2 bg-[#3D3D3D] rounded-md"
            />
            <p
              onClick={() => {
                addLog("get_your_card");
                navigate("/products");
              }}
              className="w-fit border py-3 px-10 md:px-14 rounded-3xl text-xl bg-black hover:bg-white hover:text-black duration-150 font-medium cursor-pointer"
            >
              GET YOUR CARD
            </p>
          </div>
        </div>
      </div>

      {/* Followers */}

      <div className="min-h-screen flex items-center justify-center socialcardbg w-full">
        <div className="r-box  flex flex-col items-start md:flex-row md:items-center md:justify-between gap-10">
          <div
            onClick={() => {
              addLog("access_data");
              navigate("/products");
            }}
            style={{
              backgroundImage: `url(${smallBg})`,
            }}
            className="cursor-pointer border border-[#4d4d4d9d] bg-cover bg-bottom bg-no-repeat p-7 pb-10 rounded-xl w-full md:w-1/2 lg:w-5/12 bg-black"
          >
            <p
              style={{ lineHeight: "120%" }}
              className="text-4xl lg:text-5xl font-semibold"
            >
              Followers Data
            </p>
            <p className="text-md lg:text-2xl pr-10 mt-8 mb-10 font-light">
              Get Complete Access to Your Followers Data from All Social Media
              Platforms. You are No Longer Dependent on Social Media Platforms
              to connect with your Followers or Subscribers. That means even if
              Social Media Platform bans your account, you can Directly connect
              with Your Followers.
            </p>
            <p className="w-fit border py-3 px-10 md:px-14 rounded-3xl text-xl bg-black hover:bg-white hover:text-black duration-150 font-medium">
              ACCESS DATA
            </p>
          </div>
          <div
            style={{ backgroundImage: `url(${followersBg})` }}
            className="aspect-square p-5 lg:p-10 bg-contain bg-center bg-no-repeat rounded-xl w-full md:w-1/2 lg:w-5/12 flex items-center justify-center"
          />
        </div>
      </div>
      {/* Analytics */}
      <div className="min-h-screen flex items-center justify-center socialcardbg w-full">
        <div className="r-box  flex flex-col-reverse items-start md:flex-row md:items-center md:justify-between gap-10">
          <div
            style={{ backgroundImage: `url(${analyticsBg})` }}
            className="aspect-square p-5 lg:p-10 bg-contain bg-center bg-no-repeat rounded-xl w-full md:w-1/2 lg:w-5/12 flex items-center justify-center"
          ></div>
          <div
            onClick={() => {
              addLog("view_analytics");
              navigate("/products");
            }}
            style={{
              backgroundImage: `url(${smallBg})`,
            }}
            className="cursor-pointer border border-[#4d4d4d9d] bg-cover bg-bottom bg-no-repeat p-7 pb-10 rounded-xl w-full md:w-1/2 lg:w-5/12 bg-black"
          >
            <p
              style={{ lineHeight: "120%" }}
              className="text-4xl lg:text-5xl font-semibold"
            >
              Analytics
            </p>
            <p className="text-md lg:text-2xl mt-8 mb-10 font-light">
              Full Access to Your Social Media Analytics and who viewed your
              Profile, how many people visited links, who saved your contact and
              all sorts Data that you need to build your Strong Fan Following.
            </p>
            <p className="w-fit border py-3 px-10 md:px-14 rounded-3xl text-xl bg-black hover:bg-white hover:text-black duration-150 font-medium">
              VIEW ANALYTICS
            </p>
          </div>
        </div>
      </div>
      {/* How */}
      <div className="min-h-screen flex items-center justify-center socialcardbg w-full">
        <div className="pt-10 r-box ">
          <p className="text-3xl lg:text-4xl font-semibold text-center">
            HOW IT WORKS?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-14 lg:py-24 xl:py-32">
            {works.map((work, index) => (
              <div
                key={work?.title}
                className="flex flex-col items-center justify-center"
              >
                <div
                  style={{ backgroundImage: `url(${work?.img})` }}
                  className="w-full aspect-square bg-contain bg-center bg-no-repeat"
                />
                <p className="mt-6 mb-3 text-lg lg:text-xl font-medium">
                  {index + 1}
                </p>
                <p className="text-lg lg:text-xl font-medium">{work?.title}</p>
              </div>
            ))}
          </div>
          <p
            onClick={() => {
              addLog("buy_social_card");
              navigate("/products");
            }}
            className="border-2 font-bold w-fit px-12 py-4 text-lg rounded-full cursor-pointer select-none mx-auto hover:bg-white hover:text-black duration-150"
          >
            BUY SOCIAL CARD
          </p>
        </div>
      </div>
      {/* Premium */}
      <div className="pt-24 pb-24 lg:pb-60 socialcardbg w-full">
        <div className="relative">
          <img src={premiumBg} alt="" className="w-full" />
          <div className="absolute w-full left-0 text-center bottom-0">
            <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
              Premium Social Card
            </p>
            <p className="text-md md:text-xl lg:text-2xl xl:text-3xl font-semibold mt-1 lg:mt-5">
              100K+ Influencers Already Using
            </p>
          </div>
        </div>
        <button
          style={{
            letterSpacing: ".4px",
          }}
          onClick={() => {
            addLog("get_card_now");
            navigate("/products");
          }}
          className="bg-white w-40 h-10 lg:w-48 lg:h-12  lg:text-lg hidden  lg:flex items-center justify-center rounded-md duration-150 hover:scale-105 font-medium invisible lg:visible text-black mx-auto mt-7"
        >
          Get Card Now
        </button>
      </div>
    </div>
  );
};

export default SocialCard;
