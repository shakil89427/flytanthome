import React from "react";
import instagram from "../../Assets/profileSocials/instagram.png";
import useConnect from "../../Hooks/Instagram/useConnect";

const Instagram = ({ details }) => {
  const { openPopup } = useConnect();
  return (
    <div className="flex flex-col items-center gap-5 mt-40 text-gray-500 text-sm font-medium">
      <p>No account linked</p>

      <p onClick={openPopup}>
        <img className="w-1/2 mx-auto" src={instagram} alt="" />
      </p>
      <p>Click here to link your instagram</p>
    </div>
  );
};

export default Instagram;
