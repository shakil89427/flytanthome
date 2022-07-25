import React from "react";
import rectEqual from "../../../Assets/publicHome/rectEqual.png";
import rectTall from "../../../Assets/publicHome/rectTall.png";
import wavy from "../../../Assets/publicHome/wavy.png";
import brandsHero from "../../../Assets/publicHome/brandsHero.png";
import blackDots from "../../../Assets/blackDots.png";
import { useNavigate } from "react-router-dom";
import useAnalytics from "../../../Hooks/useAnalytics";

const BrandsHero = () => {
  const navigate = useNavigate();
  const { addLog } = useAnalytics();
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
      <div className="flex flex-col md:flex-row  r-box gap-14 lg:gap-20 items-center py-24 justify-between">
        <div className="w-full md:w-1/2 lg:w-5/12 z-20">
          <div
            onClick={() => {
              addLog("promote_now");
              navigate("/brands");
            }}
            className="border-2 rounded-3xl text-white px-5 lg:pl-8 py-8 bg-black cursor-pointer"
          >
            <h1
              style={{ lineHeight: "120%" }}
              className="text-4xl lg:text-5xl font-semibold"
            >
              Flytant For <br /> Brands
            </h1>
            <p className="text-md lg:text-2xl mt-8 mb-10 font-light">
              Find the most Felicitous Influencers for Your Brand Promotion and
              Reach Your Target Audience WorldWide
            </p>
            <p
              onClick={() => {
                addLog("promote_now");
                navigate("/brands");
              }}
              className="w-fit border py-3 px-8 md:px-12 rounded-3xl text-xl bg-black hover:bg-white hover:text-black duration-150 font-medium"
            >
              Promote Now
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-7/12 z-20">
          <img className="mb-10 ml-auto md:mx-auto" src={blackDots} alt="" />
          <div className="relative">
            <img
              className="absolute -top-6 -left-6 -z-10 w-5/12"
              src={wavy}
              alt=""
            />
            <img className="rounded-3xl z-40 w-full" src={brandsHero} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsHero;
