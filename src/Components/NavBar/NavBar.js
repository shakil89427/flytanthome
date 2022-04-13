import React from "react";
import Login from "../Login/Login";
import logo from "../../Assets/websiteLogo.png";
import defaultUserImage from "../../Assets//defaultUserImage.png";
import { FiLogOut } from "react-icons/fi";
import useStore from "../../Store/useStore";
import useLogins from "../../Hooks/useLogins";
import { Link } from "react-router-dom";
import Toast from "../Toast/Toast";
import useInstaConnect from "../../Hooks/useInstaConnect";

/* Styles Start */
const styles = {
  main: "py-5 px-3 md:px-10 lg:px-14 flex items-center justify-between",
  logo: "w-[60%] md:w-full",
  profile: "flex items-center text-white",
  profileImg: "w-8 h-8 md:w-10 md:h-10 rounded-full mr-2",
  login:
    "border-2 px-5 md:px-10 py-1  text-sm md:text-lg text-white border-white rounded-md tracking-wider",
};
/* Styles End */

const NavBar = ({ color }) => {
  useInstaConnect();
  const { user, showLogin, setShowLogin, notify } = useStore();
  const { signOutUser } = useLogins();

  return (
    <div
      style={{ backgroundColor: color ? color : "black" }}
      className={styles.main}
    >
      <Link to="/">
        <img className={styles.logo} src={logo} alt="" />
      </Link>
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

          <FiLogOut onClick={signOutUser} className="cursor-pointer" />
        </div>
      ) : (
        <button onClick={() => setShowLogin(true)} className={styles.login}>
          Login
        </button>
      )}
      {showLogin && <Login />}
      {notify && <Toast />}
    </div>
  );
};

export default NavBar;
