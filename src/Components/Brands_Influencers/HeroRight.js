import React from "react";
import whiteDots from "../../Assets/whiteDots.png";

const HeroRight = ({ data }) => {
  return (
    <>
      <div className="bg-black text-white px-5 py-44 w-[90%] flex flex-col md:flex-row items-center mx-5 lg:mx-auto gap-28 justify-center rounded-xl relative">
        <div className="w-4 h-4 bg-white absolute top-6 right-6" />
        <img className="absolute top-7 left-7" src={whiteDots} alt="" />

        <div className=" p-8 max-w-[400px] border rounded-lg">
          <h1 className="text-3xl font-bold mb-5">{data.title}</h1>
          <p className="text-2xl text-gray-300">{data.info}</p>
        </div>
        <img src={data.img} alt="" />
        <div className="absolute w-[90%] h-8 bg-gray-300 top-full rounded-bl-lg rounded-br-lg" />
        <div className="absolute w-[95%] h-4 bg-gray-600 top-full rounded-bl-lg rounded-br-lg" />
      </div>
      <div className="w-[20%] h-36 bg-gray-300 mx-auto" />
    </>
  );
};

export default HeroRight;
