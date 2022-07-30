import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { styles } from "./CommonStyles";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Spinner2 from "../Spinner/Spinner2";
import useStore from "../../Store/useStore";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import useAnalytics from "../../Hooks/useAnalytics";

const SendOTP = ({ back, setShow }) => {
  const auth = getAuth();
  const { countryCode, userLoading, setNotify } = useStore();
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState();
  const { addLog } = useAnalytics();

  const sendOTP = (e) => {
    e.preventDefault();
    if (userLoading) return;
    if (!number) {
      return setNotify({ status: false, message: "Enter a valid number" });
    }
    if (!isValidPhoneNumber(number)) {
      return setNotify({ status: false, message: "Invalid number" });
    }
    addLog("send_otp");
    setLoading(true);
    /* Generate Captcha */
    window.appVerifier = new RecaptchaVerifier(
      "captcha",
      {
        size: "invisible",
      },
      auth
    );
    /* Send OTP */
    const appVerifier = window.appVerifier;
    signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShow("verifyOTP");
      })
      .catch((error) => {
        setLoading(false);
        setNotify({ status: false, message: error.message });
      });
  };

  return (
    <div className={`${styles.inputsMain} mt-10`}>
      <BiArrowBack onClick={back} className={styles.back} />
      <h1 className={styles.heading}>Phone Number</h1>
      <p className={styles.info}>Login | Sign Up</p>
      <div className="my-7">
        <p>Enter Your mobile number</p>
        <form className={styles.form} onSubmit={sendOTP}>
          <PhoneInput
            className={styles.number}
            international
            defaultCountry={countryCode || "US"}
            countryCallingCodeEditable={false}
            value={number}
            onChange={setNumber}
          />
          <button
            disabled={loading}
            type="submit"
            className={` text-white p-3 border-0 rounded-3xl w-full ${
              loading ? "bg-gray-400" : "bg-black"
            }`}
          >
            Send OTP
          </button>
        </form>
      </div>
      <div id="captcha"></div>
    </div>
  );
};

export default SendOTP;
