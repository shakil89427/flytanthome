import React from "react";
import { Link } from "react-router-dom";
import onboardHero from "../../../Assets/publicHome/onboardHero.png";

const OnboardHero = () => {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to right,rgb(78, 77, 77), black)",
      }}
      className=""
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col-reverse md:flex-row lg:px-5 py-20">
          <div className="relative w-full md:w-1/2 pl-10 bg-black py-10 before:content-[''] before:absolute before:h-full before:w-1/2 before:bg-white before:top-0 before:left-0 lg:flex lg:items-center">
            <img
              className="relative rounded-3xl z-40"
              src={onboardHero}
              alt=""
            />
          </div>
          <div className="w-full md:w-1/2 bg-black py-10 px-5 lg:px-0 flex items-center justify-center">
            <div className="border-2 rounded-3xl text-white px-5 py-10  lg:ml-auto">
              <h1
                style={{ lineHeight: "120%" }}
                className="text-4xl lg:text-5xl font-semibold"
              >
                Its all here <br /> all in one spot
              </h1>
              <p className="text-lg lg:text-xl font-medium lg:max-w-[550px] my-8">
                Flytant is the go to platform for Influencer Marketing. We
                provide a holistic platform for Influencers and Brands to
                connect together transparently and make the most of their
                Collaboration.
              </p>
              <Link
                to="onboard"
                className="border py-2 px-8 rounded-3xl text-xl bg-black hover:bg-white hover:text-black duration-150 font-medium"
              >
                Get Onboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardHero;
