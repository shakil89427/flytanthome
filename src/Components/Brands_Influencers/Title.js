import React from "react";

const Title = ({ data }) => {
  return (
    <div className="relative">
      <h1 className="z-20 text-3xl md:text-4xl font-bold mb-20 text-center w-fit mx-auto relative before:content[''] before:absolute before:w-28 before:h-[4px] before:bg-black before:-bottom-5 before:left-0 after:content[''] after:absolute after:w-4 after:h-[4px] after:bg-black after:-bottom-5 after:left-32">
        {data}
      </h1>
      <div className="absolute w-[20%] h-80 bg-gray-300 top-0 left-0" />
    </div>
  );
};

export default Title;
