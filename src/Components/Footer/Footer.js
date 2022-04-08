import React from "react";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillYoutube,
  AiFillLinkedin,
  AiFillApple,
  AiFillAndroid,
} from "react-icons/ai";
import { HiMail } from "react-icons/hi";
import logo from "../../Assets/websiteLogo.png";

const styles = {
  main: "bg-black text-white px-20 py-10",
  wrapper:
    "grid grid-cols-1 lg:grid-cols-3 gap-y-10 border-b border-white pb-10",
  info: "flex flex-col items-center lg:items-start",
  logo: "w-48",
  infoText: "my-4",
  iconMain: "flex flex-col md:flex-row gap-y-5 gap-x-2",
  iconWrapper: "flex items-center gap-2",
  icon: "w-[60px] h-[60px] md:w-12 md:h-12 border-[3px] md:border-[2px] rounded-full flex items-center justify-center text-3xl md:text-2xl",
  linksMain: "flex justify-evenly text-center",
  link: "text-lg mb-5 cursor-pointer",
  appMain: "flex flex-col gap-y-5 mx-auto items-center lg:items-start ",
  appHead: "mt-1 lg:mt-0",
  appBtn:
    "bg-[#303030] w-56 flex items-center px-5 py-1 border-2 border-white rounded-lg cursor-pointer",
  appIcon: "text-3xl mr-3",
  download: "text-sm text-gray-300",
  appCatagory: "font-semibold text-lg",
  copyright: "text-center text-[#ABABAB] mt-3",
};

const Footer = () => {
  const icons = [
    [<AiFillInstagram />, <AiFillFacebook />, <AiFillTwitterSquare />],
    [<HiMail />, <AiFillYoutube />, <AiFillLinkedin />],
  ];

  const links = [
    ["Home", "About", "Career", "Privacy"],
    ["Ads", "Blogs", "Terms", "Contact"],
  ];

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        {/* Logo Part */}
        <div className={styles.info}>
          <img className={styles.logo} src={logo} alt="" />
          <p className={styles.infoText}>Connecting Brands & Influencers</p>
          {/* Icons Part */}
          <div className={styles.iconMain}>
            {icons.map((arr) => (
              <div key={Math.random()} className={styles.iconWrapper}>
                {arr.map((item) => (
                  <div key={Math.random()} className={styles.icon}>
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Links Part */}
        <div className={styles.linksMain}>
          {links.map((arr) => (
            <div key={Math.random()}>
              {arr.map((item) => (
                <p key={item} className={styles.link}>
                  {item}
                </p>
              ))}
            </div>
          ))}
        </div>
        {/* Apps Part */}
        <div className={styles.appMain}>
          <p className={styles.appHead}>Get the apps!</p>
          <div className={styles.appBtn}>
            <AiFillAndroid className={styles.appIcon} />
            <div>
              <p className={styles.download}>Download our</p>
              <p className={styles.appCatagory}>Android App</p>
            </div>
          </div>
          <div className={styles.appBtn}>
            <AiFillApple className={styles.appIcon} />
            <div>
              <p className={styles.download}>Download on the</p>
              <p className={styles.appCatagory}>App Store</p>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.copyright}>© Copyright Flytant Pvt Ltd.</p>
    </div>
  );
};

export default Footer;
