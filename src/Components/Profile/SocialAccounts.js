import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineInstagram } from "react-icons/ai";

/* Styles Start */
const styles = {
  main: "grid grid-cols-1 lg:grid-cols-2 py-14 px-5 md:px-28 gap-10 lg:gap-20",
  /* Right */
  title: "text-2xl font-semibold mt-3",
  socials: "flex items-center justify-between mt-5 font-medium",
  selectedSocial:
    "relative font-semibold before:content-[''] before:absolute before:w-full before:h-[3px] before:bg-black before:-bottom-[2px] before:rounded-full",
};
/* Styles End */

const SocialAccounts = () => {
  const socials = ["Instagram", " Youtube", "Twitter", " Linkedin", "Tiktok"];
  const [selected, setSelected] = useState(socials[0]);
  const location = window.location.href.split("=")[1];
  const instaClientId = process.env.REACT_APP_INSTAGRAM_CLIENT_ID;
  const instaClientSecret = process.env.REACT_APP_INSTAGRAM_CLIENT_SECRET;
  const instaRedirectUri = process.env.REACT_APP_INSTAGRAM_REDIRECT_URI;

  /* Get User Basic Info */
  const getuserInfo = async (access_token) => {
    try {
      const response = await axios.get(
        `https://graph.instagram.com/me?fields=account_type,id,username&access_token=${access_token}`
      );
      if (response?.data) {
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* Get Token */
  const getToken = async (code) => {
    const url = "https://api.instagram.com/oauth/access_token";
    const headers = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    const params = `client_id=${instaClientId}&client_secret=${instaClientSecret}&grant_type=authorization_code&redirect_uri=${instaRedirectUri}&code=${code}`;
    try {
      const response = await axios.post(url, params, headers);
      if (response?.data) {
        const { access_token } = response.data;
        getuserInfo(access_token);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* Trigger Url */
  useEffect(() => {
    if (!location?.length) return;
    const code = location.slice(location[0], location.length - 2);
    getToken(code);
  }, [location]);

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
      {selected === "Instagram" && (
        <div className="flex flex-col items-center gap-5 mt-52 text-gray-500 text-sm font-medium">
          <p>No account linked</p>
          <a
            href="https://www.instagram.com/oauth/authorize?client_id=2103885159789843&redirect_uri=https://flytanthome.web.app/profile&scope=user_profile,user_media&response_type=code"
            className="bg-black text-white text-3xl p-4 rounded-full"
          >
            <AiOutlineInstagram />
          </a>
          <p>Click here to link your Instagram</p>
        </div>
      )}
    </div>
  );
};

export default SocialAccounts;
