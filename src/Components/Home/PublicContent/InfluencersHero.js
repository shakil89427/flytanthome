import React from "react";
import { Link } from "react-router-dom";
import influencersHero from "../../../Assets/publicHome/influencersHero.png";
import whiteDots from "../../../Assets/whiteDots.png";

const InfluencersHero = () => {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to right, black, rgb(78, 77, 77))",
      }}
      className="min-h-screen flex items-center"
    >
      <div className="flex flex-col-reverse md:flex-row  max-w-[1300px] gap-14 lg:gap-20 mx-auto items-center px-5 py-32 justify-between">
        <div className="w-full md:w-1/2 lg:w-7/12">
          <img className="rounded-3xl w-full" src={influencersHero} alt="" />
        </div>
        <div className="w-full md:w-1/2 lg:w-5/12">
          <img className="mb-10 ml-auto md:mx-auto" src={whiteDots} alt="" />
          <div className="border-2 rounded-3xl text-white px-5 py-8">
            <h1
              style={{ lineHeight: "120%" }}
              className="text-4xl lg:text-5xl font-semibold"
            >
              Flytant For <br /> Influencers
            </h1>
            <p className="text-md lg:text-2xl pr-10 mt-8 mb-10 font-light">
              Join the fastest growing Influencers community and Get
              Sponsorships from Brands to Monetise Your Content
            </p>
            <Link to="/influencers">
              <button className="border py-2 px-8 rounded-3xl text-xl bg-black hover:bg-white hover:text-black duration-150 font-medium">
                Join Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencersHero;
