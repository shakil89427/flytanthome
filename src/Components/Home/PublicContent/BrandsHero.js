import React from "react";
import rect_equal from "../../../Assets/rect_equal.png";
import rect_tall from "../../../Assets/rect_tall.png";
import wavy from "../../../Assets/wavy.png";
import brandsbg from "../../../Assets/brands_hero.png";
import dots2 from "../../../Assets/dots_2.png";

const BrandsHero = () => {
  return (
    <div className=" bg-white relative">
      <img
        className="absolute h-[52%] w-1/2 md:h-full md:w-3/12 lg:w-3/12"
        src={rect_tall}
        alt=""
      />
      <img
        className="absolute bottom-0 right-0 z-10 w-2/4 md:w-4/12 lg:w-4/12"
        src={rect_equal}
        alt=""
      />
      <div className="flex flex-col md:flex-row  max-w-[1200px] gap-14 lg:gap-20 mx-auto items-center px-5 py-14">
        <div className="w-full md:w-5/12 flex flex-col items-end md:items-center gap-10 z-20">
          <div className="border-2 rounded-3xl text-white p-5 py-10 bg-black">
            <h1 className="text-5xl font-bold mb-2">Flytant For</h1>
            <h1 className="text-5xl font-bold mb-2">Brands</h1>
            <p className="text-xl font-medium my-8">
              Find the most Felicitous Influencers for Your Brand Promotion and
              Reach Your Target Audience WorldWide
            </p>
            <button className="border py-2 px-8 rounded-3xl text-xl bg-black hover:bg-white hover:text-black duration-150 font-medium">
              Promote Now
            </button>
          </div>
        </div>
        <div className="w-full md:w-7/12 flex flex-col items-end md:items-center gap-8 z-20">
          <img src={dots2} alt="" />
          <div className="relative">
            <img
              className="absolute -top-6 -left-6 -z-10 w-5/12"
              src={wavy}
              alt=""
            />
            <img className="rounded-3xl z-40" src={brandsbg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsHero;
