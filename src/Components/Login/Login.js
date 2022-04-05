import React from "react";
import { FcGoogle } from "react-icons/fc";
import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillApple,
  AiFillAndroid,
} from "react-icons/ai";
import { IoKeypadSharp } from "react-icons/io5";
import { GiTireIronCross } from "react-icons/gi";
import useLogins from "../../Firebase/useLogins";

/* Styles Start */
const styles = {
  main: "fixed top-0 left-0 w-full min-h-screen z-20 flex items-center justify-center bg-[#07070783]",
  wrapper:
    "bg-white p-5 md:p-8 rounded-lg flex flex-col items-center w-[400px] md:w-[500px] lg:w-[550px] relative",
  exit: "text-xl absolute top-5 right-7 cursor-pointer",
  heading: "text-3xl font-bold",
  info: "font-semibold mt-2",
  loginButtons:
    "py-8 w-full flex flex-col items-center gap-4 border-b-2 border-[#979797]",
  loginButton:
    "flex items-center gap-4 px-5 w-72 py-3 rounded-3xl shadow-lg cursor-pointer text-white",
  downButtons: "my-5 flex items-center gap-5",
  downButton:
    "flex items-center pl-3 py-1 gap-2 bg-black text-white w-40 rounded-lg cursor-pointer",
  condition: "px-7 text-center text-xs",
};
/* Styles End */

const Login = ({ setShowLogin }) => {
  const { googleSignIn, facebookSignIn, twitterSignIn, appleSignIn } =
    useLogins();

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <p onClick={() => setShowLogin(false)} className={styles.exit}>
          <GiTireIronCross />
        </p>
        <h1 className={styles.heading}>Welcome</h1>
        <p className={styles.info}>Login | Sign Up</p>
        <div className={styles.loginButtons}>
          <div
            onClick={googleSignIn}
            className={`${styles.loginButton} text-black border`}
          >
            <FcGoogle className="text-2xl" />
            <p>Continue with Google</p>
          </div>

          <div
            onClick={facebookSignIn}
            className={`${styles.loginButton} bg-[#1D4CB3]`}
          >
            <AiFillFacebook className="text-2xl" />
            <p>Continue with Facebook</p>
          </div>

          <div
            onClick={twitterSignIn}
            className={`${styles.loginButton} bg-[#55ACEE]`}
          >
            <AiOutlineTwitter className="text-2xl" />
            <p>Continue with Twitter</p>
          </div>

          <div
            onClick={appleSignIn}
            className={`${styles.loginButton} bg-black`}
          >
            <AiFillApple className="text-2xl" />
            <p>Continue with Apple</p>
          </div>

          <p>or</p>

          <div className={`${styles.loginButton} bg-black`}>
            <IoKeypadSharp className="text-xl" />
            <p>Continue with Phone</p>
          </div>
        </div>

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

        <p className={styles.condition}>
          Click "Sign In" to agree to Flytant's Terms of Service and acknowledge
          that Flytant's Privacy Policy applies to you.
        </p>
      </div>
    </div>
  );
};

export default Login;
