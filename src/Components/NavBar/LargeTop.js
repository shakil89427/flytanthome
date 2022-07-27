import React, { useState } from "react";
import useStore from "../../Store/useStore";
import defaultUser from "../../Assets/defaultUser.png";
import { TiArrowSortedDown } from "react-icons/ti";
import { BiSearch } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import useAnalytics from "../../Hooks/useAnalytics";
/* Styles Start */
const styles = {
  profile: "flex items-center justify-end gap-10 text-white",
  profileImg: "w-9 h-9 md:w-10 md:h-10 rounded-full mr-2",
  contactBtn:
    "w-36 h-12 border-2 text-lg font-medium border-gray-400 flex items-center justify-center text-white rounded-md duration-150 hover:scale-105 hover:border-white hover:border-2",
  loginBtn:
    "bg-white w-48 h-12 text-lg  flex items-center justify-center rounded-md duration-150 hover:scale-105 font-medium",
};
/* Styles End */

const LargeTop = ({ theme }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setShowLogin, setShowLogout } = useStore();
  const [show, setShow] = useState(false);
  const { addLog } = useAnalytics();
  return (
    <div className="hidden lg:block w-full">
      {user?.id ? (
        <div className={styles.profile}>
          <div
            onClick={() => navigate("/search")}
            className={`hidden lg:flex items-center gap-3 bg-gray-100 w-[50%] py-2 pl-5 rounded-full text-black overflow-hidden cursor-pointer mr-14 ${
              pathname === "/search" ? "invisible" : "visible"
            }`}
          >
            <BiSearch />
            <input
              className="bg-gray-100 w-full border-0 outline-none"
              type="text"
              placeholder="Search 'Fashion Influencers' or 'Brand name'"
              readOnly
            />
          </div>
          <a
            onClick={() => addLog("nav_contact")}
            href="mailto:contact@flytant.com"
            target="_blank"
            rel="noreferrer"
            className={`border-2 border-gray-500 px-7 py-2 rounded-md font-semibold ${theme.text}`}
          >
            Contact
          </a>
          <div
            onClick={() => {
              addLog("profile_dropdown");
              setShow(!show);
            }}
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
            <TiArrowSortedDown
              className={`text-2xl cursor-pointer ${theme.text}`}
            />
            {show && (
              <>
                <div className="fixed top-0 left-0 w-screen h-screen z-[999999]" />
                <div className="absolute top-full right-0 bg-gray-800 w-[220px] p-2 rounded-md z-[9999999]">
                  <p
                    onClick={() => {
                      addLog("social_profile");
                      navigate(`/profile/${user?.id}`);
                    }}
                    className="hover:bg-white hover:text-black py-2 my-2 px-3 text-md font-medium rounded-sm cursor-pointer"
                  >
                    Social Profile
                  </p>
                  <p
                    onClick={() => {
                      addLog("my_campaigns");
                      navigate(`/mycampaigns`);
                    }}
                    className="hover:bg-white hover:text-black py-2 my-2 px-3 text-md font-medium rounded-sm cursor-pointer"
                  >
                    My Campaigns
                  </p>
                  <p
                    onClick={() => {
                      addLog("subscription");
                      navigate(`/subscription`);
                    }}
                    className="hover:bg-white hover:text-black py-2 my-2 px-3 text-md font-medium rounded-sm cursor-pointer"
                  >
                    Subscription
                  </p>
                  <p
                    onClick={() => {
                      addLog("show_logout_popup");
                      setShowLogout(true);
                    }}
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
        pathname !== "/onboard" && (
          <div className="flex items-center justify-end gap-6">
            <a
              onClick={() => addLog("nav_contact")}
              href="mailto:contact@flytant.com"
              target="_blank"
              rel="noreferrer"
              style={{ letterSpacing: ".4px" }}
              className={styles.contactBtn}
            >
              Contact
            </a>
            <button
              style={{
                letterSpacing: ".4px",
              }}
              onClick={() => {
                addLog("login_signup");
                setShowLogin(true);
              }}
              className={styles.loginBtn}
            >
              Login | Signup
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default LargeTop;
