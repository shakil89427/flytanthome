import React, { useEffect, useState } from "react";
import onboardBg from "../Assets/onboard/onboardBg.jpg";
import checked from "../Assets/onboard/checked.png";
import correct from "../Assets/onboard/correct.png";
import upArrow from "../Assets/onboard/up.png";
import downArrow from "../Assets/onboard/down.png";
import successIcon from "../Assets/onboard/success.png";
import PhoneInput from "react-phone-number-input";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import Scroll from "../Components/Scroll/Scroll";
import axios from "axios";
import useStore from "../Store/useStore";

const styles = {
  main: "max-w-[1000px] mx-auto px-5 flex flex-col-reverse md:flex-row my-20 md:my-28 gap-5 lg:gap-10 md:items-center lg:items-end",
  topics: "md:w-7/12 lg:w-1/2 relative max-w-[500px] mx-auto shadow-xl",
  topicsMain: "absolute w-full top-[60%] flex items-center justify-center",
  progressMain: "relative flex items-center justify-center",
  initialProgress: "absolute w-full h-1 bg-gray-300 -z-10",
  progress: "absolute h-1 bg-black -z-10 left-0 duration-300",
  stepMain: "flex items-center justify-between text-white font-semibold w-full",
  step: "w-8 h-8 rounded-full flex items-center justify-center duration-300",
  titleMain: "text-2xl lg:text-3xl flex flex-col gap-2 my-10",
  input: "w-full border-2 p-2 rounded-md mb-10 mt-2",
  mainBtnWrapper: "flex items-center gap-3 mt-5",
  mainBtn:
    "flex items-center justify-center gap-2 py-2 w-40 rounded-md text-lg text-white",
  arrowMain: "mt-24 flex items-center justify-end gap-3",
  arrow: "w-9 h-9 bg-gray-400 rounded-md flex items-center justify-center",
  successMain:
    "flex flex-col items-center justify-center gap-8 min-h-[80vh] px-5",
  successWrapper: "flex flex-col items-center justify-center gap-5",
  successHeading: "text-2xl md:text-3xl font-semibold text-center",
  meetBtn:
    "bg-black text-white w-44 py-2 rounded-md flex items-center justify-center",
};

