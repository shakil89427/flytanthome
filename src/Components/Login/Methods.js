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

const Methods = ({ showInput }) => {
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
        <div onClick={showInput} className={`${styles.loginButton} bg-black`}>
          <IoKeypadSharp className="text-xl" />
          <p>Continue with Phone</p>
        </div>
      </div>

      {/* Download Buttons */}
      <div className={styles.downButtons}>
        <div className={styles.downButton}>
          <AiFillAndroid className="text-2xl" />
          <span>
            <p className="text-xs">Download our</p>
            <p className="text-sm">Android App</p>
          </span>
        </div>
        <div className={styles.downButton}>
          <AiFillApple className="text-2xl" />
          <span>
            <p className="text-xs">Download our</p>
            <p className="text-sm">Android App</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Methods;
