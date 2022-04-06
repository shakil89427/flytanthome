import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import React, { useState } from "react";
import { GiTireIronCross } from "react-icons/gi";
import Methods from "./Methods";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { BiArrowBack } from "react-icons/bi";
import useStore from "../../Store/useStore";

/* Styles Start */
const styles = {
  main: "fixed top-0 left-0 w-full min-h-screen z-20 flex items-center justify-center bg-[#07070783]",
  wrapper:
    "bg-white p-5 md:p-8 rounded-lg flex flex-col items-center w-[400px] md:w-[500px] lg:w-[550px] relative",
  exit: "text-xl absolute top-5 right-7 cursor-pointer",
  heading: "text-3xl font-bold text-center",
  info: "font-semibold mt-2 text-center",
  condition: "px-7 text-center text-xs",
  back: "text-3xl absolute top-5 left-7 cursor-pointer",
  form: "flex flex-col gap-3 my-5",
  number: "border p-1 rounded-3xl border-black overflow-hidden px-5 otpNumber",
  submitBtn: "bg-black text-white p-2 rounded-3xl",
  otp: "border py-1 px-3 rounded-2xl border-black",
};
/* Styles End */

const Login = ({ setShowLogin }) => {
  const auth = getAuth();
  const { setUser, userLoading, setUserLoading } = useStore();
  const [methods, setMethods] = useState(true);
  const [phoneInput, setPhoneInput] = useState(false);
  const [otpInput, setOtpInput] = useState(false);

  const [number, setNumber] = useState();

  /* Send OTP */
  const sendOTP = () => {
    const appVerifier = window.appVerifier;
    signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setUserLoading(false);
        showOtp();
      })
      .catch((error) => {
        setUserLoading(false);
        alert(error);
      });
  };

  /* Genarate captcha */
  const genarateCaptcha = () => {
    window.appVerifier = new RecaptchaVerifier(
      "captcha",
      {
        size: "invisible",
      },
      auth
    );
    sendOTP();
  };

  /* Create intent for send otp */
  const intentOtp = (e) => {
    e.preventDefault();
    if (userLoading) return;
    if (!number) {
      return alert("Enter a valid number");
    }
    if (!isValidPhoneNumber(number)) {
      return alert("Invalid number");
    }
    setUserLoading(true);
    genarateCaptcha();
  };

  /* Verify OTP */
  const verifyOTP = (e) => {
    e.preventDefault();
    const otp = e.target[0].value;
    if (otp.length === 6) {
      setUserLoading(true);
      const confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((res) => {
          setUser(res.user);
          setUserLoading(false);
        })
        .catch((error) => {
          setUserLoading(false);
          alert(error);
        });
    }
  };

  /* Render Conditions */
  const showMethods = () => {
    setMethods(true);
    setPhoneInput(false);
    setOtpInput(false);
  };
  const showInput = () => {
    setMethods(false);
    setPhoneInput(true);
    setOtpInput(false);
  };
  const showOtp = () => {
    setMethods(false);
    setPhoneInput(false);
    setOtpInput(true);
  };

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        {/* Exit Button */}
        <p onClick={() => setShowLogin(false)} className={styles.exit}>
          <GiTireIronCross />
        </p>

        {/* Login Methods */}
        {methods && <Methods showInput={showInput} />}

        {/* Get Phone Number */}
        {phoneInput && (
          <div className="w-4/6">
            <BiArrowBack onClick={showMethods} className={styles.back} />
            <h1 className={styles.heading}>Phone Number</h1>
            <p className={styles.info}>Login | Sign Up</p>
            <div className="my-7">
              <p>Enter Your mobile number</p>
              <form className={styles.form} onSubmit={intentOtp}>
                <PhoneInput
                  className={styles.number}
                  international
                  defaultCountry="US"
                  countryCallingCodeEditable={false}
                  value={number}
                  onChange={setNumber}
                />
                <button type="submit" className={styles.submitBtn}>
                  Send OTP
                </button>
              </form>
            </div>
            <div id="captcha"></div>
          </div>
        )}

        {/* Enter OTP */}
        {otpInput && (
          <div className="w-4/6 mb-7">
            <BiArrowBack onClick={showInput} className={styles.back} />
            <h1 className={styles.heading}>Enter OTP here</h1>
            <p className="text-xs px-12 text-center my-8">
              A 6 digits code has been sent to your mobile number that you have
              entered
            </p>
            <form className={styles.form} onSubmit={verifyOTP}>
              <input className={styles.otp} type="number" />
              <button className={styles.submitBtn}>Verify</button>
            </form>
          </div>
        )}

        {/* Conditions */}
        <p className={styles.condition}>
          Click "Sign In" to agree to Flytant's Terms of Service and acknowledge
          that Flytant's Privacy Policy applies to you.
        </p>
      </div>
    </div>
  );
};

export default Login;
