import React from "react";
import twitter from "../../Assets/profileSocials/twitter.png";
import useConnect from "../../Hooks/Twitter/useConnect";
const Twitter = ({ details }) => {
  const { openPopup } = useConnect();

  return (
    <div className="flex flex-col items-center gap-5 mt-40 text-gray-500 text-sm font-medium">
      <p>No account linked</p>
      <p onClick={openPopup}>
        <img className="w-1/2 mx-auto" src={twitter} alt="" />
      </p>
      <p>Click here to link your twitter</p>
    </div>
  );
};

export default Twitter;
