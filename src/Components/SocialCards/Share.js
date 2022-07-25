import React from "react";
import smallBg from "../../Assets/socialCards/smallBg.png";
import animation from "../../Assets/socialCards/animation.mp4";
import { useNavigate } from "react-router-dom";
import useAnalytics from "../../Hooks/useAnalytics";

const Share = () => {
  const navigate = useNavigate();
  const { addLog } = useAnalytics();
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(145deg, #121212 0%, #000000 100%)",
      }}
      className="min-h-screen flex items-center justify-center mb-24 md:mb-0"
    >
      <div className="r-box text-white flex flex-col-reverse items-start md:flex-row md:items-center md:justify-between gap-10">
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
          className="cursor-pointer border border-[#4d4d4d9d] bg-cover bg-bottom bg-no-repeat p-7 pb-10 rounded-xl w-full md:w-1/2 lg:w-5/12"
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
  );
};

export default Share;
