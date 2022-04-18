import React from "react";
import influencersHero from "../../../Assets/publicHome/influencersHero.png";
import whiteDots from "../../../Assets/whiteDots.png";

const InfluencersHero = () => {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to right, black, rgb(78, 77, 77))",
      }}
    >
      <div className="flex flex-col-reverse md:flex-row  max-w-[1200px] gap-14 lg:gap-20 mx-auto items-center px-5 py-24">
        <div className="w-full md:w-7/12">
          <img className="rounded-3xl" src={influencersHero} alt="" />
        </div>
        <div className="w-full md:w-5/12 flex flex-col items-end md:items-center gap-10">
          <img src={whiteDots} alt="" />
          <div className="border-2 rounded-3xl text-white p-5 py-10">
            <h1 className="text-5xl font-bold mb-2">Flytant For</h1>
            <h1 className="text-5xl font-bold mb-2">Influencers</h1>
            <p className="text-xl font-medium my-8">
              Join the fastest growing Influencers community and Get
              Sponsorships from Brands to Monetise Your Content
            </p>
            <button className="border py-2 px-8 rounded-3xl text-xl bg-black hover:bg-white hover:text-black duration-150 font-medium">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencersHero;
