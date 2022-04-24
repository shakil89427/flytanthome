import React from "react";
import { Link } from "react-router-dom";
import useStore from "../../Store/useStore";
import defaultUser from "../../Assets/defaultUser.png";
import { FiLogOut } from "react-icons/fi";

/* Styles Start */
const styles = {
  profile: "flex items-center text-white",
  profileImg: "w-9 h-9 md:w-10 md:h-10 rounded-full mr-2",
  contactBtn:
    "w-28 h-10 border text-sm font-semibold border-gray-400 flex items-center justify-center text-white rounded-md duration-150 hover:scale-105 hover:border-white hover:border-2",
  loginBtn:
    "bg-white w-36 h-10 border text-sm border-white flex items-center justify-center rounded-md duration-150 hover:scale-105 font-semibold hover:border-2",
};
/* Styles End */

const LargeTop = ({ setShowLogout }) => {
  const { user, setShowLogin } = useStore();
  return (
    <div className="hidden lg:block ml-auto">
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
    </div>
  );
};

export default LargeTop;
