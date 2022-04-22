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
    >
      <div className="flex flex-col-reverse md:flex-row  max-w-[1400px] gap-14 lg:gap-20 mx-auto items-center px-5 py-32">
        <div className="w-full md:w-1/2">
          <img className="rounded-3xl" src={influencersHero} alt="" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-end md:items-center gap-10">
          <img src={whiteDots} alt="" />
          <div className="border-2 rounded-3xl text-white p-5 py-8">
            <h1
              style={{ lineHeight: "120%" }}
              className="text-4xl lg:text-5xl font-semibold"
            >
              Flytant For <br /> Influencers
            </h1>
            <p className="text-lg lg:text-xl max-w-[550px] font-medium my-8">
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
