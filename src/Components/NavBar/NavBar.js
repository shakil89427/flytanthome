import React, { useState } from "react";
import Login from "../Login/Login";
import logo from "../../Assets/logo.png";
import defaultUser from "../../Assets/defaultUser.png";
import { FiLogOut } from "react-icons/fi";
import useStore from "../../Store/useStore";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../Toast/Toast";
import useInstaConnect from "../../Hooks/useInstaConnect";
import Logout from "../Logout/Logout";

/* Styles Start */
const styles = {
  main: "px-3 md:px-10 lg:px-14 h-14 md:h-20 flex items-center justify-between",
  logo: "cursor-pointer w-[130px] md:w-[200px]",
  profile: "flex items-center text-white",
  profileImg: "w-9 h-9 md:w-10 md:h-10 rounded-full mr-2",
  btn: "text-xs border border-gray-400 text-gray-300 px-4 rounded-lg md:px-6 py-2 md:py-3 md:text-md text-white duration-150 hover:scale-105 hover:border-white hover:text-white",
};
/* Styles End */

const NavBar = ({ color }) => {
  useInstaConnect();
  const navigate = useNavigate();
  const { user, showLogin, setShowLogin, notify } = useStore();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <div
      style={{ backgroundColor: color ? color : "black" }}
      className={styles.main}
    >
      <img
        onClick={() => navigate("/")}
        className={styles.logo}
        src={logo}
        alt=""
      />
      {user?.userId ? (
        <div className={styles.profile}>
          <Link to="/profile">
            <img
              className={styles.profileImg}
              src={user.profileImageUrl ? user.profileImageUrl : defaultUser}
              alt=""
            />
          </Link>

          <FiLogOut
            onClick={() => setShowLogout(true)}
            className="cursor-pointer"
          />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <a
            href="mailto:contact@flytant.com"
            target="_blank"
            rel="noreferrer"
            className={styles.btn}
          >
            Contact
          </a>
          <button onClick={() => setShowLogin(true)} className={styles.btn}>
            Login | Signup
          </button>
        </div>
      )}
      {showLogin && <Login />}
      {showLogout && <Logout setShowLogout={setShowLogout} />}
      {notify && <Toast />}
    </div>
  );
};

export default NavBar;
