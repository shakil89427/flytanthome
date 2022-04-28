import React from "react";
import { useNavigate } from "react-router-dom";
import cross from "../../Assets/cross.svg";

const SocialError = ({ setSocialError }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={() => setSocialError(false)}
        className="fixed w-full h-screen top-0 left-0 z-20 bg-[#07070783]"
      />
      <div className="fixed w-[90vw] md:w-[500px] lg:w-[650px]  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-2xl z-30">
        <img
          onClick={() => setSocialError(false)}
          className="absolute top-3 right-3 cursor-pointer w-5"
          src={cross}
          alt=""
        />
        <p className="text-xl md:text-2xl lg:text-3xl text-center font-medium">
          Please connect social accounts first
        </p>
        <p className="text-md md:text-lg lg:text-xl text-center font-medium text-gray-600 mt-4 mb-10">
          Do you want to connect now?
        </p>
        <div className="flex items-center mx-auto w-fit gap-5">
          <button
            onClick={() => setSocialError(false)}
            className="border border-black px-7 py-2 rounded-md text-lg font-medium"
          >
            Not Now
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="border border-black px-7 py-2 rounded-md text-lg font-medium bg-black text-white"
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialError;
