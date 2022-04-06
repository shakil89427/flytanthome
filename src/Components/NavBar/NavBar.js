import React, { useEffect, useState } from "react";
import Login from "../Login/Login";
import logo from "../../Assets/Group 192 4.png";
import { FiLogOut } from "react-icons/fi";
import useStore from "../../Store/useStore";
import useLogins from "../../Firebase/useLogins";

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

const randomImage =
  "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png";

const NavBar = () => {
  const { user } = useStore();
  const { signOutUser } = useLogins();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      setShowLogin(false);
    }
  }, [user]);

  return (
    <div className={styles.main}>
      <img src={logo} alt="" />
      {user?.uid ? (
        <div className={styles.profile}>
          <p>{user?.displayName ? user.displayName : "Flytant User"}</p>
          <img
            className={styles.profileImg}
            src={user?.photoURL ? user?.photoURL : randomImage}
            alt=""
          />
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
      {showLogin && <Login setShowLogin={setShowLogin} />}
    </div>
  );
};

export default NavBar;