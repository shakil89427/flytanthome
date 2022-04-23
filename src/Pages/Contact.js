import axios from "axios";
import Scroll from "../Components/Scroll/Scroll";
import useStore from "../Store/useStore";
import React, { useState } from "react";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import ContactBar from "../Components/ContactBar/ContactBar";

const styles = {
  main: "mx-auto max-w-[900px] py-14 md:py-24 px-5",
  title: "text-5xl lg:text-7xl font-bold text-center",
  info: "text-2xl font-medium text-center mt-10 px-5",
  form: "my-20 grid grid-cols-2 gap-12 md:gap-y-20 md:gap-x-10",
  input:
    "outline-0 border-b-2 py-2 border-black placeholder:text-lg placeholder:font-medium placeholder:text-gray-500 text-lg font-medium",
  btn: "bg-black text-white px-10 py-3 rounded-3xl text-lg font-medium hover:scale-105 duration-150",
};

const Contact = () => {
  const { setNotify } = useStore();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const submitData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(process.env.REACT_APP_CONTACT_URL, data);
      setLoading(false);
      setNotify({
        status: true,
        message: "Message sended successfully.Thank you",
      });
      e.target.reset();
    } catch (err) {
      setLoading(false);
      setNotify({
        status: false,
        message: "Something went wrong.Please try again later",
      });
    }
  };
  return (
    <>
      <div className={styles.main}>
        <Scroll />
        <h1 className={styles.title}>How can we help you?</h1>
        <p className={styles.info}>
          Do you have a question or are you interested in working with us? Just
          fill out the form below
        </p>
        <form className={styles.form} onSubmit={submitData}>
          <input
            required
            className={`${styles.input} col-span-2`}
            placeholder="i'd like to ask about"
            type="text"
            onChange={(e) => setData({ ...data, ask: e.target.value })}
          />
          <input
            required
            className={`${styles.input} col-span-2 md:col-span-1`}
            placeholder="Name"
            type="text"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <input
            required
            className={`${styles.input} col-span-2 md:col-span-1`}
            placeholder="Email"
            type="email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <textarea
            required
            className={`${styles.input} col-span-2`}
            placeholder="Type Message Here"
            rows="3"
            onChange={(e) => setData({ ...data, text: e.target.value })}
          />
          <div className="col-span-2 relative mt-8 md:mt-0">
            <div className="absolute w-full left-0 -top-14">
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

export default Contact;
