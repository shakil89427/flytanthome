import React, { useState } from "react";
import useStore from "../../Store/useStore";
import defaultUser from "../../Assets/defaultUser.png";
import { TiArrowSortedDown } from "react-icons/ti";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
/* Styles Start */
const styles = {
  profile: "flex items-center justify-end gap-10 xl:gap-20 text-white gap-10",
  profileImg: "w-9 h-9 md:w-10 md:h-10 rounded-full mr-2",
  contactBtn:
    "w-36 h-12 border-2 text-lg font-medium border-gray-400 flex items-center justify-center text-white rounded-md duration-150 hover:scale-105 hover:border-white hover:border-2",
  loginBtn:
    "bg-white w-48 h-12 text-lg  flex items-center justify-center rounded-md duration-150 hover:scale-105 font-medium",
};
/* Styles End */

const LargeTop = () => {
  const navigate = useNavigate();
  const { user, setShowLogin, setShowLogout } = useStore();
  const [show, setShow] = useState(false);
  return (
    <div className="hidden lg:block w-full">
      {user?.id ? (
        <div className={styles.profile}>
          {/* <div className="hidden lg:flex items-center gap-3 bg-gray-100 w-[50%] py-2 pl-5 rounded-full text-black overflow-hidden">
            <BiSearch />
            <input
              className="bg-gray-100 w-full border-0 outline-none"
              type="text"
              placeholder="Search 'Fashion Influencers'"
            />
          </div> */}
          <a
            href="mailto:contact@flytant.com"
            target="_blank"
            rel="noreferrer"
            className="border-2 border-gray-500 px-7 py-2 rounded-md font-semibold text-black"
          >
            Contact
          </a>
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
            <TiArrowSortedDown
              className={`text-2xl cursor-pointer text-black`}
            />
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
                  <p
                    onClick={() => navigate(`/mycampaigns`)}
                    className="hover:bg-white hover:text-black py-2 my-2 px-3 text-md font-medium rounded-sm cursor-pointer"
                  >
                    My Campaigns
                  </p>
                  <p
                    onClick={() => navigate(`/subscription`)}
                    className="hover:bg-white hover:text-black py-2 my-2 px-3 text-md font-medium rounded-sm cursor-pointer"
                  >
                    Subscription
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
        <div className="flex items-center justify-end gap-6">
          <a
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
