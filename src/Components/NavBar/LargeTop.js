import React from "react";
import useStore from "../../Store/useStore";
import { FiSend } from "react-icons/fi";
import { AiOutlineBell } from "react-icons/ai";
import { FaBullhorn } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
/* Styles Start */
const styles = {
  profile: "flex items-center text-white gap-14",
  profileImg: "w-9 h-9 md:w-10 md:h-10 rounded-full mr-2",
  contactBtn:
    "w-28 h-10 border text-sm font-semibold border-gray-400 flex items-center justify-center text-white rounded-md duration-150 hover:scale-105 hover:border-white hover:border-2",
  loginBtn:
    "bg-white w-36 h-10 border text-sm border-white flex items-center justify-center rounded-md duration-150 hover:scale-105 font-semibold hover:border-2",
};
/* Styles End */

const LargeTop = ({ setShowLogout }) => {
  const { user, setShowLogin } = useStore();
  console.log(user);
  return (
    <div className="hidden lg:block ml-auto">
      {user?.userId ? (
        <div className={styles.profile}>
          <div className="bg-white flex items-center text-black h-12 px-5 rounded-3xl gap-2 cursor-pointer">
            <FaBullhorn className="-rotate-45" />
            <p>Create Campaign</p>
          </div>
          <div className="flex items-center gap-5">
            <AiOutlineBell className="text-5xl bg-[#5F5F5F] p-3 rounded-full cursor-pointer" />
            <FiSend className="text-3xl cursor-pointer" />
          </div>
          <div className="flex items-center gap-1">
            <div
              style={{ backgroundImage: `url(${user?.profileImageUrl})` }}
              className="w-12 h-12 rounded-full bg-cover bg-no-repeat bg-center"
            />
            <TiArrowSortedDown className="text-2xl cursor-pointer" />
          </div>
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
