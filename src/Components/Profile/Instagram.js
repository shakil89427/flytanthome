import React from "react";
import instagram from "../../Assets/profileSocials/instagram.png";

const Instagram = ({ details }) => {
  return (
    <div className="flex flex-col items-center gap-5 mt-40 text-gray-500 text-sm font-medium">
      <p>No account linked</p>
      <a
        href={`https://www.instagram.com/oauth/authorize?scope=user_profile,user_media&response_type=code&state=instagram&redirect_uri=${process.env.REACT_APP_INSTAGRAM_REDIRECT_URI}&client_id=${process.env.REACT_APP_INSTAGRAM_CLIENT_ID}`}
      >
        <img className="w-1/2 mx-auto" src={instagram} alt="" />
      </a>
      <p>Click here to link your instagram</p>
    </div>
  );
};

export default Instagram;
