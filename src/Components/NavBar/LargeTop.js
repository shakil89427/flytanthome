import React from "react";
import useStore from "../../Store/useStore";
import mike from "../../Assets/navBar/mike.png";
import bell from "../../Assets/navBar/bell.png";
import flyArrow from "../../Assets/navBar/flyArrow.png";
import polygon from "../../Assets/navBar/polygon.png";
/* Styles Start */
const styles = {
  profile: "flex items-center text-white gap-12",
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
          <div className="bg-white flex items-center text-black h-12 px-5 rounded-3xl gap-2 cursor-pointer">
            <img src={mike} alt="" />
            <p>Create Campaign</p>
          </div>
          <div className="flex items-center gap-2">
            <img
              className="w-12 h-12 p-2 rounded-full bg-[#5F5F5F] cursor-pointer"
              src={bell}
              alt=""
            />
            <img className="w-12 h-12 cursor-pointer" src={flyArrow} alt="" />
          </div>
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundImage: `url(${user?.profileImageUrl})` }}
              className="w-12 h-12 rounded-full bg-cover bg-no-repeat bg-center"
            />
            <img className="w-3 h-2 cursor-pointer" src={polygon} alt="" />
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
