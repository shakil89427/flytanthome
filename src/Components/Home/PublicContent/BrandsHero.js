import React from "react";
import rectEqual from "../../../Assets/publicHome/rectEqual.png";
import rectTall from "../../../Assets/publicHome/rectTall.png";
import wavy from "../../../Assets/publicHome/wavy.png";
import brandsHero from "../../../Assets/publicHome/brandsHero.png";
import blackDots from "../../../Assets/blackDots.png";
import { Link } from "react-router-dom";

const BrandsHero = () => {
  return (
    <div className="w-full relative min-h-screen">
      <img
        className="absolute h-[52%] w-1/2 md:h-full md:w-3/12 lg:w-3/12"
        src={rectTall}
        alt=""
      />
      <img
        className="absolute bottom-0 right-0 z-10 w-2/4 md:w-4/12 lg:w-4/12"
        src={rectEqual}
        alt=""
      />
      <div className="flex flex-col md:flex-row  max-w-[1400px] gap-14 lg:gap-20 mx-auto items-center py-24 justify-between px-5">
        <div className="w-full md:w-fit flex flex-col items-end md:items-center gap-10 z-20">
          <div className="border-2 rounded-3xl text-white p-5 py-8 bg-black">
            <h1
              style={{ lineHeight: "120%" }}
              className="text-4xl lg:text-5xl font-semibold"
            >
              Flytant For <br /> Brands
            </h1>
            <p className="text-lg lg:text-2xl max-w-[500px] font-medium mt-8 mb-10">
              Find the most Felicitous Influencers for Your Brand Promotion and
              Reach Your Target Audience WorldWide
            </p>
            <Link to="brands">
              <button className="border py-2 px-8 rounded-3xl text-xl bg-black hover:bg-white hover:text-black duration-150 font-medium">
                Promote Now
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-fit z-20">
          <img className="mb-10 ml-auto md:mx-auto" src={blackDots} alt="" />
          <div className="relative">
            <img
              className="absolute -top-6 -left-6 -z-10 w-5/12"
              src={wavy}
              alt=""
            />
            <img className="rounded-3xl z-40" src={brandsHero} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsHero;
