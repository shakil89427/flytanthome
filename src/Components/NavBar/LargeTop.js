import React, { useState } from "react";
import useStore from "../../Store/useStore";
import defaultUser from "../../Assets/defaultUser.png";
import mike from "../../Assets/navBar/mikeBlack.svg";
import { TiArrowSortedDown } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
/* Styles Start */
const styles = {
  profile: "flex items-center text-white gap-10",
  profileImg: "w-9 h-9 md:w-10 md:h-10 rounded-full mr-2",
  contactBtn:
    "w-40 h-12 border-2 text-xl font-medium border-gray-400 flex items-center justify-center text-white rounded-md duration-150 hover:scale-105 hover:border-white hover:border-2",
  loginBtn:
    "bg-white w-52 h-12 border text-xl border-white flex items-center justify-center rounded-md duration-150 hover:scale-105 font-medium hover:border-2",
};
/* Styles End */

const LargeTop = () => {
  const navigate = useNavigate();
  const { user, setShowLogin, setShowLogout } = useStore();
  const [show, setShow] = useState(false);
  return (
    <div className="hidden lg:block ml-auto">
      {user?.id ? (
        <div className={styles.profile}>
          <div
            onClick={() => navigate("/createcampaign")}
            className="bg-white flex items-center text-black h-12 px-5 rounded-3xl gap-2 cursor-pointer"
          >
            <img src={mike} alt="" />
            <p className="font-medium">Create Campaign</p>
          </div>
          <div
            onClick={() => setShow(!show)}
            className="flex items-center gap-1 relative"
          >
            <div
              style={{
                backgroundImage: `url(${
                  user?.profileImageUrl &&
                  !user?.profileImageUrl?.toLowerCase().includes("default") &&
                  user?.profileImageUrl !== ""
                    ? user?.profileImageUrl
                    : defaultUser
                })`,
              }}
              className="w-12 h-12 rounded-full bg-cover bg-no-repeat bg-center cursor-pointer"
            />
            <TiArrowSortedDown className="text-2xl cursor-pointer" />
            {show && (
              <>
                <div className="fixed top-0 left-0 w-screen h-screen z-40" />
                <div className="absolute top-full right-0 bg-gray-800 w-[220px] p-2 rounded-md z-50">
                  <p
                    onClick={() => navigate(`/profile/${user?.id}`)}
                    className="hover:bg-white hover:text-black py-2 my-2 px-3 text-md font-medium rounded-sm cursor-pointer"
                  >
                    Social Profile
                  </p>
                  <p className="hover:bg-white hover:text-black py-2 my-2 px-3 text-md font-medium rounded-sm cursor-pointer">
                    My Campaigns
                  </p>
                  <p
                    onClick={() => setShowLogout(true)}
                    className="hover:bg-white hover:text-black py-2 my-2 px-3 text-md font-medium rounded-sm cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </>
            )}
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
