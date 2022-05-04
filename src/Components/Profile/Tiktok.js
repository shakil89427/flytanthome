import React from "react";
import { FaTiktok } from "react-icons/fa";

const Tiktok = ({ details }) => {
  return (
    <div className="flex flex-col items-center gap-5 mt-52 text-gray-500 text-sm font-medium">
      <p className="bg-black text-white text-3xl p-4 rounded-full cursor-pointer">
        <FaTiktok />
      </p>
    </div>
  );
};

export default Tiktok;
