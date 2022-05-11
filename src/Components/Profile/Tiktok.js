import React, { useState } from "react";
import { FaTiktok } from "react-icons/fa";
import useConnect from "../../Hooks/Tiktok/useConnect";
const Tiktok = ({ details }) => {
  const [loading, setLoading] = useState(false);
  const { openPopup } = useConnect(setLoading);
  return (
    <>
      <div className="flex flex-col items-center gap-5 mt-40 text-gray-500 text-sm font-medium">
        <p>No account linked</p>
        <p
          onClick={openPopup}
          className="bg-black text-white text-3xl p-5 rounded-full cursor-pointer"
        >
          <FaTiktok />
        </p>
        <p>Click here to link your tiktok</p>
      </div>
    </>
  );
};

export default Tiktok;
