import React from "react";
import { FcGoogle } from "react-icons/fc";
import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillApple,
  AiFillAndroid,
} from "react-icons/ai";
import { IoKeypadSharp } from "react-icons/io5";
import useLogins from "../../Hooks/useLogins";

/* Styles Start */
const styles = {
  heading: "text-3xl font-bold text-center",
  info: "font-semibold mt-2 text-center",
  loginButtons:
    "py-8 flex flex-col items-center gap-5 border-b border-[#979797]",
  loginButton:
    "flex items-center gap-4 px-5 w-72 py-3 rounded-3xl shadow-lg cursor-pointer text-white",
  downButtons: "my-7 flex items-center gap-5 justify-center",
  downButton:
    "flex items-center pl-3 py-1 gap-2 bg-black text-white w-40 rounded-lg cursor-pointer",
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
          className={`${styles.loginButton} text-black border`}
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

        <p>or</p>

        {/* Phone */}
        <div
          onClick={() => setShow("sendOTP")}
          className={`${styles.loginButton} bg-black`}
        >
          <IoKeypadSharp className="text-xl" />
          <p>Continue with Phone</p>
        </div>
      </div>

      {/* Download Buttons */}
      <div className={styles.downButtons}>
        <a
          href="https://firebasestorage.googleapis.com/v0/b/flytant-app.appspot.com/o/androidApp%2FFlytant1.0.2%2FUpdated%2FFlytant.apk?alt=media&token=cc06343b-0789-40a7-99e7-aafbc948b00e"
          target="_blank"
          rel="noreferrer"
          className={styles.downButton}
        >
          <AiFillAndroid className="text-2xl" />
          <span>
            <p className="text-xs">Download our</p>
            <p className="text-sm">Android App</p>
          </span>
        </a>
        <a
          href="https://apps.apple.com/in/app/flytant/id1530158515"
          target="_blank"
          rel="noreferrer"
          className={styles.downButton}
        >
          <AiFillApple className="text-2xl" />
          <span>
            <p className="text-xs">Download on the</p>
            <p className="text-sm">App Store</p>
          </span>
        </a>
      </div>
    </div>
  );
};

export default Methods;
