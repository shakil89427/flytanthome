import React from "react";
import { AiOutlineTwitter } from "react-icons/ai";

const Twitter = ({ details }) => {
  return (
    <div className="flex flex-col items-center gap-5 mt-52 text-gray-500 text-sm font-medium">
      <p className="bg-black text-white text-3xl p-4 rounded-full cursor-pointer">
        <AiOutlineTwitter />
      </p>
    </div>
  );
};

export default Twitter;
