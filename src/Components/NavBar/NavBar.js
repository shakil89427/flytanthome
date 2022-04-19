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
  main: "py-8 px-3 md:px-10 lg:px-14 flex items-center justify-between",
  logo: "cursor-pointer w-[120px] md:w-[150px] lg:w-[200px]",
  profile: "flex items-center text-white",
  profileImg: "w-9 h-9 md:w-10 md:h-10 rounded-full mr-2",
  login:
    "font-medium border-2 px-5 py-1 text-sm md:text-md text-white border-white rounded-md",
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
        <div className="flex gap-5">
          <a
            href="mailto:contact@flytant.com"
            target="_blank"
            rel="noreferrer"
            className={styles.login}
          >
            Contact
          </a>
          <button
            onClick={() => setShowLogin(true)}
            className={`${styles.login} bg-white text-black`}
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
