import React, { useEffect } from "react";
import logoBlack from "../../Assets/logoBlack.png";
import cross from "../../Assets/cross.svg";
import defaultUser from "../../Assets/defaultUser.png";
import useStore from "../../Store/useStore";
import { useNavigate } from "react-router-dom";
import mikewhite from "../../Assets/navBar/mikeWhite.svg";
import campaignBlack from "../../Assets/navBar/campaignBlack.png";
import campaignWhite from "../../Assets/navBar/campaignWhite.png";
import subscriptionBlack from "../../Assets/navBar/subscriptionBlack.png";
import subscriptionWhite from "../../Assets/navBar/subscriptionWhite.png";
import contactBlack from "../../Assets/navBar/contactBlack.png";
import contactWhite from "../../Assets/navBar/contactWhite.png";
import logoutBlack from "../../Assets/navBar/logoutBlack.png";
import orderWhite from "../../Assets/navBar/orderWhite.png";
import orderBlack from "../../Assets/navBar/orderBlack.png";
import useAnalytics from "../../Hooks/useAnalytics";

const styles = {
  area: "fixed top-0 left-0 w-full h-screen z-30 bg-[#07070783]",
  wrapper: "fixed top-0 right-0 w-fit h-screen z-30 duration-300 bg-white",
  head: "h-14 flex items-center justify-between border-b px-5 gap-8",
  userImg: "w-[25px] h-[25px] rounded-full bg-cover bg-center bg-no-repeat",
  items: "px-2 flex flex-col gap-3 pt-5 text-md font-medium",
  item: "flex items-center gap-3  h-12 rounded-md px-3 hover:bg-black hover:text-white duration-150 cursor-pointer navsideicons",
};

const SmallSide = ({ showSide, setShowSide }) => {
  const navigate = useNavigate();
  const { user, setShowLogin, setShowLogout } = useStore();
  const { addLog } = useAnalytics();

  useEffect(() => {
    if (showSide) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showSide]);
  return (
    <div className="lg:hidden z-[999]">
      {showSide && (
        <div
          onClick={() => {
            addLog("hide_hamburger");
            setShowSide(false);
          }}
          className={styles.area}
        />
      )}
      <div
        style={{
          transform: `translateX(${showSide ? 0 : "100%"})`,
        }}
        className={styles.wrapper}
      >
        {/* Logo+Cross */}
        <div className={styles.head}>
          <img className="w-[130px]" src={logoBlack} alt="" />
          <img
            onClick={() => {
              addLog("hide_hamburger");
              setShowSide(false);
            }}
            className="cursor-pointer"
            src={cross}
            alt=""
          />
        </div>

        {user?.id ? (
          <div className={styles.items}>
            {/* Profile */}
            <div
              onClick={() => {
                addLog("social_profile");
                navigate(`/profile/${user?.id}`);
                setShowSide(false);
              }}
              className={styles.item}
            >
              <div
                style={{
                  backgroundImage: `url(${
                    user?.profileImageUrl &&
                    !user?.profileImageUrl.toLowerCase()?.includes("default") &&
                    user?.profileImageUrl !== ""
                      ? user?.profileImageUrl
                      : defaultUser
                  })`,
                }}
                className={styles.userImg}
              />
              <p>Social Profile</p>
            </div>

            {/* My Campaign */}
            <div
              onClick={() => {
                addLog("my_campaigns");
                navigate("/mycampaigns");
                setShowSide(false);
              }}
              className={styles.item}
            >
              <img src={campaignBlack} alt="" className="i1" />
              <img src={campaignWhite} alt="" className="i2" />
              <p>My Campaigns</p>
            </div>

            {/* My Orders */}
            <div
              onClick={() => {
                addLog("my_orders");
                navigate("/myorders");
                setShowSide(false);
              }}
              className={styles.item}
            >
              <img src={orderBlack} alt="" className="i1" />
              <img src={orderWhite} alt="" className="i2" />
              <p>My Orders</p>
            </div>

            {/* Subscription */}
            <div
              onClick={() => {
                addLog("subscription");
                navigate("/subscription");
                setShowSide(false);
              }}
              className={styles.item}
            >
              <img src={subscriptionBlack} alt="" className="i1" />
              <img src={subscriptionWhite} alt="" className="i2" />
              <p>Subscription</p>
            </div>

            {/* Create Campaign */}
            <div
              onClick={() => {
                addLog("create_campaign");
                navigate("/createcampaign");
                setShowSide(false);
              }}
              className="bg-black text-md text-white flex items-center gap-3 px-4 h-12 rounded-full mt-10 hover:scale-105 duration-150 cursor-pointer"
            >
              <img className="w-6" src={mikewhite} alt="" />
              <p>Create Campaign</p>
            </div>

            {/* Logout */}
            <div
              onClick={() => {
                addLog("show_logout_popup");
                setShowSide(false);
                setShowLogout(true);
              }}
              className="flex items-center w-fit px-10 gap-3 justify-center cursor-pointer h-10  mx-auto border-2 border-gray-100 rounded-full font-medium hover:bg-gray-100 mt-5"
            >
              <img src={logoutBlack} alt="" className="w-[25px]" />
              <p>Logout</p>
            </div>
          </div>
        ) : (
          <div className={styles.items}>
            <div
              onClick={() => {
                addLog("show_login_popup");
                setShowSide(false);
                setShowLogin(true);
              }}
              className={styles.item}
            >
              <img src={defaultUser} alt="" className="w-[25px]" />
              <p>Login | Signup</p>
            </div>
            <a
              onClick={() => {
                addLog("contact");
                setShowSide(false);
              }}
              href="mailto:contact@flytant.com"
              target="_blank"
              rel="noreferrer"
              className={styles.item}
            >
              <img src={contactBlack} alt="" className="i1" />
              <img src={contactWhite} alt="" className="i2" />
              <p>Contact</p>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmallSide;
