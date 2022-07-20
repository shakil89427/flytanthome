import React from "react";
import premiumBg from "../../Assets/socialCards/premiumBg.png";

const Premium = () => {
  return (
    <div className="pt-24 pb-24 lg:pb-60 text-white">
      <div className="relative">
        <img src={premiumBg} alt="" className="w-full" />
        <p className="absolute w-full text-center bottom-0 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
          Premium Social Card
        </p>
      </div>
      <p className="text-center mt-3 lg:mt-5 text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold">
        100K+ Influencers Already Using
      </p>
    </div>
  );
};

export default Premium;
