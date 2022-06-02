import React, { useState } from "react";
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import LargeTop from "./LargeTop";
import SmallSide from "./SmallSide";

const NavBar = ({ color }) => {
  const navigate = useNavigate();
  const [showSide, setShowSide] = useState(false);

  return (
    <div style={{ backgroundColor: color ? color : "black" }}>
      <div className="r-box h-14 md:h-28 flex items-center">
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer w-[130px] md:w-[185px]"
          src={logo}
          alt=""
        />
        <GiHamburgerMenu
          onClick={() => setShowSide(true)}
          className="lg:hidden text-white text-3xl hover:border rounded-md p-1 cursor-pointer ml-auto"
        />
        <SmallSide showSide={showSide} setShowSide={setShowSide} />
        <LargeTop />
      </div>
    </div>
  );
};

export default NavBar;
