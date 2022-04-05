import React from "react";
import logo from "../../Assets/Group 192 4.png";
// import { FaBullhorn } from "react-icons/fa";
// import { BiBell } from "react-icons/bi";
// import { RiMessage2Line } from "react-icons/ri";
// import { TiArrowSortedDown } from "react-icons/ti";

/* Styles Start */
const styles = {
  main: "bg-[#FF9826] p-5 md:px-10 lg:px-14 flex items-center justify-between",
  mainContents: "flex items-center gap-4",
  login:
    "border-2 w-28 px-5 py-1 font-medium text-lg text-white border-white rounded-md",
  signup:
    "border-2 w-28 px-5 py-1 font-medium text-lg bg-white border-white text-[#FF9826] rounded-md",
};
/* Styles End */

const NavBar = () => {
  return (
    <div className={styles.main}>
      <img src={logo} alt="" />
      <div className={styles.mainContents}>
        <button className={styles.login}>Login</button>
        <button className={styles.signup}>Signup</button>
      </div>
    </div>
  );
};

export default NavBar;
