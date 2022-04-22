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
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.png";

const styles = {
  main: "bg-black text-white py-14",
  wrapper:
    "grid grid-cols-1 lg:grid-cols-3 gap-y-20 border-b border-white r-box py-20",
  info: "flex flex-col items-center justify-between",
  logo: "w-64",
  infoText: "my-5",
  iconMain: "flex flex-col md:flex-row gap-y-5 gap-x-2",
  iconWrapper: "flex items-center gap-2 mt-3",
  icon: "w-[60px] h-[60px] md:w-12 md:h-12 border-[3px] md:border-[2px] rounded-full flex items-center justify-center text-3xl md:text-2xl hover:scale-110 duration-150",
  linksMain: "flex justify-evenly",
  sublink: "flex flex-col justify-between gap-5",
  link: "text-xl cursor-pointer font-medium text-gray-400 hover:text-white duration-150",
  appMain:
    "w-fit flex flex-col mx-auto md:ml-auto gap-y-5 items-center lg:items-start",
  appHead: "mt-1 lg:mt-0",
  appBtn:
    "bg-[#303030] w-56 flex items-center px-5 py-1 border-2 border-white rounded-lg z-10 cursor-pointer overflow-hidden before:duration-300 relative before:absolute before:content-[''] before:w-0 before:h-full before:top-0 before:left-0 before:bg-black hover:before:w-full before:-z-10",
  appIcon: "text-3xl mr-3",
  download: "text-sm text-gray-300",
  appCatagory: "font-semibold text-lg",
  copyright: "text-center text-[#ABABAB] mt-7",
};

const Footer = () => {
  const icons = [
    [
      { url: "https://www.instagram.com/flytant/", icon: <AiFillInstagram /> },
      { url: "https://www.facebook.com/flytantapp/", icon: <AiFillFacebook /> },
      { url: "https://twitter.com/flytant", icon: <AiFillTwitterSquare /> },
    ],
    [
      { url: "mailto:contact@flytant.com", icon: <HiMail /> },
      {
        url: "https://www.youtube.com/channel/UC_r46_UgBvaG2k94LDjEIWQ",
        icon: <AiFillYoutube />,
      },
      {
        url: "https://www.linkedin.com/company/flytant/mycompany/",
        icon: <AiFillLinkedin />,
      },
    ],
  ];

  const links = [
    ["Home", "About", "Blogs", "Career"],
    ["Contact", "Terms", "Ads", "Privacy"],
  ];

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        {/* Logo Part */}
        <div className={styles.info}>
          <span>
            <Link to="/">
              <img className={styles.logo} src={logo} alt="" />
            </Link>
            <p className={styles.infoText}>Connecting Brands & Influencers</p>
          </span>
          {/* Icons Part */}
          <div className={styles.iconMain}>
            {icons.map((arr, i) => (
              <div key={i} className={styles.iconWrapper}>
                {arr.map((item, i) => (
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
            ))}
          </div>
        </div>
        {/* Links Part */}
        <div className={styles.linksMain}>
          {links.map((arr, i) => (
            <div className={styles.sublink} key={i}>
              {arr.map((item) => (
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  key={item}
                  className={styles.link}
                >
                  {item}
                </Link>
              ))}
            </div>
          ))}
        </div>
        {/* Apps Part */}
        <div className={styles.appMain}>
          <p className={styles.appHead}>Get the apps!</p>
          <a
            href="https://firebasestorage.googleapis.com/v0/b/flytant-app.appspot.com/o/androidApp%2FFlytant1.0.2%2FUpdated%2FFlytant.apk?alt=media&token=cc06343b-0789-40a7-99e7-aafbc948b00e"
            target="_blank"
            rel="noreferrer"
            className={styles.appBtn}
          >
            <AiFillAndroid className={styles.appIcon} />
            <div>
              <p className={styles.download}>Download our</p>
              <p className={styles.appCatagory}>Android App</p>
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
              <p className={styles.download}>Download on the</p>
              <p className={styles.appCatagory}>App Store</p>
            </div>
          </a>
        </div>
      </div>
      <p className={styles.copyright}>© Copyright Flytant Pvt Ltd.</p>
    </div>
  );
};

export default Footer;
