import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <div className="h-14 md:h-24 flex items-center justify-between r-box">
      <img
        onClick={() => navigate("/")}
        className="cursor-pointer w-[130px] md:w-[185px]"
        src={logo}
        alt=""
      />
      <button
        onClick={() => navigate("/products")}
        className="bg-white text-black w-fit px-5 py-2 font-semibold text-lg rounded-full cursor-pointer select-none hover:scale-105 duration-150"
      >
        Get Card Now
      </button>
    </div>
  );
};

export default Nav;
