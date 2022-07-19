import React from "react";
import bigBg from "../../Assets/socialCards/bigBg.png";
import smallBg from "../../Assets/socialCards/smallBg.png";
import impressionBg from "../../Assets/socialCards/impressionBg.png";

const Impression = () => {
  return (
    <div className="r-box text-white pt-10 md:pt-14 lg:pt-28 flex flex-col-reverse items-start md:flex-row md:items-center md:justify-between gap-10">
      <div
        style={{
          backgroundImage: `url(${smallBg})`,
        }}
        className="border border-[#4d4d4d9d] bg-cover bg-center bg-no-repeat p-7 xl:p-14 rounded-xl w-full md:w-1/2 lg:w-5/12"
      >
        <p
          style={{ lineHeight: "140%" }}
          className="text-3xl lg:text-4xl font-semibold"
        >
          Instant Impression
        </p>
        <p className="text-md lg:text-xl my-8 font-medium text-[#BEBEBE]">
          Not Anymore Connect Your Other Bank Accounts to Fi And See All Your
          Balances And Transactions On Fi
        </p>
        <p className="border-2 w-fit px-8 py-2 rounded-full">Share Profile</p>
      </div>
      <div
        style={{ backgroundImage: `url(${bigBg})` }}
        className="aspect-square p-5 lg:p-10 bg-cover bg-center bg-no-repeat rounded-xl border border-[#4d4d4d9d] w-full md:w-1/2 lg:w-5/12 flex items-center justify-center"
      >
        <div
          style={{
            backgroundImage: `url(${impressionBg})`,
          }}
          className="w-full aspect-square bg-contain bg-center bg-no-repeat"
        />
      </div>
    </div>
  );
};

export default Impression;
