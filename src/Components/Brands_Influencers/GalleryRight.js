import React from "react";
import blackDots from "../../Assets/blackDots.png";

const GalleryRight = ({ data }) => {
  return (
    <div className="py-5 relative px-5 md:px-20 my-14">
      <div className="absolute w-full h-20 bg-black bottom-10 left-0" />
      <img className="absolute top-14 left-20" src={blackDots} alt="" />
      <div className="w-fit ml-auto max-w-[50%]">
        <h1 className="text-4xl font-bold">{data.title}</h1>
        <p className="max-w-[350px] text-lg font-medium my-5 relative before:content[''] before:absolute before:w-28 before:h-[3px] before:bg-black before:-bottom-5 before:left-0 after:content[''] after:absolute after:w-4 after:h-[3px] after:bg-black after:-bottom-5 after:left-32">
          {data.info}
        </p>
      </div>
      <div className="grid grid-cols-12 gap-3 my-14 relative">
        <div className="col-span-6 md:col-span-3 md:row-span-2 flex items-end">
          <img className="w-full" src={data.img4} alt="" />
        </div>
        <div className="col-span-6 md:col-span-3">
          <img className="w-full h-full" src={data.img1} alt="" />
        </div>
        <div className="col-span-5 md:col-span-2">
          <img className="w-full h-full" src={data.img2} alt="" />
        </div>
        <div className="col-span-7 md:col-span-4">
          <img className="w-full h-full" src={data.img3} alt="" />
        </div>
        <div className="col-span-12 md:col-span-4">
          <img className="w-full h-full" src={data.img5} alt="" />
        </div>
        <div className="col-span-7 md:col-span-3">
          <img className="w-full h-full" src={data.img6} alt="" />
        </div>
        <div className="col-span-5 md:col-span-2">
          <img className="w-full h-full" src={data.img7} alt="" />
        </div>
      </div>
    </div>
  );
};

export default GalleryRight;
