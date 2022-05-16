import React from "react";
import useStore from "../../Store/useStore";
import defaultUser from "../../Assets/defaultUser.png";
import mike from "../../Assets/navBar/mikeBlack.svg";
import bell from "../../Assets/navBar/bellWhite.svg";
import fly from "../../Assets/navBar/flyWhite.svg";
import { TiArrowSortedDown } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
/* Styles Start */
const styles = {
  profile: "flex items-center text-white gap-10",
  profileImg: "w-9 h-9 md:w-10 md:h-10 rounded-full mr-2",
  contactBtn:
    "w-28 h-10 border text-sm font-semibold border-gray-400 flex items-center justify-center text-white rounded-md duration-150 hover:scale-105 hover:border-white hover:border-2",
  loginBtn:
    "bg-white w-36 h-10 border text-sm border-white flex items-center justify-center rounded-md duration-150 hover:scale-105 font-semibold hover:border-2",
};
/* Styles End */

const LargeTop = () => {
  const navigate = useNavigate();
  const { user, setShowLogin, setShowLogout } = useStore();
  return (
    <div className="hidden lg:block ml-auto">
      {user?.id ? (
        <div className={styles.profile}>
          <div
            onClick={() => navigate("/createcampaign")}
            className="bg-white flex items-center text-black h-12 px-5 rounded-3xl gap-2 cursor-pointer"
          >
            <img src={mike} alt="" />
            <p>Create Campaign</p>
          </div>
          <div className="bg-[#5F5F5F] h-12 w-12 rounded-full flex items-center justify-center cursor-pointer">
            <img src={bell} alt="" />
          </div>
          <img className="cursor-pointer" src={fly} alt="" />
          <div className="flex items-center gap-1">
            <div
              onClick={() => navigate(`/profile/${user?.id}`)}
              style={{
                backgroundImage: `url(${
                  user?.profileImageUrl ? user?.profileImageUrl : defaultUser
                })`,
              }}
              className="w-12 h-12 rounded-full bg-cover bg-no-repeat bg-center cursor-pointer"
            />
            <TiArrowSortedDown
              onClick={() => setShowLogout(true)}
              className="text-2xl cursor-pointer"
            />
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
