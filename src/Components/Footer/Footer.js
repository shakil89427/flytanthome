import React from "react";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillYoutube,
  AiFillLinkedin,
  AiFillApple,
} from "react-icons/ai";
import { HiMail } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import playstoreWhite from "../../Assets/playstoreWhite.png";

const styles = {
  main: "bg-black text-white py-14",
  wrapper:
    "grid grid-cols-1 lg:grid-cols-3 gap-y-20 gap-x-5 lg:gap-x-10 xl:gap-x-20 border-b border-white r-box py-20 items-center",
  info: "flex flex-col items-center justify-between",
  logo: "w-64 cursor-pointer",
  infoText: "my-5 text-center",
  iconMain: "grid grid-cols-3 xl:grid-cols-6 gap-x-2 gap-y-5",
  icon: "w-[60px] h-[60px] xl:w-12 xl:h-12 border-[3px] xl:border-[2px] rounded-full flex items-center justify-center text-3xl xl:text-2xl hover:scale-110 duration-150",
  linksMain: "grid grid-cols-3 gap-x-10 gap-y-5 w-fit pl-8",
  link: "text-lg xl:text-xl cursor-pointer font-medium text-gray-400 hover:text-white duration-150",
  appMain: "flex w-full justify-center items-center",
  appHead: "mt-1 lg:mt-0",
  appBtn:
    "bg-[#303030] w-52 flex items-center pl-5 py-1 border-2 border-white rounded-lg z-10 cursor-pointer overflow-hidden before:duration-300 relative before:absolute before:content-[''] before:w-0 before:h-full before:top-0 before:left-0 before:bg-black hover:before:w-full before:-z-10",
  appIcon: "text-3xl mr-2",
  download: "text-sm font-medium text-gray-300",
  appCatagory: "font-semibold text-xl leading-none mb-1",
  copyright: "text-center text-[#ABABAB] mt-7",
};

const Footer = () => {
  const navigate = useNavigate();
  const icons = [
    { url: "https://www.instagram.com/flytant/", icon: <AiFillInstagram /> },
    { url: "https://www.facebook.com/flytantapp/", icon: <AiFillFacebook /> },
    { url: "https://twitter.com/flytant", icon: <AiFillTwitterSquare /> },
    { url: "mailto:contact@flytant.com", icon: <HiMail /> },
    {
      url: "https://www.youtube.com/channel/UC_r46_UgBvaG2k94LDjEIWQ",
      icon: <AiFillYoutube />,
    },
    {
      url: "https://www.linkedin.com/company/flytant/mycompany/",
      icon: <AiFillLinkedin />,
    },
  ];

  const links = [
    "Home",
    "About",
    "Blogs",
    "Contact",
    "Career",
    "Ads",
    "Terms",
    "Privacy",
    "FAQs",
  ];

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        {/* Logo Part */}
        <div className={styles.info}>
          <span>
            <img
              onClick={() => navigate("/")}
              className={styles.logo}
              src={logo}
              alt=""
            />
            <p className={styles.infoText}>Connecting Brands & Influencers</p>
          </span>
          {/* Icons Part */}
          <div className={styles.iconMain}>
            {icons.map((item, i) => (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                key={i}
                className={styles.icon}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
        {/* Links Part */}
        <div className="flex items-center justify-center">
          <div className={styles.linksMain}>
            {links.map((item) => (
              <Link
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                key={item}
                className={styles.link}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        {/* Apps Part */}
        <div className={styles.appMain}>
          <div className="flex flex-col gap-y-5 items-center xl:items-start">
            <p className={styles.appHead}>Get the apps!</p>
            <a
              href="https://play.google.com/store/apps/details?id=influencer.marketing.flytant"
              target="_blank"
              rel="noreferrer"
              className={styles.appBtn}
            >
              <img className="w-6 mr-3" src={playstoreWhite} alt="" />
              <div>
                <p className={styles.download}>GET IT ON</p>
                <p className={styles.appCatagory}>Play Store</p>
              </div>
            </a>
            <a
              href="https://apps.apple.com/in/app/flytant/id1530158515"
              target="_blank"
              rel="noreferrer"
              className={styles.appBtn}
            >
              <AiFillApple className={styles.appIcon} />
              <div>
                <p style={{ fontSize: "11px" }} className={styles.download}>
                  DOWNLOAD ON THE
                </p>
                <p className={styles.appCatagory}>App Store</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <p className={styles.copyright}>© Flytant 2022</p>
    </div>
  );
};

export default Footer;
