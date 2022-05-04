import React from "react";
import { AiOutlineYoutube } from "react-icons/ai";

const Youtube = ({ details }) => {
  return (
    <div className="flex flex-col items-center gap-5 mt-52 text-gray-500 text-sm font-medium">
      <a
        href={`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube.readonly&response_type=token&state=youtubev3&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        className="bg-black text-white text-3xl p-4 rounded-full cursor-pointer"
      >
        <AiOutlineYoutube />
      </a>
    </div>
  );
};

export default Youtube;
