import React from "react";
import { useNavigate } from "react-router-dom";
import onboardHero from "../../../Assets/publicHome/onboardHero.png";
import useAnalytics from "../../../Hooks/useAnalytics";

const OnboardHero = () => {
  const navigate = useNavigate();
  const { addLog } = useAnalytics();
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to right,rgb(78, 77, 77), black)",
      }}
      className="min-h-screen flex items-center py-14"
    >
      <div className="flex flex-col-reverse gap-20 md:flex-row md:justify-between md:items-center bg-black r-box py-10 lg:py-0">
        <div className="md:w-1/2 lg:w-7/12 relative py-10 flex-tems-center">
          <div className="absolute w-screen h-full bg-white right-1/2 top-0" />
          <img
            className="relative rounded-3xl z-40 w-full"
            src={onboardHero}
            alt=""
          />
        </div>
        <div
          onClick={() => {
            addLog("get_onboard");
            navigate("/onboard");
          }}
          className="md:w-1/2 lg:w-5/12  border-2 rounded-3xl text-white px-5 lg:pl-8 py-10 lg:ml-auto pointer cursor-pointer"
        >
          <h1
            style={{ lineHeight: "120%" }}
            className="text-4xl lg:text-5xl font-semibold"
          >
            Its all here <br /> all in one spot
          </h1>
          <p className="text-md lg:text-2xl my-8 font-light pr-5 lg:pr-14">
            Flytant is the go to platform for Influencer Marketing. We provide a
            holistic platform for Influencers and Brands to connect together
            transparently and make the most of their Collaboration.
          </p>
          <p
            onClick={() => {
              addLog("get_onboard");
              navigate("/onboard");
            }}
            className="w-fit border py-3 px-8 md:px-12 rounded-3xl text-xl bg-black hover:bg-white hover:text-black duration-150 font-medium"
          >
            Get Onboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardHero;
