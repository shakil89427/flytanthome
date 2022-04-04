import React from "react";
import logo from "../Assets/Group 192 4.png";
import { FaBullhorn } from "react-icons/fa";
import { BiBell } from "react-icons/bi";
import { RiMessage2Line } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { navStyles } from "../Styles/NavStyles";

const NavBar = () => {
  return (
    <div className={navStyles.main}>
      <img src={logo} alt="" />
      <div className={navStyles.mainContents}>
        <span className={navStyles.campaign}>
          <FaBullhorn />
          <p>Create Campaign</p>
        </span>
        <span className={navStyles.icons}>
          <BiBell />
          <RiMessage2Line />
        </span>
        <span className={navStyles.profile}>
          <img
            className={navStyles.profileImg}
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            alt=""
          />
          <span className={navStyles.name}>
            <p>Justin Emma</p>
            <TiArrowSortedDown className="text-2xl" />
          </span>
        </span>
      </div>
    </div>
  );
};

export default NavBar;
