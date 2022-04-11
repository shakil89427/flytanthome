import React, { useEffect } from "react";
import Login from "../Login/Login";
import logo from "../../Assets/websiteLogo.png";
import defaultUserImage from "../../Assets//defaultUserImage.png";
import { FiLogOut } from "react-icons/fi";
import useStore from "../../Store/useStore";
import useLogins from "../../Hooks/useLogins";
import { Link, useLocation } from "react-router-dom";
import Toast from "../Toast/Toast";
import useInstaConnect from "../../Hooks/useInstaConnect";

/* Styles Start */
const styles = {
  main: "bg-[#FF9826] p-5 md:px-10 lg:px-14 flex flex-col gap-3 md:flex-row items-center justify-between",
  profile: "flex items-center gap-3 text-white",
  profileImg: "w-12 h-12 rounded-full mr-2",
  logout: "cursor-pointer text-xl",
  logins: "flex items-center gap-4",
  login:
    "border-2 w-28 px-5 py-1 font-medium text-lg text-white border-white rounded-md",
  signup:
    "border-2 w-28 px-5 py-1 font-medium text-lg bg-white border-white text-[#FF9826] rounded-md",
};
/* Styles End */

const NavBar = () => {
  const getToken = useInstaConnect();
  const { user, showLogin, setShowLogin, notify } = useStore();
  const { signOutUser } = useLogins();
  const location = useLocation();

  useEffect(() => {
    const code = location?.search?.split("code=")[1];
    if (code) getToken(code);
  }, [location]);

  return (
    <div className={styles.main}>
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      {user?.userId ? (
        <div className={styles.profile}>
          <p>{user.username}</p>
          <Link to="/profile">
            <img
              className={styles.profileImg}
              src={
                user.profileImageUrl ? user.profileImageUrl : defaultUserImage
              }
              alt=""
            />
          </Link>

          <FiLogOut onClick={signOutUser} className={styles.logout} />
        </div>
      ) : (
        <div className={styles.logins}>
          <button onClick={() => setShowLogin(true)} className={styles.login}>
            Login
          </button>
          <button onClick={() => setShowLogin(true)} className={styles.signup}>
            Signup
          </button>
        </div>
      )}
      {showLogin && <Login />}
      {notify && <Toast />}
    </div>
  );
};

export default NavBar;
