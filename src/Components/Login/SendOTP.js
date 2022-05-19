import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { styles } from "./CommonStyles";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import useStore from "../../Store/useStore";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import axios from "axios";

const SendOTP = ({ back, setShow }) => {
  const auth = getAuth();
  const { userLoading, setUserLoading, setNotify, country, setCountry } =
    useStore();
  const [number, setNumber] = useState();

  useEffect(() => {
    axios
      .get("https://extreme-ip-lookup.com/json/")
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sendOTP = (e) => {
    e.preventDefault();
    if (userLoading) return;
    if (!number) {
      return setNotify({ status: false, message: "Enter a valid number" });
    }
    if (!isValidPhoneNumber(number)) {
      return setNotify({ status: false, message: "Invalid number" });
    }
    setUserLoading(true);
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
        setUserLoading(false);
        setShow("verifyOTP");
      })
      .catch((error) => {
        setUserLoading(false);
        setNotify({ status: false, message: error.message });
      });
  };

  return (
    <div className={styles.inputsMain}>
      <BiArrowBack onClick={back} className={styles.back} />
      <h1 className={styles.heading}>Phone Number</h1>
      <p className={styles.info}>Login | Sign Up</p>
      <div className="my-7">
        <p>Enter Your mobile number</p>
        <form className={styles.form} onSubmit={sendOTP}>
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
  );
};

export default SendOTP;
