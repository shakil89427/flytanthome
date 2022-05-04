import React, { useState } from "react";
import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineTwitter,
  AiOutlineLinkedin,
} from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
/* Styles Start */
const styles = {
  main: "grid grid-cols-1 lg:grid-cols-2 py-14 px-5 md:px-28 gap-10 lg:gap-20",
  /* Right */
  title: "text-2xl font-semibold mt-3",
  socials: "flex items-center justify-between mt-5 font-medium",
  selectedSocial:
    "relative font-semibold before:content-[''] before:absolute before:w-full before:h-[3px] before:bg-black before:-bottom-[2px] before:rounded-full",
  selectedMain:
    "flex flex-col items-center gap-5 mt-52 text-gray-500 text-sm font-medium",
  selected: "bg-black text-white text-3xl p-4 rounded-full cursor-pointer",
};
/* Styles End */

const SocialAccounts = ({ value }) => {
  const socials = ["Instagram", "Youtube", "Twitter", "Linkedin", "Tiktok"];
  const [selected, setSelected] = useState(socials[0]);

  return (
    <div>
      <p className={styles.title}>Social Accounts</p>
      <div className={styles.socials}>
        {socials.map((social) => (
          <p
            onClick={() => social !== selected && setSelected(social)}
            className={
              selected === social ? styles.selectedSocial : "cursor-pointer"
            }
            key={social}
          >
            {social}
          </p>
        ))}
      </div>
      {value && (
        <div className={styles.selectedMain}>
          <p>No account linked</p>
          {selected === "Instagram" && (
            <a
              href={`https://www.instagram.com/oauth/authorize?scope=user_profile,user_media&response_type=code&state=instagram&redirect_uri=${process.env.REACT_APP_INSTAGRAM_REDIRECT_URI}&client_id=${process.env.REACT_APP_INSTAGRAM_CLIENT_ID}`}
              className={styles.selected}
            >
              <AiOutlineInstagram />
            </a>
          )}
          {/*  */}
          {selected === "Youtube" && (
            <a
              href={`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube.readonly&response_type=token&state=youtubev3&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
              className={styles.selected}
            >
              <AiOutlineYoutube />
            </a>
          )}
          {selected === "Twitter" && (
            <span className={styles.selected}>
              <AiOutlineTwitter />
            </span>
          )}
          {selected === "Linkedin" && (
            <span className={styles.selected}>
              <AiOutlineLinkedin />
            </span>
          )}
          {selected === "Tiktok" && (
            <span className={styles.selected}>
              <FaTiktok />
            </span>
          )}
          <p>Click here to link your {selected}</p>
        </div>
      )}
      {!value && (
        <div className="my-32 flex items-center justify-center">
          {selected === "Instagram" && (
            <div className="p-4 bg-black text-white rounded-full text-3xl">
              <AiOutlineInstagram />
            </div>
          )}
          {selected === "Youtube" && (
            <div className="p-4 bg-black text-white rounded-full text-3xl">
              <AiOutlineYoutube />
            </div>
          )}
          {selected === "Twitter" && (
            <div className="p-4 bg-black text-white rounded-full text-3xl">
              <AiOutlineTwitter />
            </div>
          )}
          {selected === "Linkedin" && (
            <div className="p-4 bg-black text-white rounded-full text-3xl">
              <AiOutlineLinkedin />
            </div>
          )}
          {selected === "Tiktok" && (
            <div className="p-4 bg-black text-white rounded-full text-3xl">
              <FaTiktok />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SocialAccounts;

// ya29.A0ARrdaM9pPuYrvxpBlLeIUXLxNi-1TQ62CSKhpHHCghwIWXsBjlEwu9XMx8O5Urw9yLdOra33vZ3bgmdj03bxm4WNKVYSJIONJeODzr6jQr8eFVb-FUw3t9JYi0wXEFEGhJtAWJrpVL3H176hxyADCmboIGSD
