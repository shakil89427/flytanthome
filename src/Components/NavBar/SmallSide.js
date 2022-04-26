import React from "react";
import logoBlack from "../../Assets/logoBlack.png";
import cross from "../../Assets/cross.svg";
import { FiSend } from "react-icons/fi";
import { AiOutlineBell } from "react-icons/ai";
import { FaBullhorn } from "react-icons/fa";
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
  item: "flex items-center gap-3  h-12 rounded-md px-3 hover:bg-black hover:text-white duration-150 cursor-pointer",
};

const SmallSide = ({ showSide, setShowSide, setShowLogout }) => {
  const navigate = useNavigate();
  const { user, setShowLogin } = useStore();
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

        {user?.userId ? (
          <div className={styles.items}>
            {/* Profile */}
            <div
              onClick={() => {
                navigate("/profile");
                setShowSide(false);
              }}
              className={styles.item}
            >
              <div
                style={{ backgroundImage: `url(${user?.profileImageUrl})` }}
                className={styles.userImg}
              />
              <p>Profile</p>
            </div>

            {/* Notifications */}
            <div className={styles.item}>
              <AiOutlineBell className="text-2xl" />
              <p>Notifications</p>
            </div>

            {/* Messages */}
            <div className={styles.item}>
              <FiSend className="text-xl" />
              <p>Message</p>
            </div>

            {/* Create Campaign */}
            <div className={styles.item}>
              <FaBullhorn className="text-xl -rotate-45" />
              <p>Create Campaign</p>
            </div>

            {/* Logout */}
            <div
              onClick={() => {
                setShowSide(false);
                setShowLogout(true);
              }}
              className={styles.item}
            >
              <AiOutlineLogout className="text-xl" />
              <p>Logout</p>
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
