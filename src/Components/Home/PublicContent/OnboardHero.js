import React from "react";
import onboardHero from "../../../Assets/publicHome/onboardHero.png";

const OnboardHero = () => {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to right,rgb(78, 77, 77), black)",
      }}
    >
      <div className="flex flex-col-reverse md:flex-row md:mx-10 py-20">
        <div className="relative w-full md:w-7/12 p-10 bg-black py-10 before:content-[''] before:absolute before:h-full before:w-1/2 before:bg-white before:top-0 before:left-0">
          <img className="relative rounded-3xl z-40" src={onboardHero} alt="" />
        </div>
        <div className="w-full md:w-5/12 flex items-center justify-center bg-black py-10">
          <div className="border-2 rounded-3xl text-white p-5 py-5 mx-5">
            <h1
              style={{ lineHeight: "120%" }}
              className="text-5xl font-semibold"
            >
              Its all here
            </h1>
            <h1
              style={{ lineHeight: "120%" }}
              className="text-5xl font-semibold"
            >
              all in one spot
            </h1>
            <p className="text-xl font-medium max-w-[450px] my-8">
              Flytant is the go to platform for Influencer Marketing. We provide
              a holistic platform for Influencers and Brands to connect together
              transparently and make the most of their Collaboration.
            </p>
            <button className="border py-2 px-8 rounded-3xl text-xl bg-black hover:bg-white hover:text-black duration-150 font-medium">
              Get Onboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardHero;
