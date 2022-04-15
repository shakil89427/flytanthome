import React, { useState } from "react";
import Login from "../Login/Login";
import logo from "../../Assets/websiteLogo.png";
import defaultUserImage from "../../Assets//defaultUserImage.png";
import { FiLogOut } from "react-icons/fi";
import useStore from "../../Store/useStore";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../Toast/Toast";
import useInstaConnect from "../../Hooks/useInstaConnect";
import Logout from "../Logout/Logout";

/* Styles Start */
const styles = {
  main: "py-5 px-3 md:px-10 lg:px-14 flex items-center justify-between",
  logo: "cursor-pointer max-w-[200px] md:max-w-[250px]",
  profile: "flex items-center text-white",
  profileImg: "w-9 h-9 md:w-10 md:h-10 rounded-full mr-2",
  login:
    "border-2 px-5 md:px-10 py-1  text-sm md:text-lg text-white border-white rounded-md tracking-wider",
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
              src={
                user.profileImageUrl ? user.profileImageUrl : defaultUserImage
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
        <button onClick={() => setShowLogin(true)} className={styles.login}>
          Login
        </button>
      )}
      {showLogin && <Login />}
      {showLogout && <Logout setShowLogout={setShowLogout} />}
      {notify && <Toast />}
    </div>
  );
};

export default NavBar;
