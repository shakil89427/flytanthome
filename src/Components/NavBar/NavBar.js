import React, { useState } from "react";
import Login from "../Login/Login";
import logo from "../../Assets/Group 192 4.png";

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
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className={styles.main}>
      <img src={logo} alt="" />
      <div className={styles.mainContents}>
        <button onClick={() => setShowLogin(true)} className={styles.login}>
          Login
        </button>
        <button onClick={() => setShowLogin(true)} className={styles.signup}>
          Signup
        </button>
      </div>
      {showLogin && <Login setShowLogin={setShowLogin} />}
    </div>
  );
};

export default NavBar;
