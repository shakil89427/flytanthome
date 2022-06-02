import React from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook, AiOutlineTwitter, AiFillApple } from "react-icons/ai";
import { IoKeypadSharp } from "react-icons/io5";
import useLogins from "../../Hooks/useLogins";
import playstoreWhite from "../../Assets/playstoreWhite.png";

/* Styles Start */
const styles = {
  heading: "text-3xl font-bold text-center",
  info: "font-semibold mt-2 text-center",
  loginButtons:
    "py-8 flex flex-col items-center gap-5 border-b border-[#979797]",
  loginButton:
    "flex items-center font-medium gap-3 px-5 w-72 py-3 rounded-3xl  cursor-pointer text-white",
  downButtons:
    "my-4 md:my-7 flex items-center flex-wrap gap-3 md:gap-5 justify-center",
  downButton:
    "flex items-center pl-3 h-12 gap-2 bg-black text-white w-40 rounded-md cursor-pointer",
};
/* Styles End */

const Methods = ({ setShow }) => {
  const { googleSignIn, facebookSignIn, twitterSignIn, appleSignIn } =
    useLogins();
  return (
    <div className="w-full">
      <h1 className={styles.heading}>Welcome</h1>
      <p className={styles.info}>Login | Sign Up</p>
      <div className={styles.loginButtons}>
        {/* Google */}
        <div
          onClick={googleSignIn}
          className={`${styles.loginButton} text-black border-2`}
        >
          <FcGoogle className="text-2xl" />
          <p>Continue with Google</p>
        </div>

        {/* Facebook */}
        <div
          onClick={facebookSignIn}
          className={`${styles.loginButton} bg-[#1D4CB3]`}
        >
          <AiFillFacebook className="text-2xl" />
          <p>Continue with Facebook</p>
        </div>

        {/* Twitter */}
        <div
          onClick={twitterSignIn}
          className={`${styles.loginButton} bg-[#55ACEE]`}
        >
          <AiOutlineTwitter className="text-2xl" />
          <p>Continue with Twitter</p>
        </div>

        {/* Apple */}
        <div onClick={appleSignIn} className={`${styles.loginButton} bg-black`}>
          <AiFillApple className="text-2xl" />
          <p>Continue with Apple</p>
        </div>

        <p className="font-semibold">or</p>

        {/* Phone */}
        <div
          onClick={() => setShow("sendOTP")}
          className={`${styles.loginButton} bg-white text-black border-2 border-black`}
        >
          <IoKeypadSharp className="text-xl " />
          <p>Continue with Phone</p>
        </div>
      </div>

      {/* Download Buttons */}
      <div className={styles.downButtons}>
        <a
          href="https://play.google.com/store/apps/details?id=influencer.marketing.flytant"
          target="_blank"
          rel="noreferrer"
          className={styles.downButton}
        >
          <img className="w-6 ml-1" src={playstoreWhite} alt="" />
          <span>
            <p className="text-xs">GET IT ON</p>
            <p className="text-md leading-none mb-1">Play Store</p>
          </span>
        </a>
        <a
          href="https://apps.apple.com/in/app/flytant/id1530158515"
          target="_blank"
          rel="noreferrer"
          className={styles.downButton}
        >
          <AiFillApple className="text-3xl" />
          <span>
            <p className="text-[10px]">DOWNLOAD ON THE</p>
            <p className="text-md leading-none mb-1">App Store</p>
          </span>
        </a>
      </div>
    </div>
  );
};

export default Methods;