const OnBoard = () => {
  const topics = [
    "Complete Transparency",
    "Social Score Evaluation",
    "Higher Engagement Rate",
    "Influencers from All Niche",
    "Payment based on Engagement",
  ];
  const { setNotify } = useStore();
  const [data, setData] = useState({
    name: "",
    brandname: "",
    email: "",
    message: "",
  });
  const [number, setNumber] = useState(null);
  const [progress, setProgress] = useState(0);
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const next = async (e) => {
    e.preventDefault();
    if (disable) return;
    if (progress < 100) setProgress((prev) => prev + 50);
    if (progress !== 100) return;
    setLoading(true);
    const code = number.split("+")[1];
    const allData = { ...data, code, contact: "" };
    try {
      await axios.post(process.env.REACT_APP_BRAND_CONTACT_URL, allData);
      setLoading(false);
      setSuccess(true);
      window.scrollTo(0, 0);
    } catch (err) {
      setLoading(false);
      setNotify({ status: false, message: err.message });
    }
  };

  useEffect(() => {
    if (progress === 0 && data.name && data.brandname) {
      return setDisable(false);
    }
    if (progress === 50 && data.email && number?.length > 7) {
      return setDisable(false);
    }
    if (progress === 100 && data.message?.length >= 10) {
      return setDisable(false);
    }
    setDisable(true);
  }, [data, number, progress]);

  return (
    <>
      {!success ? (
        <div className={styles.main}>
          <Scroll />
          {/* Topics */}
          <div className={styles.topics}>
            <img src={onboardBg} alt="" />
            <div className={styles.topicsMain}>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-medium">
                  Hire Quality Influencers with
                </h1>
                {topics.map((topic, i) => (
                  <div key={i} className="flex items-end gap-3  text-lg">
                    <img src={checked} alt="" />
                    <p>{topic}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-5/12 lg:w-1/2">
            {/* Progress */}
            <div className={styles.progressMain}>
              <div className={styles.initialProgress} />
              <div
                style={{ width: `${progress}%` }}
                className={styles.progress}
              />
              <div className={styles.stepMain}>
                <div
                  style={{ backgroundColor: "black" }}
                  className={styles.step}
                >
                  1
                </div>
                <div
                  style={{ backgroundColor: progress >= 50 ? "black" : "gray" }}
                  className={styles.step}
                >
                  2
                </div>
                <div
                  style={{
                    backgroundColor: progress === 100 ? "black" : "gray",
                  }}
                  className={styles.step}
                >
                  3
                </div>
              </div>
            </div>

            {/* Title */}
            <div className={styles.titleMain}>
              <h1>
                Let's <span className="font-semibold">Drive your products</span>
              </h1>
              <h1>
                Growth <span className="font-semibold">with Influencers</span>
              </h1>
            </div>

            {/* Form */}
            <form className="w-full" onSubmit={next}>
              <div className="h-52 relative">
                {/* First Page */}
                {progress === 0 && (
                  <div>
                    <p>
                      Your Name <sup className="text-red-600">*</sup>
                    </p>
                    <input
                      className={styles.input}
                      type="text"
                      value={data.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                    />
                    <p>
                      Brand Name <sup className="text-red-600">*</sup>
                    </p>
                    <input
                      className={styles.input}
                      type="text"
                      value={data.brandname}
                      onChange={(e) =>
                        setData({ ...data, brandname: e.target.value })
                      }
                    />
                  </div>
                )}

                {/* Second Page */}
                {progress === 50 && (
                  <div>
                    <p>
                      Your Email <sup className="text-red-600">*</sup>
                    </p>
                    <input
                      className={styles.input}
                      type="email"
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                    />
                    <p>
                      Contact Number <sup className="text-red-600">*</sup>
                    </p>
                    <PhoneInput
                      className={`${styles.input} otpNumber`}
                      international
                      defaultCountry="IN"
                      countryCallingCodeEditable={false}
                      value={number}
                      onChange={setNumber}
                    />
                  </div>
                )}

                {/* Third Page */}
                {progress === 100 && (
                  <div>
                    <p>
                      Your Message <sup className="text-red-600">*</sup>
                    </p>
                    <textarea
                      className={styles.input}
                      rows="5"
                      value={data.message}
                      onChange={(e) =>
                        setData({ ...data, message: e.target.value })
                      }
                    />
                  </div>
                )}
                {loading && (
                  <div className="absolute w-full -bottom-2 left-0">
                    <ProgressBar />
                  </div>
                )}
              </div>

              {/* Next/Submit Button */}
              <div className={styles.mainBtnWrapper}>
                <button
                  disabled={disable || loading}
                  style={{
                    backgroundColor: disable || loading ? "gray" : "black",
                  }}
                  type="submit"
                  className={styles.mainBtn}
                >
                  <p>{progress === 100 ? "Submit" : "Next"}</p>
                  <img className="w-[12%]" src={correct} alt="" />
                </button>
                {!disable && (
                  <p className="text-xs">
                    Press <span className="font-semibold">'Enter'</span>
                  </p>
                )}
              </div>

              {/* Arrow Buttons */}
              <div className={styles.arrowMain}>
                {/* Previous Arrow */}
                <button
                  disabled={loading || progress === 0}
                  style={{
                    backgroundColor:
                      loading || progress === 0 ? "gray" : "black",
                  }}
                  onClick={() =>
                    !loading &&
                    progress !== 0 &&
                    setProgress((prev) => prev - 50)
                  }
                  type="button"
                  className={styles.arrow}
                >
                  <img className="w-1/2" src={upArrow} alt="" />
                </button>

                {/* Next Arrow */}
                <button
                  disabled={disable || progress === 100}
                  style={{
                    backgroundColor:
                      progress === 100 || disable ? "gray" : "black",
                  }}
                  type="submit"
                  className={styles.arrow}
                >
                  <img className="w-1/2" src={downArrow} alt="" />
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* Success Page */
        <div className={styles.successMain}>
          <div className={styles.successWrapper}>
            <img src={successIcon} alt="" />
            <p>Your Form is submitted</p>
            <h1 className={styles.successHeading}>
              Thanks for showing interest in us
            </h1>
          </div>
          <a
            rel="noreferrer"
            href="https://calendly.com/flytant"
            target="_blank"
            className={styles.meetBtn}
          >
            Schedule a Meet
          </a>
        </div>
      )}
    </>
  );
};

export default OnBoard;
