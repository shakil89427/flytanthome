import React from "react";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillYoutube,
  AiFillLinkedin,
} from "react-icons/ai";
import { HiMail } from "react-icons/hi";
import useAnalytics from "../../Hooks/useAnalytics";

const styles = {
  main: "text-white py-14 bg-[#252525]",
  title: "text-center text-2xl font-bold",
  mainWrapper:
    "flex flex-col md:flex-row items-center gap-5 lg:gap-20 mx-auto w-fit max-w-[1536px] mx-auto px-5 mt-10",
  innerWrapper: "flex items-center gap-5 lg:gap-20",
  btn: "w-20 lg:w-28 h-20 lg:h-28 border-2 rounded-full text-5xl lg:text-6xl flex items-center justify-center hover:scale-110 duration-150",
};

const ContactBar = () => {
  const { addLog } = useAnalytics();
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Or connect with us on</h1>
      <div className={styles.mainWrapper}>
        <div className={styles.innerWrapper}>
          <a
            onClick={() => addLog("connect_us_instagram")}
            href="https://www.instagram.com/flytant/"
            target="_blank"
            rel="noreferrer"
            className={styles.btn}
          >
            <AiFillInstagram />
          </a>

          <a
            onClick={() => addLog("connect_us_youtube")}
            href="https://www.youtube.com/channel/UC_r46_UgBvaG2k94LDjEIWQ"
            target="_blank"
            rel="noreferrer"
            className={styles.btn}
          >
            <AiFillYoutube />
          </a>

          <a
            onClick={() => addLog("connect_us_facebook")}
            href="https://www.facebook.com/flytantapp/"
            target="_blank"
            rel="noreferrer"
            className={styles.btn}
          >
            <AiFillFacebook />
          </a>
        </div>

        <div className={styles.innerWrapper}>
          <a
            onClick={() => addLog("connect_us_linkedin")}
            href="https://www.linkedin.com/company/flytant/mycompany/"
            target="_blank"
            rel="noreferrer"
            className={styles.btn}
          >
            <AiFillLinkedin />
          </a>

          <a
            onClick={() => addLog("connect_us_twitter")}
            href="https://twitter.com/flytant"
            target="_blank"
            rel="noreferrer"
            className={styles.btn}
          >
            <AiFillTwitterSquare />
          </a>

          <a
            onClick={() => addLog("connect_us_email")}
            href="mailto:contact@flytant.com"
            target="_blank"
            rel="noreferrer"
            className={styles.btn}
          >
            <HiMail />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactBar;
