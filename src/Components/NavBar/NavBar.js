import React, { useState } from "react";
import logoBlack from "../../Assets/logoBlack.png";
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSearch } from "react-icons/bi";
import LargeTop from "./LargeTop";
import SmallSide from "./SmallSide";
import useStore from "../../Store/useStore";

const NavBar = ({ bg, border }) => {
  const { user } = useStore();
  const navigate = useNavigate();
  const [showSide, setShowSide] = useState(false);

  return (
    <div className={bg ? "bg-transparent" : "bg-black"}>
      <div
        className={`h-14 md:h-20 r-box flex items-center justify-between ${
          border ? "border-b" : "border-0"
        }  r-box`}
      >
        {border ? (
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
          {user?.userId && <BiSearch className="cursor-pointer text-black" />}
          <GiHamburgerMenu
            onClick={() => setShowSide(true)}
            className={`text-3xl hover:border rounded-md p-1 cursor-pointer ${
              border ? "text-black" : "text-white"
            }`}
          />
        </div>

        <SmallSide showSide={showSide} setShowSide={setShowSide} />
        <LargeTop border={border} />
      </div>
    </div>
  );
};

export default NavBar;
