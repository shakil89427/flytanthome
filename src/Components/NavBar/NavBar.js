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
  main: "px-3 md:px-10 lg:px-24 h-20 md:h-28 flex items-center justify-between",
  logo: "cursor-pointer w-[130px] md:w-[200px]",
  profile: "flex items-center text-white",
  profileImg: "w-9 h-9 md:w-10 md:h-10 rounded-full mr-2",
  contactBtn:
    "w-28 h-10 border text-sm font-light border-gray-400 flex items-center justify-center text-white rounded-md duration-150 hover:scale-105 hover:font-semibold hover:border-white hover:border-2",
  loginBtn:
    "bg-white w-36 h-10 border text-sm border-white flex items-center justify-center rounded-md duration-150 hover:scale-105 hover:font-semibold hover:border-2",
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
            style={{ letterSpacing: ".8px" }}
            className={styles.contactBtn}
          >
            Contact
          </a>
          <button
            style={{
              letterSpacing: ".8px",
            }}
            onClick={() => setShowLogin(true)}
            className={styles.loginBtn}
          >
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
