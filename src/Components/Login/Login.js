import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { GiTireIronCross } from "react-icons/gi";
import { BiArrowBack } from "react-icons/bi";
import Methods from "./Methods";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import useStore from "../../Store/useStore";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";

/* Styles Start */
const styles = {
  main: "fixed top-0 left-0 w-full min-h-screen z-20 flex items-center justify-center bg-[#07070783]",
  wrapper:
    "bg-white p-5 md:p-8 rounded-lg flex flex-col items-center mx-3 w-full md:w-[500px] lg:w-[550px] relative overflow-hidden",
  spinnerContainer:
    "absolute w-full bg-[#8080807a] inset-0 flex items-center justify-center z-50",
  exit: "text-xl absolute top-5 right-7 cursor-pointer",
  heading: "text-3xl font-bold text-center",
  info: "font-semibold mt-2 text-center",
  condition: "px-7 text-center text-xs",
  back: "text-3xl absolute top-5 left-7 cursor-pointer",
  inputsMain: "w-9/12 md:w-5/6 lg:w-4/6 mb-7",
  form: "flex flex-col gap-3 my-2",
  number: "border p-2 rounded-3xl border-black overflow-hidden px-5 otpNumber",
  submitBtn: "bg-black text-white p-3 border-0 rounded-3xl w-full",
  otpWrapper: "flex items-center justify-center gap-3 mb-5",
  otp: "w-10 h-10 border border-black outline-0 rounded-lg text-center",
};
/* Styles End */

const Login = ({ setShowLogin }) => {
  const auth = getAuth();
  const database = getFirestore();
  const { user, setUser, userLoading, setUserLoading } = useStore();
  const [methods, setMethods] = useState(true);
  const [phoneInput, setPhoneInput] = useState(false);
  const [otpInput, setOtpInput] = useState(false);

  const [number, setNumber] = useState();
  let otpArr = new Array(6).fill("");

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

  /* Get OTP from Input */
  const getOTPvalue = (e, index) => {
    let value = e.target.value;
    if (!value) return;
    if (value.length > 1) {
      value = value.charAt(value.length - 1);
      e.target.value = value;
    }
    otpArr[index] = value;
    if (index === 5) {
      return e.target.blur();
    }
    e.target.nextSibling.select();
  };

  /* Verify OTP */
  const verifyOTP = (e) => {
    e.preventDefault();
    const otp = otpArr.join("");
    if (otp.length === 6) {
      setUserLoading(true);
      const confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((response) => {
          if (response.user) {
            const userRef = doc(database, "users", response.user.uid);
            getDoc(userRef)
              .then((userData) => {
                const finalData = userData.data();
                console.log(finalData);
                if (finalData) {
                  setUser(finalData);
                  return setUserLoading(false);
                }
                const current = {
                  deviceType: "Website",
                  email: response.user.email,
                  freeTrials: 3,
                  phoneNumber: response.user.phoneNumber,
                  profileImageUrl: response.user.photoURL,
                  shouldShowInfluencer: false,
                  userId: response.user.uid,
                };
                setUser({ required: true, tempData: current });
                setUserLoading(false);
              })
              .catch((err) => {});
          }
        })
        .catch((error) => {
          setUserLoading(false);
          alert(error);
        });
    }
  };

  const addUser = (e) => {
    e.preventDefault();
    setUserLoading(true);
    const username = e.target[0].value;
    const newData = { ...user.tempData, username };
    const userRef = doc(database, "users", newData.userId);
    setDoc(userRef, newData)
      .then(() => {
        setUser(newData);
        setUserLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setUserLoading(false);
      });
  };

  /* Render Conditions */
  const showMethods = () => {
    if (user?.required) {
      setUser({});
    }
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

  useEffect(() => {
    if (user?.required) {
      setMethods(false);
      setPhoneInput(false);
      setOtpInput(false);
    }
  }, [user]);

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        {/* Spinner */}
        {userLoading && (
          <div className={styles.spinnerContainer}>
            <div className="spinner"></div>
          </div>
        )}
        {/* Exit Button */}
        <p onClick={() => setShowLogin(false)} className={styles.exit}>
          <GiTireIronCross />
        </p>

        {/* Login Methods */}
        {methods && <Methods showInput={showInput} />}

        {user?.required && (
          <div className={styles.inputsMain}>
            <BiArrowBack onClick={showMethods} className={styles.back} />
            <form className="flex flex-col gap-4 my-7" onSubmit={addUser}>
              <p>Enter your username</p>
              <input
                className="w-full border outline-none p-3 rounded-3xl border-black"
                placeholder="Enter username here"
                type="text"
              />
              <button type="submit" className={styles.submitBtn}>
                Submit
              </button>
            </form>
          </div>
        )}

        {/* Get Phone Number */}
        {phoneInput && (
          <div className={styles.inputsMain}>
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
          <div className={styles.inputsMain}>
            <BiArrowBack onClick={showInput} className={styles.back} />
            <h1 className={styles.heading}>Enter OTP here</h1>
            <p className="text-xs px-5 text-center my-8">
              A 6 digits code has been sent to your mobile number that you have
              entered
            </p>
            <form className={styles.form} onSubmit={verifyOTP}>
              <div className={styles.otpWrapper}>
                {otpArr.map((item, index) => (
                  <input
                    key={index}
                    onChange={(e) => getOTPvalue(e, index)}
                    className={styles.otp}
                    type="number"
                  />
                ))}
              </div>
              <button type="submit" className={styles.submitBtn}>
                Verify
              </button>
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
