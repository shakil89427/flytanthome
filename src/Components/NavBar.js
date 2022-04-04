import React from "react";
import logo from "../Assets/Group 192 4.png";
import { FaBullhorn } from "react-icons/fa";
import { BiBell } from "react-icons/bi";
import { RiMessage2Line } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";

/* Styles Start */
const styles = {
  main: "bg-[#FF9826] p-5 md:px-10 lg:px-14 flex items-center justify-between",
  mainContents: "hidden lg:flex items-center gap-7",
  campaign:
    "flex items-center gap-3 bg-black text-white py-3 px-4 rounded-3xl text-sm font-semibold cursor-pointer",
  icons: "flex items-center text-white gap-3 text-2xl",
  profile: "flex items-center gap-2",
  profileImg: "w-10 h-10 rounded-full",
  name: "flex items-center gap-1 text-white font-semibold",
};
/* Styles End */

const NavBar = () => {
  return (
    <div className={styles.main}>
      <img src={logo} alt="" />
      <div className={styles.mainContents}>
        <span className={styles.campaign}>
          <FaBullhorn />
          <p>Create Campaign</p>
        </span>
        <span className={styles.icons}>
          <BiBell />
          <RiMessage2Line />
        </span>
        <span className={styles.profile}>
          <img
            className={styles.profileImg}
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            alt=""
          />
          <span className={styles.name}>
            <p>Justin Emma</p>
            <TiArrowSortedDown className="text-2xl" />
          </span>
        </span>
      </div>
    </div>
  );
};

export default NavBar;
