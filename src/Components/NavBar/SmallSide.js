import React, { useEffect } from "react";
import logoBlack from "../../Assets/logoBlack.png";
import cross from "../../Assets/cross.svg";
import defaultUser from "../../Assets/defaultUser.png";
import mikeBlack from "../../Assets/navBar/mikeBlack.svg";
import mikeWhite from "../../Assets/navBar/mikeWhite.svg";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { SiMinutemailer } from "react-icons/si";
import useStore from "../../Store/useStore";
import { useNavigate } from "react-router-dom";

const styles = {
  area: "fixed top-0 left-0 w-full h-screen z-30 bg-[#07070783]",
  wrapper: "fixed top-0 right-0 w-fit h-screen z-30 duration-300 bg-white",
  head: "h-14 flex items-center justify-between border-b px-5 gap-8",
  userImg: "w-6 h-6 rounded-full bg-cover bg-center bg-no-repeat",
  items: "px-2 flex flex-col gap-3 pt-5 text-md font-medium",
  item: "flex items-center gap-3  h-12 rounded-md px-3 hover:bg-black hover:text-white duration-150 cursor-pointer nav_side_icons",
};

const SmallSide = ({ showSide, setShowSide }) => {
  const navigate = useNavigate();
  const { user, setShowLogin, setShowLogout } = useStore();

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
    <div className="lg:hidden">
      {showSide && (
        <div onClick={() => setShowSide(false)} className={styles.area} />
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
            onClick={() => setShowSide(false)}
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
                navigate("/mycampaigns");
                setShowSide(false);
              }}
              className={styles.item}
            >
              <img className="i1 w-6" src={mikeBlack} alt="" />
              <img className="i2 w-6" src={mikeWhite} alt="" />
              <p>My Campaigns</p>
            </div>
            {/* Create Campaign */}
            <div
              onClick={() => {
                navigate("/createcampaign");
                setShowSide(false);
              }}
              className={styles.item}
            >
              <img className="i1 w-6" src={mikeBlack} alt="" />
              <img className="i2 w-6" src={mikeWhite} alt="" />
              <p>Create Campaign</p>
            </div>

            {/* Subscription */}
            <div
              onClick={() => {
                navigate("/subscription");
                setShowSide(false);
              }}
              className={styles.item}
            >
              <img className="i1 w-6" src={mikeBlack} alt="" />
              <img className="i2 w-6" src={mikeWhite} alt="" />
              <p>Subscription</p>
            </div>

            {/* Logout */}
            <div className="absolute bottom-20 md:bottom-10 w-full left-0">
              <div
                onClick={() => {
                  setShowSide(false);
                  setShowLogout(true);
                }}
                className="flex items-center gap-3 border-0 h-6 justify-center cursor-pointer w-fit  mx-auto"
              >
                <AiOutlineLogout className="text-2xl" />
                <p>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.items}>
            <div
              onClick={() => {
                setShowSide(false);
                setShowLogin(true);
              }}
              className={styles.item}
            >
              <AiOutlineLogin className="text-2xl" />
              <p>Login | Signup</p>
            </div>
            <a
              onClick={() => setShowSide(false)}
              href="mailto:contact@flytant.com"
              target="_blank"
              rel="noreferrer"
              className={styles.item}
            >
              <SiMinutemailer className="text-2xl" />
              <p>Contact</p>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmallSide;
