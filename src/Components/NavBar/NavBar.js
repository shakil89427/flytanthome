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
import { GiHamburgerMenu } from "react-icons/gi";

/* Styles Start */
const styles = {
  main: "r-box h-14 md:h-24 flex items-center justify-between",
  logo: "cursor-pointer w-[130px] md:w-[200px]",
  profile: "flex items-center text-white",
  profileImg: "w-9 h-9 md:w-10 md:h-10 rounded-full mr-2",
  contactBtn:
    "w-28 h-10 border text-sm font-semibold border-gray-400 flex items-center justify-center text-white rounded-md duration-150 hover:scale-105 hover:border-white hover:border-2",
  loginBtn:
    "bg-white w-36 h-10 border text-sm border-white flex items-center justify-center rounded-md duration-150 hover:scale-105 font-semibold hover:border-2",
};
/* Styles End */

const NavBar = ({ color }) => {
  useInstaConnect();
  const navigate = useNavigate();
  const { user, showLogin, setShowLogin, notify } = useStore();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <div style={{ backgroundColor: color ? color : "black" }}>
      <div className={styles.main}>
        <img
          onClick={() => navigate("/")}
          className={styles.logo}
          src={logo}
          alt=""
        />
        <GiHamburgerMenu className="md:hidden text-white text-3xl hover:border rounded-md p-1 cursor-pointer" />
        <div className="hidden md:block ">
          {user?.userId ? (
            <div className={styles.profile}>
              <Link to="/profile">
                <img
                  className={styles.profileImg}
                  src={
                    user.profileImageUrl ? user.profileImageUrl : defaultUser
                  }
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
        </div>
        {showLogin && <Login />}
        {showLogout && <Logout setShowLogout={setShowLogout} />}
        {notify && <Toast />}
      </div>
    </div>
  );
};

export default NavBar;
