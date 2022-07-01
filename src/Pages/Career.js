import React, { useEffect, useState } from "react";
import useStore from "../Store/useStore";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import ContactBar from "../Components/ContactBar/ContactBar";
import careerBg from "../Assets/career/careerBg.png";
import axios from "axios";

const styles = {
  main: "w-fit max-w-[850px] mx-auto px-5 py-20",
  bg: "w-full",
  title:
    "text-3xl lg:text-5xl xl:text-7xl font-bold text-center mt-20 mb-10 md:mb-14 lg:mb-20",
  info: "text-xl md:text-2xl font-medium text-center mb-20 px-5",
  form: "my-20 grid grid-cols-2 gap-12 md:gap-y-20 md:gap-x-10 relative",
  input:
    "outline-0 border-b-2 py-2 border-black placeholder:text-lg placeholder:font-medium placeholder:text-gray-500 text-lg font-medium",
  progress: "absolute w-full bottom-20 md:bottom-24 left-0",
  btn: "bg-black text-white px-10 py-3 rounded-3xl text-lg font-medium hover:scale-105 duration-150",
};

const Career = () => {
  const { setNotify } = useStore();
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState();

  const submitData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("docs", JSON.stringify(data));
      console.log(formData);
      await axios.post("http://localhost:5000/sendmailCareer", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      e.target.reset();
      setFile(null);
      setData({});
      setLoading(false);
      setNotify({ status: true, message: "Submitted Successfully.Thank you" });
    } catch (err) {
      setLoading(false);
      setNotify({ status: false, message: err.message });
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <div className={styles.main}>
        <img className={styles.bg} src={careerBg} alt="" />
        <h1 className={styles.title}>We're Hiring</h1>
        <p className={styles.info}>
          Leave us a message. We’ll contact you soon
        </p>
        <form className={styles.form} onSubmit={submitData}>
          <input
            required
            className={`${styles.input} col-span-2 md:col-span-1`}
            type="text"
            placeholder="Name"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <input
            required
            className={`${styles.input} col-span-2 md:col-span-1`}
            type="email"
            placeholder="Email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <textarea
            required
            className={`${styles.input} col-span-2`}
            rows="3"
            placeholder="Type Message Here"
            onChange={(e) => setData({ ...data, text: e.target.value })}
          />
          <input
            required
            id="career_file"
            className={`${styles.input} col-span-2 mt-10 pb-0 cursor-pointer`}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="col-span-2 relative mt-8 md:mt-0">
            <div className="absolute w-full -top-14 left-0">
              {loading && <ProgressBar />}
            </div>
            <button type="submit" className={styles.btn}>
              Submit
            </button>
          </div>
        </form>
      </div>
      <ContactBar />
    </>
  );
};

export default Career;
