import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";

const Instagram = ({ details }) => {
  return (
    <div className="flex flex-col items-center gap-5 mt-52 text-gray-500 text-sm font-medium">
      <a
        href={`https://www.instagram.com/oauth/authorize?scope=user_profile,user_media&response_type=code&state=instagram&redirect_uri=${process.env.REACT_APP_INSTAGRAM_REDIRECT_URI}&client_id=${process.env.REACT_APP_INSTAGRAM_CLIENT_ID}`}
        className="bg-black text-white text-3xl p-4 rounded-full cursor-pointer"
      >
        <AiOutlineInstagram />
      </a>
    </div>
  );
};

export default Instagram;
