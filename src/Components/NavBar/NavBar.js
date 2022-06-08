import React, { useState } from "react";
import logo from "../../Assets/logo.png";
import logoBlack from "../../Assets/logoBlack.png";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSearch } from "react-icons/bi";
import LargeTop from "./LargeTop";
import SmallSide from "./SmallSide";

const NavBar = ({ color }) => {
  const navigate = useNavigate();
  const [showSide, setShowSide] = useState(false);

  return (
    <div style={{ backgroundColor: color ? color : "black" }}>
      <div
        className={`${
          color === "white" ? "border-b" : "border-0"
        } h-[10vh] lg:h-[12vh] r-box flex items-center justify-between`}
      >
        {color === "white" ? (
          <img
            onClick={() => navigate("/")}
            className="cursor-pointer w-[130px] md:w-[185px]"
            src={logoBlack}
            alt=""
          />
        ) : (
          <img
            onClick={() => navigate("/")}
            className="cursor-pointer w-[130px] md:w-[185px]"
            src={logo}
            alt=""
          />
        )}
        <div className="lg:hidden flex items-center justify-end gap-3 w-full">
          <BiSearch
            className={`cursor-pointer ${
              color === "white" ? "text-black" : "text-white"
            }`}
          />
          <GiHamburgerMenu
            onClick={() => setShowSide(true)}
            className={`text-3xl hover:border rounded-md p-1 cursor-pointer ${
              color === "white" ? "text-black" : "text-white"
            }`}
          />
        </div>

        <SmallSide showSide={showSide} setShowSide={setShowSide} />
        <LargeTop color={color} />
      </div>
    </div>
  );
};

export default NavBar;
