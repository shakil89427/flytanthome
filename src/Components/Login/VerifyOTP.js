import React, { useState } from "react";
import { styles } from "./CommonStyles";
import { BiArrowBack } from "react-icons/bi";
import useStore from "../../Store/useStore";
import useAnalytics from "../../Hooks/useAnalytics";

const VerifyOTP = ({ setShow }) => {
  const [loading, setLoading] = useState(false);
  const { setNotify } = useStore();
  const [otpArr, setOtpArr] = useState(new Array(6).fill(""));
  const { addLog } = useAnalytics();

  /* Get OTP from Input */
  const getOTPvalue = (e, index) => {
    let value = e.target.value;
    if (!value) return;
    if (value.length > 1) {
      value = value.charAt(value.length - 1);
      e.target.value = value;
    }
    const newArr = [...otpArr];
    newArr[index] = value;
    setOtpArr(newArr);
    if (index === 5) return;
    e.target.nextSibling.select();
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    const otp = otpArr.join("");
    if (otp.length === 6) {
      setLoading(true);
      addLog("verify_otp");
      const confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then(() => setLoading(false))
        .catch((error) => {
          setLoading(false);
          setNotify({
            status: false,
            message: error?.message?.split("/")[1]?.split(")")[0],
          });
        });
    }
  };
  return (
    <div className={`${styles.inputsMain} mt-10`}>
      <BiArrowBack onClick={() => setShow("sendOTP")} className={styles.back} />
      <h1 className={styles.heading}>Enter OTP here</h1>
      <p className="text-xs px-5 text-center my-8">
        A 6 digits code has been sent to your mobile number that you have
        entered
      </p>
      <form className={styles.form} onSubmit={verifyOTP}>
        <div className={styles.otpWrapper}>
          {otpArr.map((item, index) => (
            <input
              disabled={loading}
              key={index}
              onChange={(e) => getOTPvalue(e, index)}
              className={styles.otp}
              type="number"
            />
          ))}
        </div>
        <button
          disabled={loading}
          type="submit"
          className={` text-white p-3 border-0 rounded-3xl w-full ${
            loading ? "bg-gray-400" : "bg-black"
          }`}
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
