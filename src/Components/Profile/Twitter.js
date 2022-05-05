import React from "react";
import twitter from "../../Assets/profileSocials/twitter.png";
const Twitter = ({ details }) => {
  return (
    <div className="flex flex-col items-center gap-5 mt-40 text-gray-500 text-sm font-medium">
      <p>No account linked</p>
      <a href="https://twitter.com">
        <img className="w-1/2 mx-auto" src={twitter} alt="" />
      </a>
      <p>Click here to link your twitter</p>
    </div>
  );
};

export default Twitter;
