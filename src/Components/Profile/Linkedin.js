import React from "react";
import linkedin from "../../Assets/profileSocials/linkedin.png";
const Linkedin = ({ details }) => {
  return (
    <div className="flex flex-col items-center gap-5 mt-40 text-gray-500 text-sm font-medium">
      <p>No account linked</p>
      <a href="https://www.linkedin.com">
        <img className="w-1/2 mx-auto" src={linkedin} alt="" />
      </a>
      <p>Click here to link your linkedin</p>
    </div>
  );
};

export default Linkedin;
